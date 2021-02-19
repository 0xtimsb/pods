import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Story } from "./story";
import { User } from "./user";
import { UserPods } from "./user-pods";

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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.pods)
  leader: User;

  @Field(() => [UserPods])
  @OneToMany(() => UserPods, (userPods) => userPods.pod)
  members: UserPods[];

  @Field(() => [Story])
  @OneToMany(() => Story, (story) => story.pod)
  stories: Story[];
}
