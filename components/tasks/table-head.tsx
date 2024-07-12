/* import { SelectedColumns } from "@/definitions/task"; */
import { fetch_filtered_task, fetch_tasks_of_task_group } from "@/data/task";
import TableBody from "./table-body";

export default async function Table({
  query,
  currentPage,
  task_group_id,
}: {
  query: string;
  currentPage: number;
  task_group_id?: string;
}) {
  let tasks;
  if (task_group_id) {
    tasks = await fetch_tasks_of_task_group(task_group_id, currentPage);
  } else {
    tasks = await fetch_filtered_task(query, currentPage);
  }

  const columnHeaders = [
    { key: "id", label: "#Id" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "progress", label: "Progress" },
    { key: "updated at", label: "updatedAt" },
  ];

  return (
    <section className="flex flex-col justify-center antialiased">
      <div className="h-full">
        <div className="w-full mx-auto shadow-xl dark:shadow-slate-900 rounded-sm">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columnHeaders.map((column) => (
                    <th key={column.key} className="p-2 whitespace-nowrap">
                      <div className="font-semibold ">{column.label}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <TableBody tasks={tasks} />
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
