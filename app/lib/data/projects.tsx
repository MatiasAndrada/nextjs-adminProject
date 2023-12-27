import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth"; //* get session from server
import { authOptions } from "@/app/lib/auth/auth"; //* auth options

const prisma = new PrismaClient();

export async function fetchProjects() {
    console.log(0)
    const session = await getServerSession(authOptions);
    const id = session?.user?.id as string;
    console.log(id)
    const projects = await prisma.project.findMany({
        where: {
            userId: id,
        }
    });
    return projects;
}