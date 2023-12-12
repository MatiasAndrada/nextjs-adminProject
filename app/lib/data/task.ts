import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
    SearchFields,
    SelectedColumns
} from '../definitions/task';

export async function fetch_task_of_task_group(
    task_group_id: string, // id del grupo de tareas
    user_id: string, // id del usuario
    selectedColumns: SelectedColumns, // columnas seleccionadas
    currentPage: number // pagina actual
) {
    noStore(); // disable Next.js' response caching0
    try {
        const task = await sql<SearchFields>`
        SELECT
        ${selectedColumns.task_id ? 'task.task_id,' : ''}
        ${selectedColumns.task_group_id ? 'task.task_group_id,' : ''}
        ${selectedColumns.user_id ? 'task.user_id,' : ''}
        ${selectedColumns.owner_id ? 'task.owner_id,' : ''}
        ${selectedColumns.name ? 'task.name,' : ''}
        ${selectedColumns.description ? 'task.description,' : ''}
        ${selectedColumns.status ? 'task.status,' : ''}
        ${selectedColumns.progress ? 'task.progress,' : ''}
        ${selectedColumns.created_at ? 'task.created_at,' : ''}
        ${selectedColumns.ends_at ? 'task.ends_at,' : ''}
        ${selectedColumns.updated_at ? 'task.updated_at,' : ''}
        FROM task
        WHERE
        task.task_group_id = ${task_group_id} AND
        task.user_id = ${user_id}
        `;
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
                return taskDto; */
    }
    catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task group.');
    }
}