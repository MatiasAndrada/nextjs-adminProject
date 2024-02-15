import { db } from "@/lib/db";
import { auth } from "@/auth";

const prisma = db;

export async function fetch_projects() {
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
        return null;
    }
    /*     const dto = projectsOfUser.map((pu) => {
            return {
                id: pu.project.id,
                name: pu.project.name,
            }
        }); */
    const onlyProjects = projectsOfUser.map((pu) => {
        return pu.project
    })
    return onlyProjects
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
    //dto - number of members
    const count = member?._count?.members
    return count
}