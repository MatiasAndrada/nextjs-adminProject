import TaskGrid from "./task-grid";
import { fetch_filtered_task_group } from "@/app/lib/data/tasks";

export default async function TaskGroup({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;

}) {
    const task_groups = await fetch_filtered_task_group(query, currentPage); return (
        <div className="flex flex-wrap -mx-3 mb-5">
            <TaskGrid Task={task_groups} />
        </div>
    )
}