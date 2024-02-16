import { db } from "@/lib/db";
import { currentUser } from "@/hooks/use-current-user";

const prisma = db;

export async function fetch_projects() {
    const user = await currentUser();
    const user_id = user?.id;
    const projectsOfUser = await prisma.projectUser.findMany({
        where: {
            user_id: user_id
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