import { db } from "@/lib/db";

import { currentUser } from "@/hooks/use-current-user";
import { Role } from "@prisma/client";
const prisma = db;

export async function fetch_projects() {
    const user = await currentUser();
    const user_id = user?.id;
    const projectsOfUser = await prisma.usersOnProjects.findMany({
        where: {
            user_id: user_id
        },
        include: {
            project: true
        }
    })

    return projectsOfUser;
}

export async function fetch_projects_owner() {
    const user = await currentUser();
    const user_id = user?.id;
    const projectsOfUser = await prisma.usersOnProjects.findMany({
        where: {
            role: Role.OWNER,
            user_id: user_id
        },
        include: {
            project: true
        }
    })
    return projectsOfUser
}

export async function fetch_projects_member() {
    const user = await currentUser();
    const user_id = user?.id;
    const projectsOfUser = await prisma.usersOnProjects.findMany({
        where: {
            role: { in: [Role.VIEWER, Role.EDITOR, Role.ADMIN] },
            user_id: user_id
        },
        include: {
            project: true
        }
    })
    return projectsOfUser;
}


export async function fetch_project_by_id(id: string) {
    try {
        const project = await db.project.findUnique({
            where: {
                id,
            },
        });
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetch_count_members(id: string) {
    const member = await prisma.project.findFirst({
        where: {
            id: id
        },
        select: {
            _count: {
                select: {
                    members: true
                }
            }
        }
    })
    const count = member?._count?.members
    return count
}
