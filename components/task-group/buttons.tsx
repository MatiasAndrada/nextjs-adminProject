import {  TrashIcon } from '@heroicons/react/24/outline';
import { delete_task_group } from '@/actions/task-group'

export function DeleteTaskGroup({ id }: { id: string }) {
    return (
        <>
            <form action={delete_task_group}>
                <input type="hidden" name="inputId" value={id} />
                <button type='submit' className="rounded-md border p-2 hover:bg-slate-300">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
}