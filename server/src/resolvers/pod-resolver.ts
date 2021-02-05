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

// Entities
import { User } from "../entities/user";
import { Pod } from "../entities/pod";

// Inputs and Objects
import { PodResponse } from "../objects/pod-response";
import { PodInput } from "../inputs/pod-input";

// Types
import { Context } from "../types/context";
import { Story } from "../entities/story";

@Resolver(Pod)
export class PodResolver {
  @Query(() => Pod, { nullable: true })
  pod(@Arg("id", () => Int) id: number) {
    return Pod.findOne(id);
  }

  @Mutation(() => PodResponse)
  async createPod(
    @Arg("data") data: PodInput,
    @Ctx() { req }: Context
  ): Promise<PodResponse> {
    const { name } = data;

    // Name validation
    if (name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
            message: "Name should be more than 2 characters.",
          },
        ],
      };
    }

    let pod;
    try {
      // Creates new pod
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Pod)
        .values({
          name,
        })
        .returning("*")
        .execute();

      pod = result.raw[0];

      // Adds current user to the pod
      await getConnection()
        .createQueryBuilder()
        .relation(Pod, "users")
        .of(pod.id)
        .add(req.session.userId);
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

    return { pod };
  }

  @Mutation(() => Boolean)
  async joinPod(
    @Arg("podId") podId: number,
    @Arg("userId") userId: number
  ): Promise<Boolean> {
    // Need to check if leader is doing this or not. TODO

    // Adds user to the pod
    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Pod, "users")
        .of(podId)
        .add(userId);
    } catch (e) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async leavePod(
    @Arg("podId") podId: number,
    @Arg("userId") userId: number
  ): Promise<Boolean> {
    // Remove user from the pod
    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Pod, "users")
        .of(podId)
        .remove(userId);
    } catch (e) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deletePod(@Arg("podId") podId: number): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Pod)
        .where({ id: podId })
        .execute();
    } catch (e) {
      return false;
    }
    return true;
  }

  @FieldResolver(() => [User])
  users(@Root() pod: Pod) {
    // Returns all the users, but not pod, having pod.id
    return createQueryBuilder(User, "user")
      .innerJoin("user.pods", "pod")
      .where("pod.id = :id", { id: pod.id })
      .getMany();
  }

  @FieldResolver(() => [Story])
  stories(@Root() pod: Pod) {
    // Returns all the stories, but not pod, having pod.id
    return createQueryBuilder(Story, "story")
      .innerJoin("story.pod", "pod")
      .where("pod.id = :id", { id: pod.id })
      .orderBy("story.rank")
      .getMany();
  }
}
