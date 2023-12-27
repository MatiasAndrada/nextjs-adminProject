
import { fetch_task_of_task_group_for_table } from "@/app/lib/data/task-sql";
import { tasks } from "@/app/lib/placeholder-data";
import { SelectedColumns } from "@/app/lib/definitions/task";
import TableBody from "@/app/ui/task-group/tasks/table-body";


export default async function Table({ user_id, task_group_id, currentPage, selectedColumns }: { user_id: string, task_group_id: string, currentPage: number, selectedColumns: SelectedColumns }) {

    const tasks = await fetch_task_of_task_group_for_table(user_id, task_group_id, currentPage, selectedColumns)
    const columnHeaders = [
        { key: "task_id", label: "Task Id" },
        { key: "name", label: "Name" },
        /*         { key: "owner_id", label: "Owner" }, */
        { key: "status", label: "Status" },
        { key: "progress", label: "Progress" },
        { key: "ends_at", label: "Ends At" },
    ];

    const filteredColumnHeaders = columnHeaders.filter(column => selectedColumns[column.key as keyof SelectedColumns]);
    //El uso de as keyof SelectedColumns es una afirmación de tipo en TypeScript que dice que column.key es una clave del tipo SelectedColumns.
    return (
        <section className="flex flex-col justify-center antialiased  text-gray-600">
            <div className="h-full">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm">
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        {filteredColumnHeaders.map(column => (
                                            <th key={column.key} className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">{column.label}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <TableBody tasks={tasks} task_group_id={task_group_id} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}