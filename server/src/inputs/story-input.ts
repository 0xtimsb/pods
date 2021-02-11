import { InputType, Field, Int } from "type-graphql";

@InputType()
export class StoryInput {
  @Field()
  title: string;

  @Field(() => Int)
  podId: number;
}
