import Link from "next/link";
import { Button } from "../ui/button";
import { PencilIcon, UserPlusIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export function EditMember({ user_id, project_id, children }: { user_id: string, project_id: string, children?: React.ReactNode }) {
    return (
        <Link
            href={`/dashboard/members/edit/${user_id}/${project_id}`}
            className="flex items-center justify-center w-6 h-6 bg-transparent border-0 outline-none focus:outline-none hover:shadow-md hover:scale-105 transition-all">
            <PencilIcon className="h-5 w-5 text-dark" />
            {children}
        </Link>
    );
}
export function AddMember() {
    return (
        <Link href="/dashboard/members/add">
            <Button >
                <UserPlusIcon className="h-5 md:mr-2" />
                <span className="hidden md:block">Add member</span>{' '}
            </Button>
        </Link>
    );
}

export function InformationRole() {
    return (
        <Link
            href="/dashboard/members">
            <Button variant="info">
                <InformationCircleIcon className="h-5 md:mr-2" />
                <span className="hidden md:block">About permissions in roles</span>{' '}
            </Button>
        </Link>
    );
}