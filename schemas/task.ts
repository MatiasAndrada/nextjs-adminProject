import { z } from 'zod';
import { Status } from '@prisma/client';

const Schema = z.object({
    id: z.string(),
    task_group_id: z.string(),
    name: z.string().max(80),
    description: z.string().max(4000).optional(),
    status: z.nativeEnum(Status),
    progress: z.number().int().min(0).max(100),
    createdAt: z.date(),
    updatedAt: z.date(),
    endsAt: z.date(),
});

const CreateSchema = Schema.omit({
    id: true,
    status: true,
    progress: true,
    createdAt: true,
    updatedAt: true,
    endsAt: true,
});

export { Schema, CreateSchema };

export type State = {
    errors?: {
        name?: string[],
        description?: string[],
        task_group_id?: string[],
    }
    message?: string | null;
}

