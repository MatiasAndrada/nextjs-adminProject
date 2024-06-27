import { db } from '@/lib/db';

export async function fetch_project_user_by_id(user_id: string, project_id: string) {
    const project_user = await db.projectUser.findFirst({
        where: {
            user_id: user_id,
            project_id: project_id,
        },
        select: { //selecting only the required fields
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