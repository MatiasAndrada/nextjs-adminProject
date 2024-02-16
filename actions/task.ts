"use server";
import { CreateSchema } from '@/schemas/task';
import { db } from '@/lib/db';
/* import { currentUser } from '@/hooks/use-current-user'; */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { State } from '@/schemas/task';


//! create task group
export async function create_task(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        task_group_id: formData.get('task_group_id'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Task Group.',
        };
    }

    // Prepare data for insertion into the database
    const { name, description, task_group_id } = validatedFields.data;
    console.log("🦇 ~ create_task ~ task_group_id:", task_group_id)
    console.log("🦇 ~ create_task ~ description:", description)
    console.log("🦇 ~ create_task ~ name:", name)

    // Insert data into the database
    try {
        await db.task.create({
            data: {
                name,
                description,
                task_group_id
            },
        });

    }
    catch (error) {
        console.log("error", error)
        return {
            message: 'Failed to Create Task.',
        };
    }
    // Invalidate the cache for the task group list page
    revalidatePath('/dashboard/tasks');

    // Redirect to the task group list page
    redirect('/dashboard/tasks');
}
