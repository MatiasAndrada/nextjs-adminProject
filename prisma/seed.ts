/* import { adapter } from "../auth"; */
import { db } from "../lib/db";
import { user, projectUser, task_groups, tasks, project } from "../lib/placeholder-data";

const prisma = db;

/* const adapter = PrismaAdapter(db);
 */
const userId = "clr6wcyhg0000779zm5vld2xq"

async function main() {
    try {
        //! USER CREATION
        console.log("Creating user if not exist");
        // Check if the user exists (you need to uncomment this block if needed)
        // const userExist = await adapter.getUserByEmail(user[0].email);
        // if (!userExist) {
        //     console.log("User does not exist");
        //     // Create the user (you need to uncomment this block if needed)
        //     // const newUser = await adapter.createUser({...user[0]});
        //     // console.log("Creating user:", newUser);
        // }

        //! PROJECT CREATION
        console.log("Creating project if not exist");
        const projectExist = await prisma.project.findMany({
            where: {
                id: project[0].id,
            },
        });
        if (projectExist.length === 0 && typeof prisma.project.create === 'function') {
            const newProject = await prisma.project.create({
                data: {
                    id: project[0].id,
                    name: project[0].name,
                    description: project[0].description,
                },
            });
            console.log("Creating project:", newProject);
        }
        //! PROJECT USER CREATION
        console.log("Creating projectUser if not exist");
        const projectUserExist = await prisma.projectUser.findMany({
            where: {
                user_id: userId,
            },
        });
        if (projectUserExist.length === 0 && typeof prisma.projectUser.create === 'function') {
            console.log("project user does not exist")
            await prisma.projectUser.create({
                data: {
                    user_id: projectUser[0].user_id,
                    project_id: projectUser[0].project_id,
                    role: "ADMIN",
                },
            });
            console.log("Creating projectUser...");
        }
        //! TASK GROUP CREATION
        console.log("Creating taskGroup if not exist");
        const taskGroupExist = await prisma.taskGroup.findMany({
            where: {
                project_id: project[0].id,
            },
        });
        if (taskGroupExist.length < task_groups.length && typeof prisma.taskGroup.create === 'function') {
            console.log("TaskGroup does not exist");
            await prisma.taskGroup.createMany({
                data: task_groups,
            });
            console.log("Creating taskGroup...");
        }

        // //! TASK CREATION
        //delete task table
        /*         await prisma.task.deleteMany({}); */
        console.log("Creating task if not exist");
        // buscar si están todas las tareas dentro de cada taskGroup
        for (let i = 0; i < task_groups.length; i++) {
            const taskExistInEachTaskGroup = await prisma.task.findMany({
                where: {
                    task_group_id: task_groups[i].id,
                },
            });
            const filterTaskArray = tasks.filter((task) => task.task_group_id === task_groups[i].id);
            if (taskExistInEachTaskGroup.length < filterTaskArray.length && typeof prisma.task.create === 'function') {
                console.log("Task does not exist in taskGroup:" + task_groups[i].id);
                await prisma.task.createMany({
                    data: filterTaskArray,
                });
            }
        }
        console.log("Creating task...");
    }
    catch (e) {
        console.error(e);
    }
}



main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

