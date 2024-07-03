import Link from "next/link";
//components
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";
//icons

export function LinkCreate() {
    return (
        <Link href="/projects/create" className="w-full flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block -mb-1 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create project
        </Link>
    );
}

export function UpdateProject({ id }: { id: string }) {
    return (
        <Link
            href={`/projects/${id}/edit`
            }
            className="rounded-md border p-2 hover:bg-slate-300"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}