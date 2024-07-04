"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function set_role_of_member(id: string, role: Role) {
    if (role === Role.OWNER) return { error: "You can't change the role of the owner." }
    if (!id || !role) return { error: "Missing fields. Failed to update role." }
    await db.projectUser.update({
        where: {
            id
        },
        data: {
            role,
        },
    });
    revalidatePath("/dashboard/members", "page");
    redirect("/dashboard/members");
}

export async function delete_member(id: string) {
    if (!id) return { error: "Missing field. Failed to delete member." }
    await db.projectUser.delete({
        where: {
            id
        },
    },
    );
    revalidatePath("/dashboard/members", "page");
    return { success: "Member deleted." };
}

export async function assign_member_to_task_group(formData: FormData) {
    const task_group_id = formData.get("id");
    const users_id = formData.getAll("selectedIds");

    console.log("🦇  assign_member_to_task_group  task_group_id:", task_group_id)
    console.log("🦇  assign_member_to_task_group  users_id:", users_id)

}