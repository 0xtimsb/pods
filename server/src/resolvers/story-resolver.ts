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
import { Story } from "../entities/story";

// Inputs and Objects
import { StoryResponse } from "../objects/story-response";
import { StoryInput } from "../inputs/story-input";
import { midString } from "../utils/mid-string";

@Resolver(Story)
export class StoryResolver {
  @Query(() => Story, { nullable: true })
  story(@Arg("id", () => Int) id: number) {
    return Story.findOne(id);
  }

  @Mutation(() => Boolean)
  async moveStory(
    @Arg("id", () => Int) id: number,
    @Arg("sourceIndex", () => Int) sourceIndex: number,
    @Arg("destinationIndex", () => Int) destinationIndex: number
  ): Promise<Boolean> {
    try {
      // If out of index, don't do anything.
      if (destinationIndex < 0 || sourceIndex < 0) return false;

      // If same index, no need to update.
      if (sourceIndex === destinationIndex) return false;

      // Get new destination rank
      let prevStory = undefined;
      let nextStory = undefined;

      if (destinationIndex === 0) {
        [nextStory] = await Story.getRepository()
          .createQueryBuilder("story")
          .orderBy("story.rank", "ASC")
          .limit(1)
          .getMany();
      } else {
        const isShift = destinationIndex < sourceIndex;
        [prevStory, nextStory] = await Story.getRepository()
          .createQueryBuilder("story")
          .orderBy("story.rank", "ASC")
          .limit(2)
          .offset(isShift ? destinationIndex - 1 : destinationIndex)
          .getMany();
      }

      // Updates new rank
      await Story.update(
        { id },
        {
          rank: midString(
            prevStory ? prevStory.rank : "",
            nextStory ? nextStory.rank : ""
          ),
        }
      );
    } catch (e) {
      return false;
    }
    return true;
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
      // Appending assigning the last rank
      const lastStory = await Story.findOne({
        select: ["rank"],
        order: {
          rank: "DESC",
        },
      });

      // Creates new story
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Story)
        .values({
          title,
          rank: lastStory ? midString(lastStory.rank, "") : midString("", ""), // generates non-identical ranks using lexorank algorithm
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
      .orderBy("task.rank")
      .getMany();
  }
}
