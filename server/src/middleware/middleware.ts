import { AuthChecker } from "type-graphql";
import { getConnection } from "typeorm";

import { UserPod } from "../entities/user-pod";

import { Context } from "../types/context";

export const middleware: AuthChecker<Context> = async (
  { args, context },
  roles
) => {
  if (!context.req.session.userId) return false; // If user not logged in.

  // Check if it needs any other permission.
  // If not let them access, else check those permissions too.
  if (roles.length === 0) return true;

  const podId = args.podId;
  const adminRights = roles.includes("ADMIN");
  const memberRights = roles.includes("MEMBER");

  const query = getConnection()
    .createQueryBuilder(UserPod, "userPod")
    .where("userPod.pod.id = :podId", { podId })
    .andWhere("userPod.user.id = :userId", {
      userId: context.req.session.userId,
    });

  try {
    if (adminRights && memberRights) {
      // If both permission are allowed, just run it.
      return !!(await query.execute());
    } else {
      // If only one needed.
      return !!(await query.andWhere("userPod.isAdmin = :isAdmin", {
        isAdmin: adminRights,
      }));
    }
  } catch (e) {
    return false;
  }
};
