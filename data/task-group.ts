import { db } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import { currentUser } from '@/hooks/use-current-user';
/* import type { TaskGroup } from '@/definitions/task-group'; */
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

export async function fetch_count_active_task_group(id: string) {
  noStore();
  //devolver la cantidad de grupos de tareas activos
  const task_groups = await db.project.findMany({
    select: {
      _count: {
        select: {
          taskGroup: {
            where: {
              project_id: id,
              status: 'Active',
            },
          },
        },
      },
    },
    where: {
      id: id,
    },
  });
  //dto - number of active task groups
  const active_task_groups = task_groups[0]._count.taskGroup;
  return active_task_groups;
}

export async function delete_task_group(id: string) {
  noStore();
  try {
    const task_group = await db.taskGroup.delete({
      where: {
        id: id,
      },
    });
    return task_group;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to delete task group.');
  }
}

