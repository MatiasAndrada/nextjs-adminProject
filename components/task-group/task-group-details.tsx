import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { CriticalityIndicator, StatusIndicator } from './indicators';
import { fetch_task_group_by_id } from "@/data/task-group";


const TaskGroupDetails = async ({ id }: { id: string }) => {
    const { name, description, status, progress, criticality, createdAt } = await fetch_task_group_by_id(id);
    return (
        <div className="flex flex-row justify-between text-slate-800 dark:text-slate-300">
            <div className='max-w-3xl	'>
                <h2 className="text-black dark:text-white text-xl font-semibold">{name}</h2>
                <Link href={`/projects/${id}/edit`}></Link>
                <p className="text-md">{description}</p>

            </div>
            <div className='flex flex-col justify-items-center items-center'>
                <span className="text-md ">Criticality:  </span>
                <CriticalityIndicator criticality={criticality} />
            </div>
            <div className='flex flex-col justify-items-center items-center'>
                <span className="text-md ">Progress: </span>
                {progress}
            </div>
            <div className='flex flex-col justify-items-center items-center'>
                <span className="text-md ">Status: </span>
                <StatusIndicator status={status} />
            </div>
        </div>
    )
}
export default TaskGroupDetails