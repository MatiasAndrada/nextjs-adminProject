import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export function ButtonCreate() {
    return (
        <Link href="/projects/create" >
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
    )
}

export function ButtonViewProject({ projectId }: { projectId: string }) {
    return (
        <Link href={`/projects/${projectId}`} >
            <Button variant="outline" size="sm">
                <EyeIcon className="w-6 h-6 mr-0.5" />
                View project
            </Button>
        </Link>
    )
}