import { z } from "zod";

const Schema = z.object({
    id: z.string(),
    name: z.string().min(4).max(80),
    description: z.string().max(4000).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const CreateFormSchema = Schema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type State = {
    errors?: {
        name?: string[],
        description?: string[],
    }
    message?: string | null;
}

export { Schema, CreateFormSchema };