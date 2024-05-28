"use server";

import * as z from "zod";
import { db } from "@/lib/db";
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

export async function send_invitation(prevState: State, formData: FormData) {
    const validatedFields = Schema.safeParse({
        email: formData.get("email"),
        role: formData.get("role"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to send invitation.",
        };
    }
    const user = await currentUser();
    const project_id = user?.selected_project_id;
    const isAllowed = await currentRole() === Role.ADMIN || await currentRole() === Role.OWNER;
    if (!project_id) {
        return { message: "No project selected" };
    }
    if (!isAllowed) {
        return { message: "You don't have permission to invite members" };
    }

    // send email to the user
    const { email, role } = validatedFields.data;
    const token = await generateInviteToken(project_id, email, role);
    await sendInvitation(email, token);
    return { message: "Invitation sent!" };
}


export async function accept_invitation(token: string, email: string) {
    const invite = await db.inviteToken.findUnique({
        where: {
            token: token,
        },
    });
    if (!invite) {
        return { message: "Invalid token" };
    }
    const user = await db.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        return { message: "An account was not found with this email so you must create one" };
    }
    const projectUser = await db.projectUser.create({
        data: {
            user_id: user.id,
            project_id: invite.project_id,
            role: invite.role,
        },
    })

    return { message: "Invitation accepted!" };
}