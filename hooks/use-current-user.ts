import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  if (!session?.user) throw new Error("No session found");
  return session.user;
};