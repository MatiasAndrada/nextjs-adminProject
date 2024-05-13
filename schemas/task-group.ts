import { z } from 'zod';
import { Status, Criticality } from '@prisma/client';

const Schema = z.object({
    id: z.string(),
    project: z.object({
        // Aquí debes definir el esquema para el objeto Project
    }),
    task: z.array(
        z.object({
            // Aquí debes definir el esquema para el objeto Task
        })
    ),
    name: z.string().min(2).max(45),
    description: z.string().max(1200).optional(),
    status: z.nativeEnum(Status),
    progress: z.string().max(18),
    criticality: z.nativeEnum(Criticality),
    createdAt: z.date(),
    updatedAt: z.date(),
    endsAt: z.date(),
});

const CreateSchema = Schema.omit({
    id: true,
    project: true,
    task: true,
    status: true,
    progress: true,
    createdAt: true,
    updatedAt: true,
    endsAt: true,
});

const UpdateSchema = Schema.omit({
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



export { Schema, CreateSchema, UpdateSchema };