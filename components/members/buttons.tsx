"use client"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { UserMinusIcon } from '@heroicons/react/24/outline';
import { set_role_of_member, delete_member } from '@/actions/members';
import { Role } from '@prisma/client';

export function DeleteMember({ user_id, project_id, redirect }: { user_id: string, project_id: string, redirect?: string }) {
    const router = useRouter();
    const handleDeleteMember = async () => {
        await delete_member(user_id, project_id).then((res) => {
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.success);
                if (redirect) {
                    router.push(redirect);
                }
            }
        }).catch((error) => {
            toast.error("An unexpected error occurred.");
            console.error(error);
        });
    };
    return (
        <Button variant="destructive" onClick={() => handleDeleteMember()} className='space-x-2'>
            <UserMinusIcon className="h-5 w-5" />
            <span >Delete Member</span>
        </Button>
    );
}

export function SetRoleOfMember({
    user_id,
    project_id,
    role,
    redirect,
    children,
}: {
    user_id: string,
    project_id: string
    role: Role;
    redirect?: string;
    children: React.ReactNode;
}) {
    const router = useRouter();
    async function handleSetCurrentProjectId() {
        await set_role_of_member(user_id, project_id, role).then((res) => {
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.success);
                if (redirect) {
                    router.push(redirect);
                }
            }
        }).catch((error) => {
            toast.error("An unexpected error occurred.");
            console.error(error);
        });
    }
    return (
        <Button variant="ghost" onClick={() => handleSetCurrentProjectId()}>
            {children}
        </Button>
    );
}


