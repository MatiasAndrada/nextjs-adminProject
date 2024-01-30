
import { fetch_filtered_task_group } from '@/data/task-group';
import TaskGridItem from "@/components/task-group/task-group-grid-item";
import type { TaskGroup } from "@/definitions/task";

export default async function TaskGroupGrid({

    query,
    currentPage,
}: {

    query: string;
    currentPage: number;

}) {
    const task_groups = await fetch_filtered_task_group(query, currentPage)
    return (
        <div className="mt-4 p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {task_groups.map((task, index) => (
                <TaskGridItem key={index} task={task} />
            ))}
        </div>
    );
}
