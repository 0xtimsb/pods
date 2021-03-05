import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";

// Entities
import { UserPod } from "../entities/user-pod";
import { Message } from "../entities/message";
import { Pod } from "../entities/pod";
import { User } from "../entities/user";

// Types
import { Context } from "../types/context";

@ObjectType()
export class PaginatedMessages {
  @Field(() => [Message])
  result: Message[];
  @Field()
  hasMore: boolean;
}

@Resolver(Message)
export class MessageResolver {
  @Query(() => PaginatedMessages)
  async messages(
    @Arg("podId", () => Int) podId: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedMessages> {
    limit = Math.min(50, limit);

    const qb = getConnection()
      .getRepository(Message)
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.user", "user")
      .where("message.pod.id = :podId", { podId })
      .orderBy("message.createdAt", "DESC")
      .take(limit + 1);

    if (cursor) {
      qb.andWhere("post.createdAt < :cursor", {
        cursor: new Date(parseInt(cursor)),
      });
    }

    let result = await qb.getMany();

    let hasMore = false;

    if (result.length > limit) {
      hasMore = true;
      result.pop();
    }

    return { result, hasMore };
  }

  @Authorized("ADMIN", "MEMBER")
  @Mutation(() => Boolean)
  async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("text") text: string,
    @Arg("podId", () => Int) podId: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
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
    try {
      const userPod = await getConnection()
        .createQueryBuilder(UserPod, "userPod")
        .where("userPod.user.id = :userId", { userId })
        .andWhere("userPod.pod.id = :podId", { podId })
        .getOne();
      if (!userPod) return null;
      return message;
    } catch (e) {
      return null;
    }
  }
}
