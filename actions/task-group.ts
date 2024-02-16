"use server";
import { CreateSchema } from '@/schemas/task-group';
import { db } from '@/lib/db';
import { currentUser } from '@/hooks/use-current-user';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { State } from '@/schemas/task-group';


//! create task group
export async function create_task_group(prevState: State, formData: FormData) {
  console.log(0)
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
  try {
    const user = await currentUser();
    const user_id = user?.id;
    const selected_project_id = user?.selected_project_id;
    if (!user_id) {
      throw new Error('User not found');
    }
    if (!selected_project_id) {
      throw new Error('Project not found');
    }
    await db.taskGroup.create({
      data: {
        name,
        description,
        criticality,
        project_id: selected_project_id,
      },
    });
  }
  catch (error) {
    console.log("error", error)
    return {
      message: 'Failed to Create Task Group.',
    };
  }

  // Invalidate the cache for the task group list page
  revalidatePath('/dashboard/task-groups');

  // Redirect to the task group list page
  redirect('/dashboard/task-groups');
}
