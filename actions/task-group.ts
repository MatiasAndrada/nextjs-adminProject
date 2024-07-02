"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { CreateSchema, UpdateSchema } from '@/schemas/task-group';
import { currentProjectId } from '@/hooks/use-current-project';
import type { State } from '@/schemas/task-group';


//! create task group
export async function create_task_group(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task Group.',
    };
  }
  // Prepare data for insertion into the database
  const { name, description, criticality } = validatedFields.data;
  // Insert data into the database

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

//! update task group
export async function update_task_group(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task Group.',
    };
  }
  const { id, name, description, criticality } = validatedFields.data;
  await db.taskGroup.update({
    where: {
      id: id,
    },
    data: {
      name,
      description,
      criticality,
    },
  });
  revalidatePath('/dashboard/task-groups');
  redirect('/dashboard/task-groups');
}



export async function delete_task_group(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  await db.taskGroup.delete({
    where: {
      id: inputId,
    },
  });
  revalidatePath('/dashboard/task-groups');
  redirect('/dashboard/task-groups');
}