import { db } from '@/lib/db';
import { currentUser } from '@/hooks/use-current-user';
import { fetch_all_task_groups_ids } from './task-group';
import { unstable_noStore as noStore } from 'next/cache';
import { ITEMS_PER_PAGE_TASKS } from '@/globals/globals';
import {
    SearchFields,
    SelectedColumns,
} from '@/definitions/task';

const ITEMS_PER_PAGE = ITEMS_PER_PAGE_TASKS;

export async function fetch_task_of_task_group_for_table(
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
// fetch_task_of_task_group_for_table no tiene definida la funcion de busqueda aun crear otra fn o modificar esta

export async function fetch_all_tasks_of_project() {
    noStore(); // disable Next.js' response caching
    const task_group_ids = await fetch_all_task_groups_ids();
    try {
        const task = await db.task.findMany({
            where: {
                task_group_id: {
                    in: task_group_ids.map((taskGroup) => taskGroup.id),
                },
            },
        });

        return task;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch tasks.');
    }
}

export async function fetch_task_pages(task_group_id: string, query: string) {
    //return number of pages
    noStore();
    try {
        const count = await db.task.count({
            where: {
                task_group_id: task_group_id,
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
export async function fetch_count_active_task(id: string) {
    noStore();
    try {
        const taskGroupsIds = await fetch_all_task_groups_ids();
        const countActiveTasks = await db.task.count({
            where: {
                task_group_id: {
                    in: taskGroupsIds.map((taskGroup) => taskGroup.id),
                },
                status: 'Active',
            },
        });
        return countActiveTasks;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch active tasks count.');
    }
}