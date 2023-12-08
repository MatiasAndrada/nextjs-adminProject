import TaskGridItem from './task-grid-item';
import { fetch_filtered_task_group } from '@/app/lib/data/tasks';

export default async function TaskGroupGrid({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;

}) {
    const task_groups = await fetch_filtered_task_group(query, currentPage);

    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {task_groups.map((task, index) => (
                <TaskGridItem key={index} task={task} />
            ))}
        </div>
    );
}
