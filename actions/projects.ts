"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/hooks/use-current-user";
import { CreateFormSchema } from "@/schemas/project";
import type { State } from "@/schemas/project";

/* import { revalidatePath } from 'next/cache';*/
import { redirect } from 'next/navigation';

//!create project
export async function create_project(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        //? Luego aquí debería de pedir también los emails de los miembros del proyecto
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Project.',
        };
    }

    // Insert new project into database
    const { name, description } = validatedFields.data;
    const user = await currentUser();
    const user_id = user?.id;
    if (!user_id) {
        throw new Error("User not found");
    }
    //create project
    const project = await db.project.create({
        data: {
            name,
            description,
        },
    });
    //create project of user
    const project_id = project?.id;
    await db.projectUser.create({
        data: {
            user_id,
            project_id,
            role: "ADMIN",
        },
    });
    //select project of user
    await db.user.update({
        where: {
            id: user_id,
        },
        data: {
            selected_project_id: project_id,
        },
    });
    redirect(`/dashboard`);
}

export async function update_project(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Project.',
        };
    }
    // Update project in database
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
    redirect(`/dashboard`);
}

export async function fetch_project_by_id(id: string) {
    const project = await db.project.findUnique({
        where: {
            id,
        },
    });
    return project;
}
