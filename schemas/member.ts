import * as z from "zod";
import { Role } from "@prisma/client";

export const MemberSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    role: z.nativeEnum(Role),
});

export type State = {
    errors?: {
        email?: string[];
        role?: string[];
    };
    message?: string | null;
};
