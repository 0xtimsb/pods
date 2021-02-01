import { ObjectType, Field } from "type-graphql";

import { Task } from "../entities/task";
import { FieldError } from "./field-error";

@ObjectType()
export class TaskResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Task, { nullable: true })
  task?: Task;
}
