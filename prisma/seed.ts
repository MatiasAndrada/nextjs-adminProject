import { PrismaClient } from "@prisma/client";
import { task_groups, tasks, project, projectUser, user } from "../app/lib/placeholder-data";
const prisma = new PrismaClient();







async function main() {

}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
