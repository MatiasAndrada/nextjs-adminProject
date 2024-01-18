"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const setSelectedProject = async (projectId: string) => {
    const session = await auth();
    const id = session?.user?.id as string;
    const user = await db.user.update({
        where: {
            id
        },
        data: {
            selected_project_id: projectId
        }
    })
    return user;
}