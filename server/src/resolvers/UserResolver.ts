import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";

import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { UserResponse } from "../objects/UserResponse";
import { validateUserInput } from "../utils/validateUserInput";
import { Context } from "../types/context";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async createUser(
    @Arg("data") data: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const { username, password: notHashedPassword, email } = data;

    const errors = validateUserInput(data);
    if (errors) return { errors };

    // Hash password
    const password = await argon2.hash(notHashedPassword);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          email,
          password,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: `Error code: ${err.code}`,
            message: err.message,
          },
        ],
      };
    }

    // Login after creating user
    req.session.userId = user.id;

    return { user };
  }
}
