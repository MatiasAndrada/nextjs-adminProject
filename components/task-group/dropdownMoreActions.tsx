import React from 'react'
import Link from 'next/link'
import { delete_task_group } from '@/actions/task-group'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'


const MoreActions = ({ id }: { id: string }) => {
    return (
        <div className=' flex gap-4'>
            <form >
                <span className="sr-only">Delete</span>

                <TrashIcon className='h-6 w-6' />

            </form>


            <Link href={`/dashboard/task-groups/${id}/edit`} className='p-2 rounded-full hover:bg-slate-700'>
                <PencilIcon className='h-6 w-6' />
            </Link>


        </div >
    )
}

export default MoreActions