"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { CreateSchema, UpdateSchema } from "@/schemas/task-group";
import { currentProjectId } from "@/hooks/use-current-project";
import { useProjectRoleHasAccess } from "@/hooks/use-current-role";
import type { State } from "@/schemas/task-group";
import { Criticality, Status, Role } from "@prisma/client";

export async function create_task_group(prevState: State, formData: FormData) {
  const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN]);
  if (has_access !== true) {
    return { error: "You do not have permission to create task groups." };
  }
  const validatedFields = CreateSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    criticality: formData.get("criticality"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create task group.",
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
  revalidatePath("/dashboard/task-groups");
  redirect("/dashboard/task-groups");
}

export async function update_task_group(prevState: State, formData: FormData) {
  const validatedFields = UpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    criticality: formData.get("criticality"),
    startAt: new Date(formData.get("startDate") as string),
    endAt: new Date(formData.get("endDate") as string),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update task group.",
    };
  }
  const { id, name, description, criticality, startAt, endAt } =
    validatedFields.data;
  await db.taskGroup.update({
    where: {
      id: id,
    },
    data: {
      name,
      description,
      criticality,
      startAt,
      endAt,
    },
  });
  revalidatePath("/dashboard/task-groups");
  redirect("/dashboard/task-groups");
}

export async function delete_task_group(id: string) {
  const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN]);
  if (has_access !== true) {
    return { error: "You do not have permission to delete task groups." };
  }
  await db.taskGroup.delete({
    where: {
      id,
    },
  });
  revalidatePath("/dashboard/task-groups");
  redirect("/dashboard/task-groups");
}

export async function set_criticality_of_task_group(
  id: string,
  criticality: Criticality
) {
  const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN]);
  if (has_access !== true) {
    return { error: "You do not have permission to change criticality." };
  }
  await db.taskGroup.update({
    where: {
      id,
    },
    data: {
      criticality,
    },
  });
  revalidatePath("/dashboard/task-groups");
  return { message: "Task Group criticality updated successfully." };
}

export async function set_status_of_task_group(id: string, status: Status) {
  const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN]);
  if (has_access !== true) {
    return { error: "You do not have permission to perform this action." };
  }
  await db.taskGroup.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  revalidatePath("/dashboard/task-groups");
  return { success: "Task group status updated successfully." };
}
