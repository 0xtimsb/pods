import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Pod } from "./pod";
import { Invite } from "./invite";
import { UserPod } from "./user-pod";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Invite])
  @OneToMany(() => Invite, (invite) => invite.inviter)
  sentInvites: Invite[];

  @Field(() => [Invite])
  @OneToMany(() => Invite, (invite) => invite.invitee)
  receivedInvites: Invite[];

  @OneToMany(() => UserPod, (userPod) => userPod.user)
  userPods: UserPod[];

  @Field(() => [Pod])
  pods: Pod[];
}
