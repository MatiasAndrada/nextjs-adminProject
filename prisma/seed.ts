
import { db } from "@/app/lib/db";
import { task_groups, tasks, project, projectUser, user } from "../app/lib/placeholder-data";

const prisma = db;



async function main() {

}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });