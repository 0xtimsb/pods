import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";

// Entities
import { Task } from "../entities/task";
import { User } from "../entities/user";

// Inputs and Objects
import { TaskInput } from "../inputs/task-input";
import { TaskResponse } from "../objects/task-response";
import { midString } from "../utils/mid-string";

@Resolver(Task)
export class TaskResolver {
  @Query(() => Task, { nullable: true })
  task(@Arg("id", () => Int) id: number) {
    return Task.findOne(id);
  }

  @Mutation(() => TaskResponse)
  async createTask(@Arg("data") data: TaskInput): Promise<TaskResponse> {
    const { title, description, storyId } = data;

    // Title validation
    if (title.length <= 2) {
      return {
        errors: [
          {
            field: "title",
            message: "Title should be more than 2 characters.",
          },
        ],
      };
    }

    let task;
    try {
      // Appending assigning the last rank
      const lastTask = await Task.findOne({
        where: {
          story: {
            id: storyId,
          },
        },
        select: ["rank"],
        order: {
          rank: "DESC",
        },
      });

      // Creates new task
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values({
          title,
          description,
          rank: lastTask ? midString(lastTask.rank, "") : midString("", ""), // generates non-identical ranks using lexorank algorithm
        })
        .returning("*")
        .execute();

      task = result.raw[0];

      // Add story to the task
      await getConnection()
        .createQueryBuilder()
        .relation(Task, "story")
        .of(task.id)
        .set(storyId);
    } catch (err) {
      return {
        errors: [
          {
            field: `Error code: ${err.code}`,
            message: err.message,
          },
        ],
      };
    }

    return { task };
  }

  @Mutation(() => Boolean)
  async assignUserToTask(
    @Arg("taskId") taskId: number,
    @Arg("userId") userId: number
  ): Promise<Boolean> {
    // Need to check if leader is doing this or not. TODO

    // Adds user to the task
    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Task, "users")
        .of(taskId)
        .add(userId);
    } catch (e) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async removeUserFromTask(
    @Arg("taskId") taskId: number,
    @Arg("userId") userId: number
  ): Promise<Boolean> {
    // Remove user from the task
    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Task, "users")
        .of(taskId)
        .remove(userId);
    } catch (e) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg("taskId") taskId: number): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Task)
        .where({ id: taskId })
        .execute();
    } catch (e) {
      return false;
    }
    return true;
  }

  @FieldResolver(() => [User])
  users(@Root() task: Task) {
    // Returns all the users, but not task, having task.id
    return createQueryBuilder(User, "user")
      .innerJoin("user.tasks", "task")
      .where("task.id = :id", { id: task.id })
      .getMany();
  }
}
