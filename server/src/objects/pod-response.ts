import { ObjectType, Field } from "type-graphql";

import { Pod } from "../entities/pod";
import { FieldError } from "./field-error";

@ObjectType()
export class PodResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Pod, { nullable: true })
  pod?: Pod;
}
