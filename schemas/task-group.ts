import { z } from 'zod';
import { Status, Criticality } from '@prisma/client';
import { start } from 'repl';

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
    criticality: z.nativeEnum(Criticality),
    createdAt: z.date(),
    updatedAt: z.date(),
    startAt: z.date(),
    endAt: z.date(),
});

const CreateSchema = Schema.omit({
    id: true,
    project: true,
    task: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    endAt: true,
});

const UpdateSchema = Schema.omit({
    project: true,
    task: true,
    status: true,
    createdAt: true,
    updatedAt: true,
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