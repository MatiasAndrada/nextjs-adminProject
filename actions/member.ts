"use server";

import * as z from "zod";
//hooks
import { currentUser } from "@/hooks/use-current-user";
import { currentRole } from "@/hooks/use-current-role";
//emails
import { sendInvitation } from "@/emails/member";
//tokens
import { generateInviteToken } from "@/lib/tokens";
//schemas
import { Schema } from "@/schemas/member";
//types
import type { State } from "@/schemas/member";
import { Role } from "@prisma/client";

export async function invite_member(prevState: State, formData: FormData) {
    const validatedFields = Schema.safeParse({
        email: formData.get("email"),
        role: formData.get("role"),
    });
    if (!validatedFields.success) {
        return { message: "Invalid email!" };
    }
    const user = await currentUser();
    const fromEmail = user?.email ?? "not found";
    const isAllowed = await currentRole() === Role.ADMIN || await currentRole() === Role.OWNER;
    if (!isAllowed) {
        return { message: "You are not authorized to invite a member" };
    }
    // send email to the user
    const { email, role } = validatedFields.data;
    const token = await generateInviteToken(email, role);
    await sendInvitation(fromEmail, email, token.token);
    return { message: "Member invited!" };
}
