import { db } from "@/lib/db";
import { currentUser } from "@/hooks/use-current-user";
import { currentProject } from "@/hooks/use-current-project";
import { Role } from "@prisma/client";

export async function fetch_invitation_by_token(token: string) {
    try {
        const invitation = await db.inviteToken.findUnique({
            where: {
                token: token,
            },
        });
        if (!invitation) {
            throw new Error("Invitation not found.");
        }
        return invitation;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch invitation.");
    }
}

export async function fetch_invitations_of_user() {
    //fetch project and extract name 
    try {
        const user = await currentUser();
        const email = user?.email;
        if (!email) {
            throw new Error("No user found.");
        }
        const invitations = await db.inviteToken.findMany({
            where: {
                email: email,
            },
        });
        for (const invite of invitations) {
            const user_project_owner = await db.projectUser.findUnique({
                where: {
                    id: invite.id,
                    role: Role.OWNER,
                },
                select: {
                    user_id: true,
                },
            });
        }
        return invitations;

    }
    catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch invitations.");
    }
}

export async function fetch_invitations_of_project() {
    const project = await currentProject();
    const project_id = project?.id;
    try {
        const invitations = await db.inviteToken.findMany({
            where: {
                project_id: project_id,
            },
        });
        return invitations;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch invitations.");
    }
}