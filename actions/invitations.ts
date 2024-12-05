"use server";
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { db } from "@/lib/db";
//hooks
import { currentProject } from '@/hooks/use-current-project';
import { useProjectRoleHasAccess } from "@/hooks/use-current-role";
import { getUserByEmail } from "@/data/user";
//emails
import { sendInvitation } from "@/actions/emails";
//tokens
import { generateInviteToken } from "@/lib/tokens";
//schemas
import { Schema } from "@/schemas/member";
//types
import type { State } from "@/schemas/member";
import { Role } from "@prisma/client";

export async function send_invitation(prevState: State, formData: FormData) {
    try {
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
        const project = await currentProject();
        const project_id = project?.id;
        const has_access = await useProjectRoleHasAccess([Role.OWNER, Role.ADMIN]);
        if (!project_id) {
            return { message: "No project selected" };
        }
        if (!has_access) {
            return { message: "You don't have permission to invite members" };
        }
        // send email to the user
        const { email, role } = validatedFields.data;
        const token = await generateInviteToken(project_id, email, role);
        await sendInvitation(email, token);
    } catch (error) {
        return { error: "An error occurred while sending the invitation." };
    }
    revalidatePath("/dashboard/members");
    redirect("/dashboard/members");
}

export async function is_valid_invite_token(token: string) {
    noStore();
    try {
        const existingToken = await db.inviteToken.findUnique({
            where: {
                token: token,
            },
            include: {
                project: true,
            },
        });
        if (!existingToken) {
            return { error: "Token does not exist! " };
        }
        const hasExpired = new Date(existingToken.expires) < new Date();
        if (hasExpired) {
            return { error: "Token has expired!" };
        }
        const expireIn = Math.floor((existingToken.expires.getTime() - new Date().getTime()) / 3600000)
        const existingUser = await getUserByEmail(existingToken.email);
        if (!existingUser) {
            return { error: "Email does not exist! First you must create an account with the email that you were invited to." };
        }

        return {
            success: `Correct token expires in ${expireIn} hours.`, invitation: existingToken
        };
    } catch (error) {
        console.log(error)
        return { error: "An error occurred while processing the invitation." };
    }
}

export async function accept_invitation(token: string) {
    const existingToken = await db.inviteToken.findUnique({
        where: {
            token: token,
        },
    });
    if (!existingToken) {
        revalidatePath("/", "layout")
        return { error: "Token does not exist!" };
    }
    const user = await getUserByEmail(existingToken.email);
    if (!user) {
        return { error: "Email does not exist! First create an account with this email." };
    }
    const user_id = user.id;
    const project_id = existingToken.project_id;
    const existingUserOnProject = await db.usersOnProjects.findFirst({
        where: {
            user_id: user_id,
            project_id: project_id,
        },
    });
    if (existingUserOnProject) {
        return { error: "User is already a member of this project!" };
    }
    await db.usersOnProjects.create({
        data: {
            user_id: user_id,
            project_id: project_id,
            role: existingToken.role,
        },
    });
    await db.inviteToken.delete({
        where: {
            token: token,
        },
    });
    revalidatePath("/", "layout")
    return { success: "Invitation accepted!" };
}

export async function decline_invitation(token: string) {
    const existingToken = await db.inviteToken.findUnique({
        where: {
            token: token,
        },
    });
    if (!existingToken) {
        return { error: "Token does not exist!" };
    }
    await db.inviteToken.delete({
        where: {
            token: token,
        },
    });
    revalidatePath("/", "page")
    return { success: "Invitation declined!" };
}


