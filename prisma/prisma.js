//!NECESARIO CREAR UN MIDDLEWARE PARA ACTUALIZAR EL PROGRESS DE UN TASKGROUP AL ACTUALIZAR UN TASK
/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "Task" && params.action === "update") {
    const result = await next(params);

    // Obtén el TaskGroup correspondiente
    const taskGroup = await prisma.taskGroup.findUnique({
      where: { id: result.taskGroupId },
      include: { tasks: true },
    });

    if (taskGroup) {
      // Calcula el nuevo valor de progress
      const completedTasks = taskGroup.tasks.filter(
        (task) => task.status === "completed"
      ).length;
      const totalTasks = taskGroup.tasks.length;
      const progress = `${completedTasks} / ${totalTasks} tareas marcadas como completed`;

      // Actualiza el TaskGroup
      await prisma.taskGroup.update({
        where: { id: taskGroup.id },
        data: { progress },
      });
    }
    

    return result;
  } else {
    return next(params);
  }
});
 */
