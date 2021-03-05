import { ArgsDictionary, AuthChecker } from "type-graphql";
import { getConnection } from "typeorm";

// Entities
import { Pod } from "../entities/pod";
import { Story } from "../entities/story";
import { Task } from "../entities/task";
import { UserPod } from "../entities/user-pod";

// Context
import { Context } from "../types/context";

const getPodFromStory = async (storyId: number): Promise<number | null> => {
  const pod = await getConnection()
    .createQueryBuilder(Pod, "pod")
    .innerJoin(Story, "story", "story.pod.id = pod.id")
    .where("story.id = :storyId", { storyId })
    .getOne();

  if (!pod) return null;

  return pod.id;
};

const getPodFromTask = async (taskId: number): Promise<number | null> => {
  const story = await getConnection()
    .createQueryBuilder(Story, "story")
    .innerJoin(Task, "task", "task.story.id = story.id")
    .where("task.id = :taskId", { taskId })
    .getOne();

  if (!story) return null;

  return await getPodFromStory(story.id);
};

const getPod = async ({
  podId,
  storyId,
  taskId,
}: ArgsDictionary): Promise<number | null> => {
  if (podId) return podId;

  if (storyId) return await getPodFromStory(storyId);

  if (taskId) return await getPodFromTask(taskId);

  return null;
};

export const authMiddleware: AuthChecker<Context> = async (
  { args, context },
  roles
) => {
  if (!context.req.session.userId) return false; // If user not logged in.

  // Check if it needs any other permission.
  // If not let them access, else check those permissions too.
  if (roles.length === 0) return true;

  const podId = await getPod(args); // We need to get podId anyhow, depending on whats given.

  if (!podId) return false;

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
