import { db } from "@/lib/db";
import { auth } from "@/auth";

const prisma = db;

export async function fetchProjectsOfUser() {
    const session = await auth()
    const id = session?.user?.id as string;
    const projectsOfUser = await prisma.projectUser.findMany({
        where: {
            user_id: id
        },
        include: {
            project: true
        }
    })
    if (!projectsOfUser) {
        throw new Error('Failed to fetch projects of user.');
    }
    const dto = projectsOfUser.map((pu) => {
        return {
            id: pu.project.id,
            name: pu.project.name,
        }
    });
    return dto;
}