
import { fetch_filtered_task_group } from '@/app/lib/data/task-group-sql';
import TaskGridItem from "@/app/ui/task-group/task-group-grid-item";
import type { TaskGroup } from "@/app/lib/definitions/task";

export default async function TaskGroupGrid({
    user_id,
    query,
    currentPage,
}: {
    user_id: string;
    query: string;
    currentPage: number;

}) {


    const task_groups = await fetch_filtered_task_group(user_id, query, currentPage)


    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {task_groups.map((task, index) => (
                <TaskGridItem key={index} task={task} />
            ))}
        </div>
    );
}
