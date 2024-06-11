import { currentUser } from "./use-current-user";
import { db } from "@/lib/db";

export const currentRole = async () => {
  const user = await currentUser();
  const current_project_user = user?.currentProject;
  const current_role = current_project_user?.role;
  return current_role;
};