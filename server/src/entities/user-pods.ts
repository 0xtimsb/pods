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
export class UserPods extends BaseEntity {
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isJoined: boolean;

  @ManyToOne(() => User, (user) => user.pods, { primary: true })
  user: User;

  @ManyToOne(() => Pod, (pod) => pod.members, { primary: true })
  pod: Pod;
}
