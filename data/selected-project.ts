import { db } from "@/lib/db";

const prisma = db

export async function fetchSelectedProject(idProject: string) {
    const project = await prisma.project.findUnique({
        where: { id: idProject },
    });
    /*     const dto = {
            id: user.project.id,
            name: user.project.name,
        }; */
    return project;

} 