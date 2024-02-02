"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Status } from "@/definitions/task";

const FormSchema = z.object({
  user_id: z.string().uuid(),
  task_group_id: z.string().uuid(),
  owner_id: z.string().uuid(),
  name: z.string().min(4).max(80),
  description: z.string().max(1000),
  /*   criticality: z.nativeEnum(Criticality), */
  status: z.nativeEnum(Status),
  progress: z.number().int().min(0).max(100),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const CreateTaskGroup = FormSchema.omit({
  task_group_id: true,
  status: true,
  progress: true,
  createdAt: true,
});

export type State = {
  errors?: {
    name?: string[],
    description?: string[],
    criticality?: string[],
    status?: string[],
    progress?: string[],
    endsAt?: string[],
  }
  message?: string | null;
}

//! create task group
export async function create_task_group(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTaskGroup.safeParse({
    user_id: formData.get('user_id'),
    owner_id: formData.get('owner_id'),
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
    endsAt: formData.get('endsAt'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task Group.',
    };
  }

  // Prepare data for insertion into the database
  const { user_id, owner_id, name, description, endsAt } = validatedFields.data;
  const createdAt = new Date().toISOString().split('T')[0];
  const updatedAt = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO task_groups (user_id, owner_id, name, description, criticality, created_at, updated_at, ends_at)
        VALUES (${user_id}, ${owner_id}, ${name}, ${description},  ${createdAt}, ${updatedAt}, ${endsAt})
      `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to Create Task Group. Please try again.',
    };
  }

  // Invalidate the cache for the task group list page
  revalidatePath('/task-groups');

  // Redirect to the task group list page
  redirect('/task-groups');
}
