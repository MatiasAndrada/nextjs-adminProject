"use server";
import { CreateSchema, UpdateSchema } from '@/schemas/task';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useProjectRoleHasAccess } from '@/hooks/use-current-role';
import { Status, Role } from '@prisma/client';
import type { State } from '@/schemas/task';


//! create task group
export async function create_task(prevState: State, formData: FormData) {
    const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN]);
    if (has_access !== true) {
        return { error: "You do not have permission to create tasks." };
    }
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

export async function update_task(prevState: State, formData: FormData) {
    console.log(formData)
    const validatedFields = UpdateSchema.safeParse({
        id: formData.get("id"),
        task_group_id: formData.get("id_task_group"),
        name: formData.get("name"),
        description: formData.get("description"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to update task group.",
        };
    }
    const { task_group_id, id, name, description, } =
        validatedFields.data;
    await db.task.update({
        where: {
            task_group_id: task_group_id,
            id: id,
        },
        data: {
            name,
            description,
        },
    });
    revalidatePath(`/dashboard/task-groups/${task_group_id}/task/${id}`);
    redirect(`/dashboard/task-groups/${task_group_id}/task/${id}`);
}

export async function set_status_of_task(id: string, status: Status) {
    const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN, Role.EDITOR])
    if (has_access !== true) {
        return { error: "You do not have permission to change status." };
    }
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

export async function set_progress_of_task(id: string, value: number) {
    const has_access = await useProjectRoleHasAccess(([Role.OWNER, Role.ADMIN, Role.EDITOR]))
    if (has_access !== true) {
        return { error: "You do not have permission to change progress task." };
    }
    await db.task.update({
        where: { id },
        data: {
            progress: value
        }
    })
    revalidatePath("/dashboard/tasks")
    return { message: 'Task progress updated successfully.' };
}