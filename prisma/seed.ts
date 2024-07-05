import { db } from "..//lib/db";
import {
  testUser,
  userOnProject,
  task_groups,
  tasks,
  project,
} from "../lib/placeholder-data";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const prisma = db;

async function main() {
  let userId = "";
  try {
    //! USER CREATION
    console.log("Creating user if not exist");
    const userExist = await prisma.user.findMany({
      where: {
        email: testUser.email,
      },
    });
    if (userExist.length === 0 && typeof prisma.user.create === "function") {
      console.log("User does not exist");
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const newUser = await prisma.user.create({
        //?generate user
        data: {
          id: testUser.id,
          name: testUser.name,
          email: testUser.email,
          password: hashedPassword,
        },
      });
      userId = newUser.id;
      //?generateVerification token
      console.log("Generate Verification Token");
      const token = uuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000);
      const existingToken = await prisma.verificationToken.findFirst({
        where: { email: testUser.email },
      });
      if (existingToken) {
        console.log("The token already exists, delete");
        await prisma.verificationToken.delete({
          where: {
            id: existingToken.id,
          },
        });
      }
      const verificationToken = await prisma.verificationToken.create({
        data: {
          email: testUser.email,
          token,
          expires,
        },
      });
      console.log("Create a new verification token", verificationToken.token);
      //?setVerifcation
      const newVerification = await createVerificationEmail(token);
      console.log("newVerification", newVerification)
      console.log("Verifying the new token");
      console.log("Creating user:", newUser);

    } else {
      console.log("User already exist");
      userId = userExist[0].id;
    }

    //! PROJECT CREATION
    console.log("Creating project if not exist");
    const projectExist = await prisma.project.findMany({
      where: {
        id: project[0].id,
      },
    });
    console.log("Project exist:", projectExist.length);
    if (
      projectExist.length === 0 &&
      typeof prisma.project.create === "function"
    ) {
      console.log("Project does not exist");
      const newProject = await prisma.project.create({
        data: {
          id: project[0].id,
          name: project[0].name,
          description: project[0].description,
        },
      });
      console.log("Creating project:", newProject);
    } else {
      console.log("Project already exist");
    }
    //! USER ON PROJECT CREATION
    console.log("Creating userOnProject if not exist");
    const userOnProjectsExists = await prisma.usersOnProjects.findMany({
      where: {
        user_id: userId,
      },
    });
    if (
      userOnProjectsExists.length === 0 &&
      typeof prisma.usersOnProjects.create === "function"
    ) {
      console.log("project user does not exist");
      await prisma.usersOnProjects.create({
        data: {
          user_id: userId,
          project_id: userOnProject[0].project_id,
          role: userOnProject[0].role,
        },
      });
      console.log("Creating UserOnProject...");
    } else {
      console.log("UserOnProject already exist");
    }
    /*         //!SELECT PROJECT FOR USER
                console.log("Selecting project for user");
                const userSelectedProject = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        selected_project_id: project[0].id,
                    },
                });
                console.log("Project selected:", userSelectedProject.selected_project_id);
         */
    //! TASK GROUP CREATION
    console.log("Creating taskGroup if not exist");
    const taskGroupExist = await prisma.taskGroup.findMany({
      where: {
        project_id: project[0].id,
      },
    });
    if (
      taskGroupExist.length < task_groups.length &&
      typeof prisma.taskGroup.create === "function"
    ) {
      console.log("TaskGroup does not exist");
      const taskGroupsToCreate = task_groups.filter((taskGroup) => {
        return !taskGroupExist.some(
          (existingTaskGroup) => existingTaskGroup.id === taskGroup.id
        );
      });
      console.log("TaskGroup to create:", taskGroupsToCreate.length);
      await prisma.taskGroup.createMany({
        data: taskGroupsToCreate,
      });
      console.log("Creating taskGroup...");
    } else {
      console.log("All TaskGroup already exist");
    }
    //! TASK CREATION
    console.log("Creating task if not exist");
    // buscar si están todas las tareas dentro de cada taskGroup
    const taskGroupIndex = task_groups.length - 1;
    for (let i = 0; i <= taskGroupIndex; i++) {
      console.log("Checking taskGroup", i, "of", taskGroupIndex);
      const taskExistInEachTaskGroup = await prisma.task.findMany({
        where: {
          task_group_id: task_groups[i].id,
        },
      });
      const filterTaskArray = tasks.filter(
        (task) => task.task_group_id === task_groups[i].id
      ); // filtrar las tareas que pertenecen a cada taskGroup
      if (
        taskExistInEachTaskGroup.length < filterTaskArray.length &&
        typeof prisma.task.create === "function"
      ) {
        // si la cantidad de tareas existentes en cada taskGroup es menor a la cantidad de tareas que pertenecen a cada taskGroup
        console.log(
          ` There are tasks that do not exist in the task group ${taskExistInEachTaskGroup.length} of ${filterTaskArray.length}`
        );
        await prisma.task.createMany({
          data: filterTaskArray,
        });
      } else {
        console.log("The tasks already exist in the task group " + i);
      }
      console.log("Task in TaskGroup", i, "of", taskGroupIndex, "checked");
    }
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createVerificationEmail(token: string) {
  try {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!existingToken) {
      console.log("Token does not exist");
    } else {
      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) {
        console.log("Token has expired");
      }
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email },
    });
    if (!existingUser) {
      return { error: "Email does not exist!" };
    }
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken?.email,
      },
    });
    /*         await prisma.verificationToken.delete({
                    where: { id: existingToken.id }
                }); */
    console.log("Email verified");
    return { success: "Email verified!" };
  } catch {
    return null;
  }
}
