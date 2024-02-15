import { z } from 'zod';
import { Status } from '@prisma/client';

const TaskGroupSchema = z.object({
    id: z.string(),
    project_id: z.string(),
    project: z.object({
        // Aquí debes definir el esquema para el objeto Project
    }),
    task: z.array(
        z.object({
            // Aquí debes definir el esquema para el objeto Task
        })
    ),
    name: z.string().max(80),
    description: z.string().max(4000).optional(),
    status: z.nativeEnum(Status),
    progress: z.string().max(18),
    criticality: z.string().max(18),
    createdAt: z.date(),
    updatedAt: z.date(),
    endsAt: z.date(),
});

const CreateTaskGroupSchema = TaskGroupSchema.omit({
    id: true,
    project: true,
    task: true,
    status: true,
    progress: true,
    createdAt: true,
    updatedAt: true,
    endsAt: true,
});

export type State = {
    errors?: {
        name?: string[],
        description?: string[],
        criticality?: string[],
    }
    message?: string | null;
}



export { TaskGroupSchema, CreateTaskGroupSchema };