import { InputType, Field } from "type-graphql";

@InputType()
export class TaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  storyId: number;
}
