import { fetch_filtered_task_group } from "@/data/task-group";
import TaskGridItem from "@/components/task-group/task-group-grid-item";


export default async function TaskGroupGrid({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const task_groups = await fetch_filtered_task_group(query, currentPage);
    return (
        <div className=" p-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {task_groups.map((task, index) => (
                <TaskGridItem key={index} task={task} />
            ))}
        </div>
    );
}
