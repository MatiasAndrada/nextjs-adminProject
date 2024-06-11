
import { fetch_filtered_task_group } from "@/data/task-group";
import type { TaskGroup } from '@prisma/client';
import { Criticality, Status } from "@prisma/client";
import { formatDate, convertFractionStringToPercentage } from '@/lib/utils';
export default async function TaskGroupTable({
    query,
    currentPage,
    taskGroup
}: {
    query: string;
    currentPage: number;
    taskGroup: Partial<TaskGroup>[];
}) {
    return (
        <table className="min-w-full  w-full text-xs text-center">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead className="dark:dark:bg-gray-700">
                <tr /* className="text-left" */>
                    <th className="p-3"> # Id</th>
                    <th className="p-3 text-start">Name</th>
                    <th className="p-3">Progress</th>
                    <th className="p-3">Updated At</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Criticality</th>
                </tr>
            </thead>
            <tbody>
                {taskGroup.map(({ id, name, progress, updatedAt, status, criticality }) => (
                    <tr
                        key={id}
                        className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900"
                    >
                        <td className="p-3">
                            <p>#{id && id.slice(-3)}</p>
                        </td>
                        <td className="p-3">
                            <p className="text-start">{name}</p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                            <div className="mx-2 flex font-bold">
                                <div
                                    className="h-2 w-16 rounded-full bg-slate-600 dark:bg-navy-700"
                                >

                                    <div className="mx-auto flex items-center">
                                        <div className="h-2 w-16 rounded-full bg-slate-300 dark:bg-navy-700">
                                            <div
                                                className="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-green-400"
                                                style={{
                                                    width: convertFractionStringToPercentage(progress ?? ''),
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="p-3 text-center">
                            {updatedAt &&
                                <p>{formatDate(updatedAt)}</p>}
                        </td>
                        <td className="p-3">
                            <span className={`px-3 py-1 font-semibold rounded-md 
                            ${status === Status.PAUSED ? 'text-status-paused' : ''}
                            ${status === Status.PENDING ? 'text-status-pending' : ''}
                            ${status === Status.IN_PROGRESS ? 'text-status-in_progress' : ''}
                            ${status === Status.COMPLETED ? 'text-status-completed' : ''}
                            `}>
                                <span>{status}</span>
                            </span>
                        </td>
                        <td className="p-3">
                            <span className={`px-3 py-1 font-semibold rounded-md 
                            ${criticality === Criticality.LOW ? 'text-criticality-low' : ''}
                            ${criticality === Criticality.MEDIUM ? 'text-criticality-medium' : ''}
                            ${criticality === Criticality.HIGH ? 'text-criticality-high' : ''}
                            ${criticality === Criticality.CRITICAL ? 'text-criticality-critical' : ''}
                            `}>
                                <span>{criticality}</span>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}