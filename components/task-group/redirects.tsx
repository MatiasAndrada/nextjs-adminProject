import Link from 'next/link';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

export function ViewTasks({ id }: { id: string }) {
    return (
        <Link
            href={`task-groups/` + id}
            className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-2 space-x-1 border-2 border-black  hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
        >
            <span>View Tasks</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
        </Link>

    )
}

export function CreateTaskGroup() {
    return (
        <Link
            href="/dashboard/task-groups/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block"> Create Task Group </span>
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateTaskGroup({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/task-groups/${id}/edit`
            }
            className="rounded-md border p-2 hover:bg-slate-300"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}