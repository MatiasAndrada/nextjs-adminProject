"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function set_role_of_member(user_id: string, project_id: string, role: Role) {
    try {
        if (role === Role.OWNER) return { error: "You can't change the role of the owner." }
        if (!user_id || !project_id || !role) return { error: "Missing fields. Failed to update role." }
        await db.projectUser.update({
            where: {
                user_id: user_id,
                project_id: project_id,
            },
            data: {
                role,
            },
        });
        revalidatePath("/dashboard/members", "page");
        /*         redirect("/dashboard/members"); */
        return { success: "Role updated." };
    } catch (error) {
        console.log(error);
        return { error: "An unexpected error occurred. " };
    }
}

export async function delete_member(user_id: string, project_id: string) {
    try {
        if (!user_id || !project_id) return { error: "Missing fields. Failed to delete member." }
        await db.projectUser.delete({
            where: {
                user_id,
                project_id
            },
        },
        );
        revalidatePath("/dashboard/members", "page");
        return { success: "Member deleted." };
    } catch (error) {
        console.log(error);
        return { error: "An unexpected error occurred. " };
    }
}