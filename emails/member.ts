"use server";
import { resend, domain, fromEmail as resendEmail } from "@/lib/email";

export const sendInvitation = async (email: string, token: string) => {
    try {
        const inviteLink = `${domain}/invitation?token=${token}`;
        await resend.emails.send({
            from: resendEmail,
            to: email,
            subject: "You've been invited to join the team",
            html: `<p>Invited you to join the team. Click <a href="${inviteLink}">here</a> to accept the invitation.</p>`
        });
    } catch (error) {
        console.error("Error sending invite member email:", error);
    }
}