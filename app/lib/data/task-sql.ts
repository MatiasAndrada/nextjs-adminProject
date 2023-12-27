import { sql, db } from '@vercel/postgres';

import { unstable_noStore as noStore } from 'next/cache';
import { ITEMS_PER_PAGE_TASKS } from '@/globals/globals';
import {
    SearchFields,
    SelectedColumns,
} from '../definitions/task';

const ITEMS_PER_PAGE = ITEMS_PER_PAGE_TASKS;

export async function fetch_task_of_task_group_for_table(
    user_id: string, // id del usuario 
    task_group_id: string, // id del grupo de tareas
    currentPage: number, // pagina actual
    selectedColumns: SelectedColumns, // columnas seleccionadas
) {


    noStore(); // disable Next.js' response caching
    const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;

    const columns = Object.entries(selectedColumns)
        .filter(([, isSelected]) => isSelected)
        .map(([column]) => `"${column}"`)
        .join(', ');
    try {
        const result = await db.query<SearchFields>(`
            SELECT ${columns}
            FROM task
            WHERE
                task.user_id = $1 AND
                task.task_group_id = $2
            ORDER BY task.task_id DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}
        `, [user_id, task_group_id]);

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
        return result.rows;
    }
    catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task group.');
    }
}

export async function fetch_task_pages(user_id: string, task_group_id: string, query: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
FROM task
WHERE
task.user_id = ${user_id} AND
task.task_group_id = ${task_group_id} AND
(task.name ILIKE ${`%${query}%`} OR
task.status ILIKE ${`%${query}%`})
`;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task pages.')
    }

}