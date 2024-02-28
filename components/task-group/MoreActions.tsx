
import React from 'react'
import Link from 'next/link'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const DropdownMoreActions = ({ id }: { id: string }) => {
    return (
        <div className=' flex gap-4'>
            <div className='p-2'>
                <TrashIcon className='h-6 w-6' />
            </div>


            <Link href={`/dashboard/task-groups/${id}/edit`} className='p-2 rounded-full hover:bg-slate-700'>
                <PencilIcon className='h-6 w-6' />
            </Link>


        </div >
    )
}

export default DropdownMoreActions