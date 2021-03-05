import { FieldResolver, Resolver, Root } from "type-graphql";
import { createQueryBuilder } from "typeorm";

// Entities
import { Invite } from "../entities/invite";
import { Pod } from "../entities/pod";
import { User } from "../entities/user";

@Resolver(Invite)
export class InviteResolver {
  @FieldResolver(() => User)
  invitee() {
    return createQueryBuilder(User, "user")
      .innerJoin("user.receivedInvites", "invite")
      .where("invite.invitee.id = user.id")
      .getOne();
  }

  @FieldResolver(() => Pod)
  pod() {
    return createQueryBuilder(Pod, "pod")
      .innerJoin("pod.invites", "invite")
      .where("invite.pod.id = pod.id")
      .getOne();
  }
}
