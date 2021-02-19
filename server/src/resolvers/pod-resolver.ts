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
  pod(@Arg("id", () => Int) id: number, @Ctx() { req }: Context) {
    return getConnection()
      .createQueryBuilder(Pod, "pod")
      .innerJoin("pod.members", "user")
      .where("pod.id = :podId", { podId: id })
      .andWhere("user.id = :userId", { userId: req.session.userId })
      .getOne();
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

      // Sets current user as leader of the pod
      await getConnection()
        .createQueryBuilder()
        .relation(Pod, "leader")
        .of(pod.id)
        .set(req.session.userId);

      // Adds current user in member list of the pod
      await getConnection()
        .createQueryBuilder()
        .relation(Pod, "members")
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
  async inviteUserToPod(
    @Arg("podId", () => Int) podId: number,
    @Arg("userId", () => Int) userId: number,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    // Need to check if leader inviting.
    const pod = await getConnection()
      .createQueryBuilder(Pod, "pod")
      .innerJoin("pod.leader", "leader")
      .where("pod.id = :podId", { podId })
      .andWhere("leader.id = :leaderId", { leaderId: req.session.userId })
      .getOne();

    if (!pod) return false; // Not a leader for that pod.

    // Adds user to the pod
    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Pod, "members")
        .of(podId)
        .add(userId);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async leavePod(
    @Arg("podId", () => Int) podId: number,
    @Arg("userId", () => Int) userId: number
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
  async deletePod(@Arg("podId", () => Int) podId: number): Promise<Boolean> {
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

  @FieldResolver(() => User)
  leader(@Root() pod: Pod) {
    // Returns leader of the pod.
    return createQueryBuilder(User, "user")
      .innerJoin("user.pods", "pod")
      .where("pod.id = :id", { id: pod.id })
      .andWhere("pod.leader.id = user.id")
      .getOne();
  }

  @FieldResolver(() => [User])
  members(@Root() pod: Pod) {
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
