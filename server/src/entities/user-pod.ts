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
export class UserPod extends BaseEntity {
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isAdmin: boolean;

  @Column()
  isJoined: boolean;

  @ManyToOne(() => User, (user) => user.userPods, { primary: true })
  user: User;

  @ManyToOne(() => Pod, (pod) => pod.userPods, { primary: true })
  pod: Pod;
}
