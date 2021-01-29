import { Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async user(): Promise<User | undefined> {
    return await User.findOne({ age: 12 });
  }

  @Mutation(() => User)
  async createUser(): Promise<User> {
    const user = new User();
    user.id = 242434;
    user.age = 12;
    return await user.save();
  }
}
