"use server";

import * as z from "zod";
//hooks
import { currentUser } from "@/hooks/use-current-user";
//emails
import { sendInvitation } from "@/emails/member";
//tokens
import { generateInviteToken } from "@/lib/tokens";
//schemas
import { MemberSchema } from "@/schemas/member";
//types
import { Role } from "@prisma/client";

export async function invite_member(data: z.infer<typeof MemberSchema>) {
    const validatedFields = MemberSchema.safeParse(data);
    if (!validatedFields.success) {
        return { message: "Invalid email!" };
    }
    const user = await currentUser();
    const fromEmail = user?.email ?? "not found";
    const role = user?.role;
    if (role !== Role.ADMIN && role !== Role.OWNER) {
        return { message: "You are not authorized to invite a member" };
    }
    // send email to the user
    const { email } = validatedFields.data;
    const token = await generateInviteToken(email);
    await sendInvitation(fromEmail, email, token.token);
    return { message: "Member invited!" };
}
