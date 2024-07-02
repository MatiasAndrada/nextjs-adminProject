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
    const { name, description, task_group_id } = validatedFields.data;
    await db.task.create({
        data: {
            name,
            description,
            task_group_id
        },
    });
    revalidatePath('/dashboard/tasks');
    redirect('/dashboard/tasks');
}

