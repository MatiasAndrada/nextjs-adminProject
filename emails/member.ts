"use server";
import { resend, domain, fromEmail as resendEmail } from "@/lib/email";

export const sendInvitation = async (fromEmail: string, toEmail: string, token: string) => {
    try {
        const inviteLink = `${domain}/dashboard/members/invite?token=${token}`;
        await resend.emails.send({
            from: resendEmail,
            to: toEmail,
            subject: "You've been invited to join the team",
            html: `<p>User ${fromEmail} has invited you to join the team. Click <a href="${inviteLink}">here</a> to accept the invitation.</p>`
        });
    } catch (error) {
        console.error("Error sending invite member email:", error);
    }
}