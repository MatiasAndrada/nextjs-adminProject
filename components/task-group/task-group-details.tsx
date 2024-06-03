import React from 'react'

import { fetch_task_group_by_id } from "@/data/task-group";


const TaskGroupDetails = async ({ id }: { id: string }) => {
    const { name, description, status, progress, criticality, createdAt } = await fetch_task_group_by_id(id);
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{description}</p>
            <div className="flex gap-2">
                <span className="text-sm text-gray-500">Status: {status}</span>
                <span className="text-sm text-gray-500">Progress: {progress}</span>
                <span className="text-sm text-gray-500">Criticality: {criticality}</span>
            </div>
            {/*             <span className="text-sm text-gray-500">Created At: {createdAt}</span> */}
        </div>

    )
}

export default TaskGroupDetails