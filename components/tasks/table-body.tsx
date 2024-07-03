"use client";
import { useRouter } from "next/navigation";
import { StatusIndicator, ProgressIndicator } from "../ui/indicators";
import { DocumentIcon } from "@heroicons/react/24/outline";
import type { Task } from "@prisma/client";

interface Props {
    tasks: Pick<Task, 'id' | 'task_group_id' | 'name' | 'status' | 'progress' | 'updatedAt'>[];
}

export default function TableBody({ tasks }: Props) {
    const router = useRouter();
    const lastDigitsId = (id: string) => id.slice(-3);
    return (
        <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-500">
            {tasks.map(({ id, task_group_id, name, status, progress, updatedAt }) => (
                <tr
                    key={id}
                    className="
                        h-14
                        bg-slate-300 dark:bg-slate-900
                        hover:bg-slate-200 dark:hover:bg-slate-800 dark:border-gray-700  cursor-pointer
                        "
                    onClick={() => {
                        router.push(`/dashboard/task-groups/${task_group_id}/task/${id}`);
                    }}
                >
                    <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                            <StatusIndicator status={status} >
                                <DocumentIcon className="w-6 h-6 " />
                            </StatusIndicator>
                            <div className="font-bold">
                                #{lastDigitsId(id)}
                            </div>
                        </div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-start">
                        <div className="">{name ?? ''}{!name?.endsWith('.') && '.'}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                        <StatusIndicator status={status} />
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <ProgressIndicator progress={progress} />
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        {/*                         <div className="text-left">
                            {updatedAt?.toString().slice(0, 10)}
                        </div> */}
                    </td>

                </tr>
            ))}
        </tbody>
    );
}
