import { InputType, Field } from "type-graphql";

@InputType()
export class PodInput {
  @Field()
  name: string;
}
