import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { UserPods } from "./user-pods";
import { Pod } from "./pod";
import { Task } from "./task";

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
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [UserPods])
  @OneToMany(() => UserPods, (userPods) => userPods.user)
  pods: UserPods[];

  @Field(() => [Task])
  @ManyToMany(() => Task, (task) => task.users)
  @JoinTable({
    name: "assign",
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "task",
      referencedColumnName: "id",
    },
  })
  tasks: Task[];
}
