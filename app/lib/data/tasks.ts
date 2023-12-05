import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  taskTable
} from '.././definitions/task';


const ITEMS_PER_PAGE = 10;

export async function fetch_filtered_task(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const task = await sql<taskTable>`
      SELECT
        task_group.id,
        task_group.task,
        task_group.owner_id,
        task_group.status,
        task_group.progress,
        task_group.ends_at,
        task_group.updated_at,
      FROM task_group
      WHERE
      task_group.task ILIKE ${`%${query}%`} OR
      task_group.owner_id ILIKE ${`%${query}%`} OR
      task_group.status ILIKE ${`%${query}%`} 
      ORDER BY task_group.id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return task;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task.');
  }
}

export async function fetch_task_pages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM task_group
      WHERE
      task_group.task ILIKE ${`%${query}%`} OR
      task_group.owner ILIKE ${`%${query}%`} OR
      task_group.status ILIKE ${`%${query}%`} 
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch task pages.')
  }
}