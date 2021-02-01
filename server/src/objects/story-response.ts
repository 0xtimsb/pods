import { ObjectType, Field } from "type-graphql";

import { Story } from "../entities/story";
import { FieldError } from "./field-error";

@ObjectType()
export class StoryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Story, { nullable: true })
  story?: Story;
}
