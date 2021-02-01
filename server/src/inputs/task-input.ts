import { InputType, Field } from "type-graphql";

@InputType()
export class TaskInput {
  @Field()
  title: string;

  @Field()
  description?: string;

  @Field()
  storyId: number;
}
