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
export class UserPod extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isAdmin: boolean;

  @ManyToOne(() => User, (user) => user.userPods, {
    primary: true,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Pod, (pod) => pod.userPods, {
    primary: true,
    onDelete: "CASCADE",
  })
  pod: Pod;
}
