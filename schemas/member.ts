import * as z from "zod";
import { Role } from "@prisma/client";

export const Schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    role: z.nativeEnum(Role)
});

export type State = {
    errors?: {
        email?: string[];
        role?: string[];
    };
    message?: string | null;
};

