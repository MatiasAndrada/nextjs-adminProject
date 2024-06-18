import { UserPlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function AddMember() {
    return (
        <Link
            href="/dashboard/members/add"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Add member</span>{' '}
            <UserPlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function EditMember({id , children}: {id:string, children?: React.ReactNode}) {
    return (
        <button className="flex items-center justify-center w-6 h-6 bg-transparent border-0 outline-none focus:outline-none">
            <PencilIcon className="h-5 w-5 text-dark" />
            {children}
        </button>
    );
}

export function DeleteMember({id , children}: {id:string, children?: React.ReactNode}) {
    return (
        <button className="flex items-center justify-center w-6 h-6 bg-transparent border-0 outline-none focus:outline-none">
            <TrashIcon className="h-5 w-5 text-dark" />
        </button>
    );
}