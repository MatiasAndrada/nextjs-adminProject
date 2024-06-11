import Link from "next/link";
//components
import { Button } from "@/components/ui/button";
//icons
import {
    EyeIcon,
    PencilIcon
} from "@heroicons/react/24/outline";
import { setSelectedProject } from "@/actions/projects";


export function LinkCreate() {
    return (
        <Link href="/projects/create">
            <Button variant="create">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                Create a new project
            </Button>
        </Link>
    );
}

export async function LinkViewProject({ children }: { children: React.ReactNode }) {
    return (
        <Link href={`/dashboard`}>
            {children}
        </Link>
    );
}

export function LinkEditProject({ projectId }: { projectId: string }) {
    return (
        <Link href={`/projects/${projectId}/edit`}>
            <Button variant="ghost" >
                <PencilIcon className="w-4 h-4 mr-1" />

                <p>Update</p>
            </Button>
        </Link>
    );
}


