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
import { Invite } from "./invite";

import { Story } from "./story";
import { User } from "./user";
import { UserPod } from "./user-pod";

@Entity()
@ObjectType()
export class Pod extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserPod, (userPod) => userPod.pod)
  userPods: UserPod[];

  @Field(() => [User])
  members: User[];

  @Field(() => [User])
  admins: User[];

  @Field(() => Boolean)
  joined: boolean;

  @Field(() => [Story])
  @OneToMany(() => Story, (story) => story.pod)
  stories: Story[];

  @OneToMany(() => Invite, (invite) => invite.pod)
  invites: Invite[];
}
