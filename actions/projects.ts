"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    name: z.string().min(4).max(80),
    description: z.string().max(4000),
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type State = {
    errors?: {
        name?: string[],
        description?: string[],
        createdAt?: string[],
    }
    message?: string | null;
}

//!create project
export async function create_project(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        createdAt: formData.get('createdAt'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Project.',
        };
    }

    // Insert new project into database
    /*     const { name, description, createdAt } = validatedFields.data;
        const { project_id } = await db.query(
            sql`INSERT INTO projects (name, description, created_at) VALUES (${name}, ${description}, ${createdAt}) RETURNING project_id`
        );
     */
    // Redirect to new project
    return redirect(`/projects/${project_id}`);
}
