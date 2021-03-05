import {
  Arg,
  Authorized,
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
import { Story } from "../entities/story";
import { UserPod } from "../entities/user-pod";
import { Invite } from "../entities/invite";

// Objects
import { PodResponse } from "../objects/pod-response";

// Types
import { Context } from "../types/context";
import { InviteResponse } from "../objects/invite-response";

@Resolver(Pod)
export class PodResolver {
  @Authorized(["ADMIN", "MEMBER"])
  @Query(() => Pod, { nullable: true })
  pod(@Arg("podId", () => Int) podId: number) {
    return getConnection()
      .createQueryBuilder(Pod, "pod")
      .where("pod.id = :podId", { podId })
      .getOne();
  }

  @Authorized()
  @Mutation(() => PodResponse)
  async createPod(
    @Arg("name") name: string,
    @Ctx() { req }: Context
  ): Promise<PodResponse> {
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

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(UserPod)
        .values({
          pod: { id: pod.id },
          user: { id: req.session.userId },
          isAdmin: true,
        })
        .returning("*")
        .execute();
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

  @Authorized("ADMIN")
  @Mutation(() => InviteResponse)
  async inviteToPod(
    @Arg("podId", () => Int) podId: number,
    @Arg("username", () => String) username: string,
    @Arg("asAdmin", () => Boolean) asAdmin: boolean,
    @Ctx() { req }: Context
  ): Promise<InviteResponse> {
    let invite;
    try {
      const user = await getConnection()
        .createQueryBuilder(User, "user")
        .where("user.username = :username", { username })
        .getOne();

      if (user) {
        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Invite)
          .values({
            invitee: { id: user.id },
            inviter: { id: req.session.userId },
            pod: { id: podId },
            asAdmin,
          })
          .returning("*")
          .execute();

        invite = result.raw[0];
      }
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
    return { invite };
  }

  @Authorized("ADMIN")
  @Mutation(() => Boolean)
  async uninviteToPod(
    @Arg("podId", () => Int) podId: number,
    @Arg("username", () => String) username: string,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    try {
      const user = await getConnection()
        .createQueryBuilder(User, "user")
        .where("user.username = :username", { username })
        .getOne();

      if (user) {
        const inviteeId = user.id;
        await getConnection()
          .createQueryBuilder(Invite, "invite")
          .innerJoin("invite.invitee", "invitee")
          .innerJoin("invite.inviter", "inviter")
          .innerJoin("invite.pod", "pod")
          .where("invitee.id = :inviteeId", { inviteeId })
          .andWhere("pod.id = :podId", { podId })
          .andWhere("inviter.id = :inviterId", {
            inviterId: req.session.userId,
          })
          .delete()
          .execute();
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  @Authorized("MEMBER")
  @Mutation(() => Boolean)
  async cancelInvite(
    @Arg("podId", () => Int) podId: number,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder(Invite, "invite")
        .innerJoin("invite.invitee", "invitee")
        .innerJoin("invite.pod", "pod")
        .where("invitee.id = :id", { id: req.session.userId })
        .andWhere("pod.id = :podId", { podId })
        .delete()
        .execute();
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  @Authorized("ADMIN")
  @Mutation(() => Boolean)
  async removeFromPod(
    @Arg("podId", () => Int) podId: number,
    @Arg("userId", () => Int) userId: number
  ): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder(UserPod, "userPod")
        .innerJoin("userPod.user", "user")
        .innerJoin("userPod.pod", "pod")
        .where("userPod.pod.id = :podId", { podId: podId })
        .andWhere("userPod.user.id = :userId", { userId: userId })
        .delete()
        .execute();
    } catch (e) {
      return false;
    }
    return true;
  }

  @Authorized("MEMBER")
  @Mutation(() => Boolean)
  async leavePod(
    @Arg("podId", () => Int) podId: number,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder(UserPod, "userPod")
        .innerJoin("userPod.user", "user")
        .innerJoin("userPod.pod", "pod")
        .where("pod.id = :podId", { podId: podId })
        .andWhere("user.id = :userId", { userId: req.session.userId })
        .delete()
        .execute();
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinPod(
    @Arg("podId", () => Int) podId: number,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const invite = await getConnection()
      .createQueryBuilder(Invite, "invite")
      .where("invite.pod.id = :podId", { podId })
      .andWhere("invite.invitee.id = :userId", { userId: req.session.userId })
      .getOne();

    if (!invite) return false;

    try {
      await getConnection()
        .createQueryBuilder(Invite, "invite")
        .innerJoin("invite.invitee", "invitee")
        .innerJoin("invite.pod", "pod")
        .where("invitee.id = :id", { id: req.session.userId })
        .andWhere("pod.id = :podId", { podId })
        .delete()
        .execute();
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(UserPod)
        .values({
          user: { id: req.session.userId },
          pod: { id: podId },
          isAdmin: invite.asAdmin,
        })
        .execute();
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  @Authorized("ADMIN")
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

  @FieldResolver(() => [User])
  admins(@Root() pod: Pod) {
    return createQueryBuilder(User, "user")
      .innerJoin("user.userPods", "userPod")
      .where("userPod.pod.id = :id", { id: pod.id })
      .andWhere("userPod.isAdmin = :isAdmin", { isAdmin: true })
      .getMany();
  }

  @FieldResolver(() => [User])
  members(@Root() pod: Pod) {
    return createQueryBuilder(User, "user")
      .innerJoin("user.userPods", "userPod")
      .where("userPod.pod.id = :id", { id: pod.id })
      .andWhere("userPod.isAdmin = :isAdmin", { isAdmin: false })
      .getMany();
  }

  @FieldResolver(() => [Story])
  stories(@Root() pod: Pod) {
    return createQueryBuilder(Story, "story")
      .innerJoin("story.pod", "pod")
      .where("pod.id = :id", { id: pod.id })
      .orderBy("story.rank")
      .getMany();
  }

  @FieldResolver(() => Boolean)
  async isAdmin(@Root() pod: Pod, @Ctx() { req }: Context) {
    const userPod = await createQueryBuilder(UserPod, "userPod")
      .where("userPod.pod.id = :podId", { podId: pod.id })
      .andWhere("userPod.user.id = :userId", { userId: req.session.userId })
      .getOne();

    if (userPod) return userPod.isAdmin;

    return false;
  }
}
