import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { Story } from "./story";
import { User } from "./user";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ default: "" })
  description: string;

  @Field()
  @Column()
  index: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.pods)
  users: User[];

  @ManyToOne(() => Story, (story) => story.tasks)
  story: Story;
}
