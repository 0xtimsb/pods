import { ObjectType, Field } from "type-graphql";

import { User } from "../entities/user";
import { FieldError } from "./field-error";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
