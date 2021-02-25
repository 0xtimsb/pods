import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { Pod } from "./pod";
import { User } from "./user";

@Entity()
@ObjectType()
export class Invite extends BaseEntity {
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  asAdmin: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentInvites)
  inviter: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedInvites, { primary: true })
  invitee: User;

  @Field(() => Pod)
  @ManyToOne(() => Pod, (pod) => pod.userPods, { primary: true })
  pod: Pod;
}
