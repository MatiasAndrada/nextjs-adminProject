"use server";
import { CreateSchema } from '@/schemas/task';
import { db } from '@/lib/db';
/* import { currentUser } from '@/hooks/use-current-user'; */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Status } from '@prisma/client';
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

export async function set_status_of_task(id: string, status: Status) {
    await db.task.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
    revalidatePath('/dashboard/tasks');
    return { message: 'Task status updated successfully.' };
}