import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";
import { Context } from "../types/context";

// Entities
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { Pod } from "../entities/pod";
import { Story } from "../entities/story";

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

  @Mutation(() => Boolean)
  async moveTask(
    @Arg("id", () => Int) id: number,
    @Arg("sourceIndex", () => Int) sourceIndex: number,
    @Arg("destinationIndex", () => Int) destinationIndex: number,
    @Arg("sourceStoryId", () => Int) sourceStoryId: number,
    @Arg("destinationStoryId", () => Int) destinationStoryId: number
  ): Promise<Boolean> {
    try {
      // If out of index, don't do anything.
      if (destinationIndex < 0 || sourceIndex < 0) return false;

      // If drag and drop happened in same story.
      if (sourceStoryId === destinationStoryId) {
        // If same index, no need to update.
        if (sourceIndex === destinationIndex) return false;

        // Get new destination rank
        let prevTask = undefined;
        let nextTask = undefined;

        if (destinationIndex === 0) {
          [nextTask] = await Task.getRepository()
            .createQueryBuilder("task")
            .innerJoin("task.story", "story")
            .where("story.id = :id", { id: sourceStoryId })
            .orderBy("task.rank", "ASC")
            .limit(1)
            .getMany();
        } else {
          const isShift = destinationIndex < sourceIndex;
          [prevTask, nextTask] = await Task.getRepository()
            .createQueryBuilder("task")
            .innerJoin("task.story", "story")
            .where("story.id = :id", { id: sourceStoryId })
            .orderBy("task.rank", "ASC")
            .offset(isShift ? destinationIndex - 1 : destinationIndex)
            .limit(2)
            .getMany();
        }

        // Updates new rank
        await Task.update(
          { id },
          {
            rank: midString(
              prevTask ? prevTask.rank : "",
              nextTask ? nextTask.rank : ""
            ),
          }
        );
      } else {
        // If drag and drop happened in diffrent stories.
        // Get new destination rank
        let prevTask = undefined;
        let nextTask = undefined;

        if (destinationIndex === 0) {
          [nextTask] = await Task.getRepository()
            .createQueryBuilder("task")
            .innerJoin("task.story", "story")
            .where("story.id = :id", { id: destinationStoryId })
            .orderBy("task.rank", "ASC")
            .limit(1)
            .getMany();
        } else {
          [prevTask, nextTask] = await Task.getRepository()
            .createQueryBuilder("task")
            .innerJoin("task.story", "story")
            .where("story.id = :id", { id: destinationStoryId })
            .orderBy("task.rank", "ASC")
            .offset(destinationIndex - 1)
            .limit(2)
            .getMany();
        }

        // Updates new rank in new story.
        await Task.update(
          { id },
          {
            rank: midString(
              prevTask ? prevTask.rank : "",
              nextTask ? nextTask.rank : ""
            ),
            story: {
              id: destinationStoryId,
            },
          }
        );
      }
    } catch (e) {
      return false;
    }
    return true;
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
      // Appending assigning the first rank
      const firstTask = await Task.findOne({
        where: {
          story: {
            id: storyId,
          },
        },
        select: ["rank"],
        order: {
          rank: "ASC",
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
          rank: firstTask ? midString("", firstTask.rank) : midString("", ""), // generates non-identical ranks using lexorank algorithm
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
    @Arg("taskId", () => Int) taskId: number,
    @Arg("userId", () => Int) userId: number,
    @Root() task: Task,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    // Wokring on this...
    const pod = await getConnection()
      .createQueryBuilder()
      .select("pod.id")
      .from(Pod, "pod")
      .innerJoin(Story, "story", "story.pod.id = pod.id")
      .innerJoin(Task, "task", "task.story.id = story.id")
      .where("task.id = :taskId", { taskId })
      .getOne();

    console.log(pod?.id);

    return false;
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
    @Arg("taskId", () => Int) taskId: number,
    @Arg("userId", () => Int) userId: number
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
  async deleteTask(@Arg("taskId", () => Int) taskId: number): Promise<Boolean> {
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
    return createQueryBuilder(User, "user")
      .innerJoin("user.tasks", "task")
      .where("task.id = :id", { id: task.id })
      .getMany();
  }
}
