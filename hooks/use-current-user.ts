import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const current_user_id = async () => {
  const session = await auth()
  const user_id = session?.user.id
  return user_id
}