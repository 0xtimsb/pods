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
} from "typeorm";
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

  @Field(() => [Pod])
  @ManyToMany(() => Pod, (pod) => pod.users)
  @JoinTable({
    name: "member",
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "pod",
      referencedColumnName: "id",
    },
  })
  pods: Pod[];

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
