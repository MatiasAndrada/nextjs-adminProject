import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
/* import { deleteInvoice } from '@/actions';
 */import Link from 'next/link';

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

/* export function UpdateInvoice({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/invoices/${id}/edit`}
            className="rounded-md border p-2 hover:bg-slate-300"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteInvoice({ id }: { id: string }) {
        const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    return (
        <>
            <form >
                <button className="rounded-md border p-2 hover:bg-slate-300">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
} */
