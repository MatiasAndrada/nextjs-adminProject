"use client";
import { useRouter } from "next/navigation";
/* import { SearchFields } from "@/definitions/task"; */
import { DocumentIcon } from "@heroicons/react/24/outline";
import type { Task } from "@prisma/client";
import { Status } from "@prisma/client";
export default function TableBody({ tasks }: { tasks: Partial<Task>[] }) {
    const router = useRouter();

    return (
        <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-500">
            {tasks.map(({ id, task_group_id, name, status, progress, updatedAt }) => (
                <tr
                    key={id}
                    className="table-row-link
                        bg-slate-300 dark:bg-slate-900
                        hover:bg-slate-200 dark:hover:bg-slate-800 dark:border-gray-700  cursor-pointer
                        "
                    onClick={() => {
                        router.push(`/dashboard/task-groups/${task_group_id}/task/${id}`);
                    }}
                >
                    <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                                <DocumentIcon className={`h-6 w-6 ${status === Status.PAUSED ? "text-status-paused" : ""} ${status === Status.PENDING ? "text-status-pending" : ""} ${status === Status.IN_PROGRESS ? "text-status-in_progress" : ""} ${status === Status.COMPLETED ? "text-status-completed" : ""}`} />
                            </div>
                            {/*mostrar 3 últimos dígitos de id */}
                            <div className="font-bold">
                                #{id && id.slice(-3)}
                            </div>
                        </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{name ?? ''}{!name?.endsWith('.') && '.'}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <span
                            className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1
                            ${status === Status.PAUSED ? "text-status-paused p-2 bg-status-paused_foreground" : ""}
                            ${status === Status.PENDING ? "text-status-pending p-2 bg-status-pending_foreground" : ""}
                            ${status === Status.IN_PROGRESS ? "text-status-in_progress p-2 bg-status-in_progress_foreground" : ""}
                            ${status === Status.COMPLETED ? "text-status-completed p-2 bg-status-completed_foreground" : ""}`}
                        >
                            {status}
                        </span>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{progress}%</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                            {updatedAt?.toString().slice(0, 10)}
                        </div>
                    </td>

                </tr>
            ))}
        </tbody>
    );
}
