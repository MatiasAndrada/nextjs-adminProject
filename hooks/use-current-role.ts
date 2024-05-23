import { currentUser } from "./use-current-user";
import { db } from "@/lib/db";

export const currentRole = async () => {
  const user = await currentUser();
  const project_id = user?.selected_project_id;
  if (!project_id) {
    throw new Error("Project not found");
  }
  const role = await db.projectUser.findFirst({
    where: {
      project_id,
      user_id: user.id
    },
    select: {
      role: true
    }
  });
  if (!role) {
    throw new Error("Role not found");
  }
  return role.role;
};