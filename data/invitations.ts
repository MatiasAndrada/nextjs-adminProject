import { db } from "@/lib/db";
import { currentUser } from "@/hooks/use-current-user";

import { Role } from "@prisma/client";

export async function fetch_invitations() {
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