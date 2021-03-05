import { ObjectType, Field } from "type-graphql";

import { Invite } from "../entities/invite";
import { FieldError } from "./field-error";

@ObjectType()
export class InviteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Invite, { nullable: true })
  invite?: Invite;
}
