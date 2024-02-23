"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import { setSelectedProject } from '@/actions/select-project'
import { EyeIcon } from "@heroicons/react/24/outline";


const ButtonViewProject = ({ projectId }: { projectId: string }) => {
    const router = useRouter();
    const handleViewProject = async () => {
        try {
            await setSelectedProject(projectId);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error al seleccionar el proyecto:", error);
        }
    }

    return (
        <button
            className=' className="flex items-center text-blue-600 bg-blue-100 hover:bg-blue-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"'
            onClick={handleViewProject}
        >
            <EyeIcon className="w-6 h-6 mr-2" />
            View Project
        </button>
    )
}

export default ButtonViewProject