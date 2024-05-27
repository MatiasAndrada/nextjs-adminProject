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

export async function invite_member(prevState: State, formData: FormData) {
    const validatedFields = Schema.safeParse({
        email: formData.get("email"),
        role: formData.get("role"),
    });
    if (!validatedFields.success) {
        return { message: "Invalid email!" };
    }
    const user = await currentUser();
    const project_id = user?.selected_project_id;
    const isAllowed = await currentRole() === Role.ADMIN || await currentRole() === Role.OWNER;
    if (!isAllowed) {
        return { message: "You are not authorized to invite a member" };
    }
    const project_name = await db.project.findUnique({
        where: {
            id: project_id,
        },
        select: {
            name: true,
        },
    });
    const id_user_project_owner = await db.projectUser.findFirst({
        where: {
            project_id: project_id,
            role: Role.OWNER,
        },
        select: {
            user_id: true,
        },
    });
    const email_project_owner = await db.user.findUnique({
        where: {
            id: id_user_project_owner?.user_id,
        },
        select: {
            email: true,
        },
    });
    // send email to the user
    const { email, role } = validatedFields.data;
    if (email === email_project_owner?.email) {
        return { message: "You can't invite the project owner" };
    }
    if (project_name && email_project_owner) {
        generateInviteToken(project_name.name, email, email_project_owner.email, role)
    }
    return { message: "Member invited!" };
}
