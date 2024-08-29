"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { useProjectRoleHasAccess } from "@/hooks/use-current-role";
import { currentProjectId } from "@/hooks/use-current-project";
import { Role } from "@prisma/client";

export async function set_role_of_member(id: string, role: Role) {
    if (role === Role.OWNER) return { error: "You can't change the role of the owner." }
    if (!id || !role) return { error: "Missing fields. Failed to update role." }
    const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN])
    if (has_access !== true)
        return { error: "You don't have permission to change roles" }
    await db.usersOnProjects.update({
        where: {
            id
        },
        data: {
            role,
        },
    });
    revalidatePath("/dashboard/members", "page");
    return { success: "Role changed successfully" }
}

export async function delete_member(id: string) {
    if (!id) return { error: "Missing field. Failed to delete member." }
    const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN])
    if (has_access !== true) {
        return { error: "You don't have permission to delete members" }
    }
    await db.usersOnProjects.delete({
        where: {
            id
        },
    },
    );
    revalidatePath("/dashboard/members", "page");
    return { success: "Member deleted." };
}
export async function assign_member_to_task_group(formData: FormData) {
    const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN])
    if (has_access !== true) return { error: "You do not have permission to perform this action." };
    const current_project_id = await currentProjectId();
    const task_group_id = formData.get("id") as string;
    const users_id = formData.getAll("selectedIds") as string[];
    if (!task_group_id || users_id.length === 0) {
        return { error: "Missing fields. Failed to assign member to task group." };
    }
    try {
        // Verificar que todos los usuarios enviados están en el proyecto actual
        const usersOnProjects = await db.usersOnProjects.findMany({
            where: {
                user_id: {
                    in: users_id,
                },
                project_id: current_project_id,
            },
        });

        if (usersOnProjects.length !== users_id.length) {
            return { error: "Some users are not part of the current project." };
        }

        // Obtener los miembros actualmente asignados al task_group
        const currentMembers = await db.usersOnProjects.findMany({
            where: {
                assignedTaskGroup: {
                    some: {
                        id: task_group_id,
                    },
                },
                project_id: current_project_id,
            },
        });
        // Identificar los miembros que deben ser eliminados
        const membersToRemove = currentMembers.filter(
            (member) => !users_id.includes(member.user_id)
        );
        // Eliminar los miembros que ya no deben estar asignados
        await Promise.all(
            membersToRemove.map(async (member) => {
                await db.usersOnProjects.update({
                    where: {
                        id: member.id,
                    },
                    data: {
                        assignedTaskGroup: {
                            disconnect: {
                                id: task_group_id,
                            },
                        },
                    },
                });
            })
        );
        // Asignar los nuevos miembros al task_group
        await Promise.all(
            usersOnProjects.map(async (userOnProject) => {
                await db.usersOnProjects.update({
                    where: {
                        id: userOnProject.id,
                    },
                    data: {
                        assignedTaskGroup: {
                            connect: { id: task_group_id },
                        },
                    },
                });
            })
        );

        revalidatePath(`/dashboard/task-groups/${task_group_id}`, "page");
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred while assigning members to the task group." };
    }
}
