import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
    taskGroup
} from '../definitions/task';

export async function fetch_task_of_task_group(task_group_id: string, query: string) {
    // recibe un id del group y una query y devuelve un array de tareas
    // se le podría implementar una query por owner_id
    noStore();
    try {
        const task = await sql<taskGroup>`
        SELECT
            task.task_id,
            task.task_group_id,
            task.user_id,
            task.owner_id,
            task.name,
            COALESCE(task.description, 'Sin descripción') AS description,
            task.status,
            task.progress,
            task.created_at,
            task.ends_at,
            task.updated_at
        FROM task
        WHERE
        task.task_group_id = ${task_group_id} AND
        task.name ILIKE ${`%${query}%`} OR
        task.status ILIKE ${`%${query}%`} 
        ORDER BY task.task_id DESC
        `;
        //dto
        const taskDto = task.rows.map((task) => {
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
    }
    catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch task group.');
    }
}