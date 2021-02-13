import { Field, Int, ObjectType } from "type-graphql";
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
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ default: "" })
  description: string;

  @Field()
  @Column()
  rank: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.pods)
  users: User[];

  @ManyToOne(() => Story, (story) => story.tasks, { onDelete: "CASCADE" })
  story: Story;
}
