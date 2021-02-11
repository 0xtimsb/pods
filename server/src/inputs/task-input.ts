import { InputType, Field, Int } from "type-graphql";

@InputType()
export class TaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int)
  storyId: number;
}
