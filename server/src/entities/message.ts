import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Pod } from "./pod";
import { User } from "./user";

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Field(() => Pod)
  @ManyToOne(() => Pod, (pod) => pod.messages)
  pod: Pod;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
