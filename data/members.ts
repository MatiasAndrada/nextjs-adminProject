import { db } from "@/lib/db";
import { currentProjectId } from "@/hooks/use-current-project";
import { unstable_noStore as noStore } from 'next/cache';
import { ROWS_PER_PAGE_MEMBERS } from "@/globals";

export async function fetch_members(currentPage: number) {
    noStore();
    //TODO: Implement pagination
    const OFFSET = (currentPage - 1) * ROWS_PER_PAGE_MEMBERS;

    const current_project_id = await currentProjectId();
    const members = await db.project.findUnique({
        where: {
            id: current_project_id
        },
        select: {
            members: {
                select: {
                    role: true,
                    project_id: true,
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
    if (!members) return null;
    return members.members;
}


export async function fetch_members_assigned_to_task_group(id: string) {
    const membersAssigned = await db.taskGroup.findUnique({
        where: {
            id: id
        },
        select: {
            membersAssigned: {
                select: {
                    role: true,
                    project_id: true,
                    user: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            }

        }
    })

    return membersAssigned?.membersAssigned;
}

export async function fetch_member_by_id(user_id: string, project_id: string) {
    try {
        if (!user_id || !project_id) {
            throw new Error('Failed to fetch member. Missing fields.');
        }
        const project_user = await db.usersOnProjects.findFirst({
            where: {
                user_id: user_id,
                project_id: project_id,
            },
            select: { //selecting only the required fields
                id: true,
                role: true,
                project_id: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true,
                    }
                }
            }
        });
        return project_user;
    }
    catch (err) {
        console.error('Database Error:', err);
        return { error: "Failed to fetch member." };
    }
}