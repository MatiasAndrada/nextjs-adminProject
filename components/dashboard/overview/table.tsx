"use client";
/* import { fetch_filter,ed_task_group } from "@/data/task-group"; */
import { useRouter } from "next/navigation";
import { StatusIndicator, CriticalityIndicator, ProgressIndicator } from "@/components/ui/indicators";
import { formatDate } from "@/lib/utils";
import type { TaskGroup } from "@prisma/client";

interface Props {
    query: string;
    currentPage: number;
    taskGroup: Pick<TaskGroup, 'id' | 'name' | 'progress' | 'updatedAt' | 'status' | 'criticality'>[];
}

export default async function TaskGroupTable({
    query,
    currentPage,
    taskGroup,
}: Props) {
    const router = useRouter();
    return (
        <table className="min-w-full w-full text-xs text-center">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead className="text-xs font-semibold uppercase bg-slate-500 dark:bg-slate-700">
                <tr /* className="text-left" */>
                    <th className="p-3"># Id</th>
                    <th className="p-3 text-start">Name</th>
                    <th className="p-3">Tasks Completed</th>
                    <th className="p-3">Updated At</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Criticality</th>
                </tr>
            </thead>
            <tbody>
                {taskGroup.map(
                    ({ id, name, progress, updatedAt, status, criticality }) => (
                        <tr
                            key={id}
                            className="table-row-link
                        bg-slate-400 dark:bg-slate-900
                        hover:bg-slate-200 dark:hover:bg-slate-800 dark:border-gray-700  cursor-pointer
                        "
                            onClick={() => {
                                router.push(`/dashboard/task-groups/${id}`);
                            }}
                        >
                            <td className="p-3">
                                <p>#{id && id.slice(-3)}</p>
                            </td>
                            <td className="p-3">
                                <p className="text-start">{name}</p>
                            </td>
                            <td className="py-3 text-sm" role="cell">
                                <ProgressIndicator progress={progress} />
                            </td>
                            <td className="p-3 text-center">
                                {updatedAt && <p>{formatDate(updatedAt)}</p>}
                            </td>
                            <td className="p-3">
                                <StatusIndicator status={status} />
                            </td>
                            <td className="p-3">
                                <CriticalityIndicator criticality={criticality}>
                                    {criticality}
                                </CriticalityIndicator>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
}
