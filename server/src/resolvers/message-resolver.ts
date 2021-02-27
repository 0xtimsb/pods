import { withFilter } from "graphql-subscriptions";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";

// Entities
import { Message } from "../entities/message";
import { Pod } from "../entities/pod";
import { User } from "../entities/user";
import { UserPod } from "../entities/user-pod";

// Types
import { Context } from "../types/context";

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Boolean)
  async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("text") text: string,
    @Arg("podId", () => Int) podId: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const exist = await getConnection()
      .createQueryBuilder(UserPod, "userPod")
      .where("userPod.user.id = :userId", { userId: req.session.userId })
      .andWhere("userPod.pod.id = :podId", { podId })
      .getOne();

    if (!exist) return false;

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values({
        text,
        user: {
          id: req.session.userId,
        },
        pod: {
          id: podId,
        },
      })
      .returning("*")
      .execute();

    const message = result.raw[0];

    await pubSub.publish("MESSAGES", message);
    return true;
  }

  @FieldResolver(() => User)
  user(@Root() message: Message) {
    return getConnection()
      .createQueryBuilder(User, "user")
      .innerJoin("user.messages", "message")
      .where("message.id = :id", { id: message.id })
      .getOne();
  }

  @FieldResolver(() => Pod)
  pod(@Root() message: Message) {
    return getConnection()
      .createQueryBuilder(Pod, "pod")
      .innerJoin("pod.messages", "message")
      .where("message.id = :id", { id: message.id })
      .getOne();
  }

  @Subscription(() => Message, {
    nullable: true,
    topics: "MESSAGES",
    filter: ({ payload, args }) => payload.podId === args.podId,
  })
  async newMessages(
    @Root() message: Message,
    @Arg("podId", () => Int) podId: number,
    @Ctx() { connection }: Context
  ): Promise<Message | null> {
    const userId = connection.context.req.session.userId;
    console.log(userId);
    try {
      const userPod = await getConnection()
        .createQueryBuilder(UserPod, "userPod")
        .where("userPod.user.id = :userId", { userId })
        .andWhere("userPod.pod.id = :podId", { podId })
        .getOne();
      console.log(userPod);
      if (!userPod) return null;
      return message;
    } catch (e) {
      return null;
    }
  }
}
