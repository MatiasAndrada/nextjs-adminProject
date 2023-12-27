"use client";
import { useRouter } from 'next/navigation'
import { SearchFields } from "@/app/lib/definitions/task"
export default function TableBody({ tasks, task_group_id }: { tasks: SearchFields[], task_group_id: string }) {
    const router = useRouter()

    return (
        <tbody className="text-sm divide-y divide-gray-100">
            {tasks.map((task: SearchFields) => (
                <tr key={task.task_id} className="table-row-link
                hover:bg-gray-100 cursor-pointer
                " onClick={() => {
                        router.push(`/dashboard/task-group/${task_group_id}/tasks/${task.task_id}`)
                    }}
                >
                    <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt={task.name} />
                            </div>
                            {/*mostrar 3 últimos dígitos de id */}
                            <div className="font-medium text-gray-800">{task.task_id && task.task_id.slice(-3)}</div>
                        </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{task.name}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{task.status}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{task.progress}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{task.endsAt}</div>
                    </td>

                </tr>
            ))
            }
        </tbody >
    );
}