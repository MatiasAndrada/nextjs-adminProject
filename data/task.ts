"use server";
import { db } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import { ROWS_PER_PAGE_TASKS } from '@/globals';

import { Status } from '@prisma/client'

const ITEMS_PER_PAGE = ROWS_PER_PAGE_TASKS;

export async function fetch_task(id: string) {
    noStore();
    try {
        const task = await db.task.findUnique({
            where: {
                id: id,
            },
        });
        return task;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task.');
    }
}

export async function fetch_filtered_task(query: string, currentPage: number) {
    noStore(); // disable Next.js' response caching
    const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const task = await db.task.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            take: ITEMS_PER_PAGE,
            skip: OFFSET,
        });
        return task;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch tasks.');
    }
}
export async function fetch_tasks_of_task_group(
    task_group_id: string, // id del grupo de tareas
    currentPage: number, // pagina actual
    /*   selectedColumns: SelectedColumns, // columnas seleccionadas */
) {
    noStore(); // disable Next.js' response caching
    const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
    /*     const columns = selectedColumns.join(', '); */
    try {
        const task = await db.task.findMany({
            where: {
                task_group_id: task_group_id,
            },
            take: ITEMS_PER_PAGE,
            skip: OFFSET,
        });
        //dto
        /*         const taskDto = task.rows.map((task) => {
                    return {
                        task_id: task.task_id,
                        task_group_id: task.task_group_id,
                        user_id: task.user_id,
                        owner_id: task.owner_id,
                        name: task.name,
                        description: task.description,
                        status: task.status,
                        progress: task.progress,
                        created_at: task.created_at,
                        ends_at: task.ends_at,
                        updated_at: task.updated_at,
                    }
                });
                return taskDto;
            */
        return task;
    }
    catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task group.');
    }

}

export async function fetch_task_pages(query: string, task_group_id?: string | null) {
    //return number of pages
    noStore();
    try {
        const count = await db.task.count({
            where: {
                task_group_id: task_group_id ? task_group_id : undefined,
                name: {
                    contains: query, // search by name
                    mode: 'insensitive',
                },
            },
        });
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        return totalPages;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task pages.')
    }
}



//devolver el total de tareas activas
export async function fetch_count_in_progress_task(projectId: string) {
    noStore();
    try {
        const countInProgressTasks = await db.task.count({
            where: {
                taskGroup: {
                    project_id: projectId,
                    status: Status.COMPLETED,
                },
            },
        });
        return countInProgressTasks;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch active tasks count.');
    }
}
export async function fetch_count_total_tasks(projectId: string) {
    noStore();
    try {
        const countTotalTasks = await db.task.count({
            where: {
                taskGroup: {
                    project_id: projectId,
                },
            },
        });
        return countTotalTasks;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch total tasks count.');
    }
}

//necesito que retorne esto:
/*    countStatusTasks: {
        paused: number;
        pending: number;
        inProgress: number;
        completed: number;
    } */

export async function fetch_count_status_tasks(projectId: string) {
    noStore();
    try {
        const countStatusTasks = await db.task.groupBy({
            by: ['status'],
            where: {
                taskGroup: {
                    project_id: projectId,
                },
            },
            _count: {
                status: true,
            },
        });
        const flattenedData = countStatusTasks.map((task) => {
            return {
                status: task.status,
                value: task._count.status,
            };
        });
        return flattenedData;
    } catch (err) {
        console.error('Database Error:', err);
        return { error: 'Failed to fetch status tasks count.' };
    }
}