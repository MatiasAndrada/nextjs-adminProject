
import { db } from "@/lib/db";

import { user, projectUser, task_groups, tasks, project, } from "@/lib/placeholder-data";

const prisma = db;



/* {"user":{"name":"Matias Andrada","email":"matiasbarderos7@gmail.com","image":"https://lh3.googleusercontent.com/a/ACg8ocI-ONoCgZu14Te_WGxXcIFbi0e7ozMA_tYnor1RHkon=s96-c","id":"clr2eh34z0000csviagh2w7ie","isTwoFactorEnabled":false,"isOAuth":true},"expires":"2024-02-05T19:09:00.934Z"} */
async function main() {

    //*create user if not exist
    const isUserExist = await prisma.user.findFirst({
        where: {
            email: "test@example.com",
        },
    });
    if (isUserExist) {
        console.log("User already exists");
        return;
    }
    await prisma.user.create({
        data: user,
    });

    //*create projectUser if not exist





}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });