'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DropdownChangeRole from '@/components/members/dropdown-change-role';
import { DeleteMember } from '@/components/members/buttons';
import { Role } from '@prisma/client';

interface Props {
    projectUser: {
        user: {
            id: string;
            email: string;
            name: string | null;
            image: string | null;
        };
        role: Role;
        project_id: string;
    } | {
        error: string;
    }
}

export default function EditRole({ projectUser }: Props) {
    if ('error' in projectUser) {
        return (
            <div className="w-full space-y-4 rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6">
                <h2 className="text-xl font-medium">Member:</h2>
                <h3 className="text-red-500">{projectUser.error}</h3>
            </div>
        );
    }
    return (
        <div className="w-full space-y-4 rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6">
            <h2 className="text-xl font-medium">Member:</h2>
            <div className='flex wrap gap-4'>
                <Avatar className="h-14 w-14">
                    {projectUser.user.image ? (
                        <AvatarImage src={projectUser.user.image} alt="Icon user" />
                    ) : (
                        <AvatarFallback>
                            {projectUser.user.name?.split(' ').map((n) => n[0])}
                        </AvatarFallback>
                    )}
                </Avatar>
                <div>
                    <h2 className="text-xl font-medium">{projectUser.user.name}</h2>
                    <p className="text-gray-300">{projectUser.user.email}</p>
                </div>
            </div>
            <h2 className="text-xl font-medium">Actions:</h2>
            {
                projectUser.role === Role.OWNER ? (
                    <h3 className="text-red-500">You can't change the role of the owner.</h3>
                ) : (
                    <div className="flex items-center justify-evenly">
                        <div className='flex gap-4 items-center'>
                            <h3 className="text-lg font-medium">Change role:</h3>
                            <DropdownChangeRole user_id={projectUser.user.id} project_id={projectUser.project_id} role={projectUser.role} />
                        </div>
                        <h2 >OR</h2>
                        <div>
                            <DeleteMember redirect='/dashboard/members' user_id={projectUser.user.id} project_id={projectUser.project_id} />
                        </div>
                    </div>
                )
            }
        </div >
    );
}

