import { db } from '@/lib/db';
import { currentUser } from '@/hooks/use-current-user';
import type { TaskGroup } from '@/definitions/task-group';
import { unstable_noStore as noStore } from 'next/cache';
import { ITEMS_PER_PAGE_TASK_GROUP } from '@/globals/globals';


const ITEMS_PER_PAGE = ITEMS_PER_PAGE_TASK_GROUP;

export async function fetch_filtered_task_group(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const user = await currentUser();
    const project_id = user?.selected_project_id;
    const task_group = await db.taskGroup.findMany({
      where: {
        project_id: project_id,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    //dto
    const task_group_dto = task_group.map((task_group) => {
      return {
        id: task_group.id,
        project_id: task_group.project_id,
        name: task_group.name,
        description: task_group.description,
        criticality: task_group.criticality,
        status: task_group.status,
        progress: task_group.progress,
        createdAt: task_group.createdAt,
        endsAt: task_group.endsAt,
        updatedAt: task_group.updatedAt,
      };
    });
    return task_group_dto;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task group.');
  }
}

export async function fetch_all_task_groups_ids() {
  noStore();
  try {
    const user = await currentUser();
    const project_id = user?.selected_project_id;
    const task_group = await db.taskGroup.findMany({
      where: {
        project_id: project_id,
      },
      select: {
        id: true,
      },
    });

    return task_group;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task group.');
  }
}

export async function fetch_task_group_pages(project_id: string, query: string) {
  // recibe una query y devuelve el numero de paginas
  // se le podría implementar una query por owner_id
  noStore();
  try {
    const count = await db.taskGroup.count({
      where: {
        project_id: project_id,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task group pages.')
  }
}
/*
export async function fetch_task_group_by_id(task_group_id: string) {
 // recibe un id y devuelve un grupo de tareas
 noStore();
 try {
   const task = await sql`
     SELECT
       task_group.task_group_id,
       task_group.user_id,
       task_group.owner_id,
       task_group.name,
       COALESCE(task_group.description, 'Sin descripción') AS description,
       task_group.criticality,
       task_group.status,
       task_group.progress,
       task_group.created_at,
       task_group.ends_at,
       task_group.updated_at
     FROM task_group
     WHERE task_group.task_group_id = ${task_group_id}
   `;
   //dto
   const taskDto = task.rows.map((task) => {
     return {
       task_group_id: task.task_group_id,
       user_id: task.user_id,
       owner_id: task.owner_id,
       name: task.name,
       description: task.description,
       criticality: task.criticality,
       status: task.status,
       progress: task.progress,
       created_at: task.created_at,
       ends_at: task.ends_at,
       updated_at: task.updated_at,
     }
   });
   return taskDto;
 }
 catch (err) {
   console.error('Database Error:', err);
   throw new Error('Failed to fetch task group.');
 }
} */
