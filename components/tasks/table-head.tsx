
/* import { SelectedColumns } from "@/definitions/task"; */
import type { Task } from "@prisma/client";
import TableBody from "@/components/tasks/table-body";


export default async function Table({ tasks }: { tasks: any }) {


    const columnHeaders = [
        { key: "id", label: "Task Id" },
        { key: "name", label: "Name" },
        /*         { key: "owner_id", label: "Owner" }, */
        { key: "status", label: "Status" },
        { key: "progress", label: "Progress" },
        { key: "updated at", label: "updatedAt" },
    ];

    /*  const filteredColumnHeaders = columnHeaders.filter(column => selectedColumns[column.key as keyof SelectedColumns]); */
    /*     const filteredColumnHeaders = columnHeaders.filter(column => selectedColumns[column.key as keyof Partial<Task>]); */

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
                                        {columnHeaders.map(column => (
                                            <th key={column.key} className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">{column.label}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <TableBody tasks={tasks} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}