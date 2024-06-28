"use client";
import { useRouter } from "next/navigation";
import { StatusIndicator } from "../ui/indicators";
import { DocumentIcon } from "@heroicons/react/24/outline";
import type { Task } from "@prisma/client";
import { Status } from "@prisma/client";

interface Props {
    tasks: Pick<Task, 'id' | 'task_group_id' | 'name' | 'status' | 'progress' | 'updatedAt'>[];
}

export default function TableBody({ tasks }: Props) {
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
                        <StatusIndicator status={status} />
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
