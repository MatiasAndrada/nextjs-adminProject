import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  if (!session?.user) throw new Error("No session found");
  return session.user;
};

export const current_user_id = async () => {
  const session = await auth()
  if (!session?.user?.id) throw new Error("No session found");
  const user_id = session.user.id
  return user_id
}