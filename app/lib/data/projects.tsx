import db from "@/app/lib/db"
import { auth } from "@/auth"

const prisma = db;

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