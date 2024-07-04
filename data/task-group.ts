import { db } from '@/lib/db';
import { CARDS_PER_PAGE_TASK_GROUP } from '@/globals';
import { unstable_noStore as noStore } from 'next/cache';
import { currentUser } from '@/hooks/use-current-user';
import { currentProject } from '@/hooks/use-current-project';
/* import { formatDate } from '@/lib/utils'; */
import { Status } from '@prisma/client';
/* import type { TaskGroup } from '@/definitions/task-group'; */
const ITEMS_PER_PAGE = CARDS_PER_PAGE_TASK_GROUP;

export async function fetch_task_group_by_id(id: string) {
  noStore();
  try {
    const task_group = await db.taskGroup.findUnique({
      where: {
        id: id,
      },
    });
    if (!task_group) {
      throw new Error('Task group not found.');
    }
    return task_group;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task group.');
  }
}

export async function fetch_filtered_task_group(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const project = await currentProject();
    const project_id = project?.id
    const task_group = await db.taskGroup.findMany({
      where: {
        project_id: project_id,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        progress: true,
        updatedAt: true,
        status: true,
        criticality: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return task_group;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task group.');
  }
}

export async function fetch_all_task_groups_ids() {
  noStore();
  try {
    const project = await currentProject();
    const project_id = project?.id
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

export async function fetch_all_task_groups_names_ids() {
  noStore();
  try {
    const project = await currentProject();
    const project_id = project?.id
    const task_group = await db.taskGroup.findMany({
      where: {
        project_id: project_id,
      },
      select: {
        name: true,
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

export async function fetch_task_group_pages(query: string) {
  noStore();
  try {
    const project = await currentProject();
    const project_id = project?.id
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

export async function fetch_count_in_progress_task_group(id: string) {
  noStore();
  //devolver la cantidad de grupos de tareas activos
  const task_groups_completed = await db.project.findMany({
    select: {
      _count: {
        select: {
          taskGroup: {
            where: {
              project_id: id,
              status: Status.COMPLETED,
            },
          },
        },
      },
    },
    where: {
      id: id,
    },
  });
  const dto = task_groups_completed[0]._count.taskGroup;
  return dto
}

export async function fetch_count_total_task_group(id: string) {
  const task_group_total = await db.project.findMany({
    select: {
      _count: {
        select: {
          taskGroup: {
            where: {
              project_id: id,
            },
          },
        },
      },
    },
    where: {
      id: id,
    },
  });
  const dto = task_group_total[0]._count.taskGroup;
  return dto;
}