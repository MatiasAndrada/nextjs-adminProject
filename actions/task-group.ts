"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { CreateSchema, UpdateSchema } from '@/schemas/task-group';
import { currentProjectId } from '@/hooks/use-current-project';
import type { State } from '@/schemas/task-group';
import { Status } from '@prisma/client';
export async function create_task_group(prevState: State, formData: FormData) {
  const validatedFields = CreateSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task Group.',
    };
  }
  const { name, description, criticality } = validatedFields.data;
  const current_project_id = await currentProjectId();
  await db.taskGroup.create({
    data: {
      name,
      description,
      criticality,
      project_id: current_project_id,
    },
  });
  revalidatePath('/dashboard/task-groups');
  redirect('/dashboard/task-groups')
}

export async function update_task_group(prevState: State, formData: FormData) {
  const validatedFields = UpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
    startAt: new Date(formData.get("startDate") as string),
    endAt: new Date(formData.get("endDate") as string),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task Group.',
    };
  }
  const { id, name, description, criticality, startAt, endAt } = validatedFields.data;
  await db.taskGroup.update({
    where: {
      id: id,
    },
    data: {
      name,
      description,
      criticality,
      startAt,
      endAt
    },
  });
  revalidatePath('/dashboard/task-groups');
  redirect('/dashboard/task-groups');
}

export async function delete_task_group(id: string) {
  ;
  await db.taskGroup.delete({
    where: {
      id
    },
  });
  revalidatePath('/dashboard/task-groups');
  redirect('/dashboard/task-groups');
}

export async function set_status_of_task_group(id: string, status: Status) {
  await db.taskGroup.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  revalidatePath('/dashboard/task-groups');
  return { message: 'Task Group status updated successfully.' };
}
