
import { fetch_filtered_task_group } from "@/data/task-group";
import type { Criticality } from "@prisma/client";
import { formatDate } from '@/lib/utils';
export default async function TaskGroupTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const task_groups = await fetch_filtered_task_group(query, currentPage);
    return (
        <table className="min-w-full  w-full text-xs">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead className="dark:dark:bg-gray-700">
                <tr className="text-left">
                    <th className="p-3">Id  #</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Progress</th>
                    <th className="p-3">Updated At</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Criticality</th>
                </tr>
            </thead>
            <tbody>
                {task_groups.map(({ id, name, progress, updatedAt, criticality }) => (
                    <tr
                        key={id}
                        className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900"
                    >
                        <td className="p-3">
                            <p>#{id && id.slice(-3)}</p>
                        </td>
                        <td className="p-3">
                            <p>{name}</p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                            <div className="mx-2 flex font-bold">
                                <div
                                    className="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                                >
                                    <div
                                        className="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-red-400"
                                        style={{ width: '45%' }}
                                    ></div>
                                </div>
                            </div>
                        </td>
                        <td className="p-3 text-center">
                            <p>{formatDate(updatedAt)}</p>
                        </td>
                        <td className="p-3">
                            <span className="px-3 py-1 font-semibold rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900">
                                <span>{criticality}</span>
                            </span>
                        </td>
                        <td className="p-3">
                            <span className="px-3 py-1 font-semibold rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900">
                                <span>{criticality}</span>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}