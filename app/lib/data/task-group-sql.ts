import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { ITEMS_PER_PAGE_TASK_GROUP } from '@/globals/globals';
import {
  TaskGroup
} from '../definitions/task';

const ITEMS_PER_PAGE = ITEMS_PER_PAGE_TASK_GROUP;

export async function fetch_filtered_task_group(
  user_id: string,
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const task = await sql<TaskGroup>`
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
      WHERE
      task_group.user_id = ${user_id} AND
      (task_group.name ILIKE ${`%${query}%`} OR
      task_group.status ILIKE ${`%${query}%`})
      ORDER BY task_group.task_group_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
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
}


export async function fetch_task_group_pages(user_id: string, query: string) {
  // recibe una query y devuelve el numero de paginas
  // se le podría implementar una query por owner_id
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM task_group
      WHERE
      task_group.user_id = ${user_id} AND
      task_group.name ILIKE ${`%${query}%`} OR
      task_group.status ILIKE ${`%${query}%`} 
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task group pages.')
  }
}

export async function fetch_task_group_by_id(task_group_id: string) {
  // recibe un id y devuelve un grupo de tareas
  noStore();
  try {
    const task = await sql<TaskGroup>`
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
}
