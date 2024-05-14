"use server"
import { db } from "@/lib/db";
import { currentUser } from "@/hooks/use-current-user";
import { CreateFormSchema } from "@/schemas/project";
import type { State } from "@/schemas/project";
import { redirect } from 'next/navigation';

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
        const user = await currentUser();
        const user_id = user?.id;
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
        await db.projectUser.create({
            data: {
                user_id,
                project_id,
                role: "ADMIN",
            },
        });

        await db.user.update({
            where: {
                id: user_id,
            },
            data: {
                selected_project_id: project_id,
            },
        });

        redirect(`/projects`);
    } catch (error) {
        // Handle the error here
        console.error(error);
        // Return an error response if needed
        return {
            message: 'An error occurred while creating the project.',
        };
    }
}

export async function update_project(prevState: State, formData: FormData) {
    try {
        const validatedFields = CreateFormSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Update Project.',
            };
        }

        const { name, description } = validatedFields.data;
        const id = formData.get('id');

        await db.project.update({
            where: {
                id: id as string,
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

export async function fetch_project_by_id(id: string) {
    try {
        const project = await db.project.findUnique({
            where: {
                id,
            },
        });
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function delete_project_by_id(id: string) {
    try {
        const user = await currentUser();
        const user_id = user?.id;
        if (!user_id) {
            throw new Error("User not found");
        }
        const projectUser = await db.projectUser.findFirst({
            where: {
                user_id,
                project_id: id,
            },
        });
        if (!projectUser) {
            throw new Error("Project not found");
        }
        if (projectUser.role !== "ADMIN") {
            throw new Error("You are not authorized to delete this project.");
        }
        await db.project.delete({
            where: {
                id,
            },
        });
    }
    catch (error) {
        console.error(error);
        return {
            message: 'An error occurred while deleting the project.',
        };
    }
}
