import { InputType, Field } from "type-graphql";

@InputType()
export class StoryInput {
  @Field()
  title: string;

  @Field()
  podId: number;
}
