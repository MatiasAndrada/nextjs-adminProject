"use server";
import { CreateTaskGroupSchema } from '@/schemas/task-group';
import type { State } from '@/schemas/task-group';
import { db } from '@/lib/db';
import { currentUser } from '@/hooks/use-current-user';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


//! create task group
export async function create_task_group(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTaskGroupSchema.safeParse({
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
    return {
      message: 'Failed to Create Task Group.',
    };
  }

  // Invalidate the cache for the task group list page
  revalidatePath('/task-groups');

  // Redirect to the task group list page
  redirect('/task-groups');
}
