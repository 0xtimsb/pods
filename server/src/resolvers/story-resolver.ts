import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";

// Entities
import { Task } from "../entities/task";
import { Story } from "../entities/story";

// Inputs and Objects
import { StoryResponse } from "../objects/story-response";
import { StoryInput } from "../inputs/story-input";

@Resolver(Story)
export class StoryResolver {
  @Query(() => Story, { nullable: true })
  pod(@Arg("storyId") storyId: number) {
    return Story.findOne(storyId);
  }

  @Mutation(() => StoryResponse)
  async createStory(@Arg("data") data: StoryInput): Promise<StoryResponse> {
    const { title, podId } = data;

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

    let story;
    try {
      // Creates new story
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Story)
        .values({
          title,
        })
        .returning("*")
        .execute();

      story = result.raw[0];

      // Add story to the pod
      await getConnection()
        .createQueryBuilder()
        .relation(Story, "pod")
        .of(story.id)
        .set(podId);
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

    return { story };
  }

  @Mutation(() => Boolean)
  async deleteStory(@Arg("storyId") storyId: number): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Story)
        .where({ id: storyId })
        .execute();
    } catch (e) {
      return false;
    }
    return true;
  }

  @FieldResolver(() => [Task])
  tasks(@Root() story: Story) {
    // Returns all the tasks, but not story, having story.id
    return createQueryBuilder(Task, "task")
      .innerJoin("task.story", "story")
      .where("story.id = :id", { id: story.id })
      .getMany();
  }
}
