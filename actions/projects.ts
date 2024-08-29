"use server"
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from "@/lib/db";
//hooks
import { current_user_id } from "@/hooks/use-current-user";
import { useProjectRoleHasAccess } from '@/hooks/use-current-role';
//types
import { CreateFormSchema } from "@/schemas/project";
import type { State } from "@/schemas/project";
import { Role } from "@prisma/client";

export async function setSelectedProject(projectId: string | null) {
    const user_id = await current_user_id()
    // Actualizar el usuario con el nuevo proyecto seleccionado
    await db.user.update({
        where: {
            id: user_id
        },
        data: {
            currentProjectId: projectId
        },
    });
    revalidatePath("/", "layout");
}


export async function create_project(prevState: State, formData: FormData) {
    try {
        const validatedFields = CreateFormSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description'),
        });
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create Project.',
            };
        }
        const { name, description } = validatedFields.data;
        const user_id = await current_user_id();
        if (!user_id) {
            throw new Error("User not found");
        }
        const project = await db.project.create({
            data: {
                name,
                description,
            },
        });
        const project_id = project?.id;
        const newUserOnProject = await db.usersOnProjects.create({
            data: {
                user_id,
                project_id,
                role: Role.OWNER,
            },
        });
        //?set the current project of the user
        await db.user.update({
            where: {
                id: user_id,
            },
            data: {
                currentProjectId: newUserOnProject.id,
            },
        })
    } catch (error) {
        // Handle the error here
        console.error(error);
        // Return an error response if needed
        return {
            message: 'An error occurred while creating the project.',
        };
    }
    revalidatePath(`/dashboard`);
    redirect(`/dashboard`);
}

export async function update_project(prevState: State, formData: FormData) {
    const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN])
    if (has_access !== true) {
        return { error: "You do not have permission to edit this project." }
    }
    try {
        const validatedFields = CreateFormSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description'),
            id: formData.get('id')
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Update Project.',
            };
        }

        const { id, name, description } = validatedFields.data;

        await db.project.update({
            where: {
                id: id,
            },
            data: {
                name,
                description,
            },
        });

        redirect(`/projects`);
    } catch (error) {
        console.error(error);
        return {
            message: 'An error occurred while updating the project.',
        };
    }
}

export async function delete_project_by_id(id: string) {
    const has_access = await useProjectRoleHasAccess([Role.OWNER])
    if (has_access !== true) {
        return { error: "You do not have permission to delete this project." }
    }
    try {
        const user_id = await current_user_id();
        const role_in_project = await db.usersOnProjects.findFirst({
            where: {
                user_id,
                project_id: id,
            },
        });
        if (!role_in_project) {
            return { error: "You are not part of this project." };
        }
        if (role_in_project.role !== Role.OWNER) {
            return { error: "You are not the owner of this project." };
        }
        await db.project.delete({
            where: {
                id,
            },
        });
        revalidatePath(`/projects`);
        return { success: "The project was deleted." };
    }
    catch (error) {
        console.error(error);
        return { error: "An unexpected error occurred. Failed to delete project." };
    }
}
