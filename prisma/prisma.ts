//!NECESARIO CREAR UN MIDDLEWARE PARA ACTUALIZAR EL PROGRESS DE UN TASKGROUP AL ACTUALIZAR UN TASK
//?MIDDLEWARE esta deprecado en su lugar voy a utilizar un COMPUTED FIELD que solo va a existir en memoria no en la base de datos
/* 
import { db } from "@/lib/db";
import { Status } from "@prisma/client";

db.$extends({
    result: {
        taskGroup: {
            progress: {
                needs: { task: true },
                compute(taskGroup) {
                    if (taskGroup.task.length === 0) return null
                    const tasksCount = taskGroup.task.length
                    console.log("🦇  compute  tasksCount:", tasksCount)
                    const completedTasks = taskGroup.task.filter(task => task.status === Status.COMPLETED).length
                    console.log("🦇  compute  completedTasks:", completedTasks)
                }
            }
        }
    }
})



 */