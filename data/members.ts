import { db } from "@/lib/db"; 
import { currentProject } from "@/hooks/use-current-project";
import { unstable_noStore as noStore } from 'next/cache';
import { ROWS_PER_PAGE_MEMBERS } from "@/globals";

interface MemberDTO {
    user_id: string;
    role: string;
    avatar: string;
    name: string;
    email: string;
}

export async function fetch_members(currentPage: number) {
    noStore();
    const OFFSET = (currentPage - 1) * ROWS_PER_PAGE_MEMBERS;
    try {
        const current_project = await currentProject();
        const current_project_id = current_project?.id;
        const members = await db.project.findUnique({
            where: {
                id: current_project_id
            },
            select: {
                members: {
                    select: {
                        role: true,
                        user: {
                            select: {
                                id: true,
                                image: true,
                                name: true,
                                email: true,
/*                                 createdAt: true */
                            }
                        }
                    }
                }
            }
        });

        const flattenedMembers = members?.members.map((member: any) => {
            const dto: MemberDTO = {
                user_id: member.user.id,
                role: member.role,
                avatar: member.user.image,
                name: member.user.name,
                email: member.user.email,
            };
            return dto;
        });

        return flattenedMembers;

    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch members.');
    }
}