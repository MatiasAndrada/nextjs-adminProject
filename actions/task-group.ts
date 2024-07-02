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
  try {
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
  catch (error) {
    console.log("error", error)
    return {
      message: 'Failed to Create Task Group.',
    };
  }

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

  // Prepare data for insertion into the database
  const { id, name, description, criticality } = validatedFields.data;
  // Insert data into the database
  try {

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
    // Invalidate the cache for the task group list page
    revalidatePath('/dashboard/task-groups');
    // Redirect to the task group list page
    redirect('/dashboard/task-groups');
  } catch (error) {
    console.log("error", error)
    return {
      message: 'Failed to Update Task Group.',
    };
  }

}



export async function delete_task_group(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  try {
    // Check the existence of the task group before deletion
    const existingTaskGroup = await db.taskGroup.findUnique({
      where: {
        id: inputId,
      },
    });

    if (!existingTaskGroup) {
      throw new Error('Task group not found for deletion.');
    }

    // Delete tasks associated with the group
    await db.$transaction(async (tx) => {
      // Delete tasks associated with the group
      await tx.task.deleteMany({
        where: {
          task_group_id: inputId,
        },
      });

      // Delete the task group
      await tx.taskGroup.delete({
        where: {
          id: inputId,
        },
      });
      revalidatePath('/dashboard/task-groups');
    });

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete task group.');
  }
}