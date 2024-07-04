import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

export function CreateTask() {
    return (
        <Link
            href="/dashboard/tasks/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Task</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}
