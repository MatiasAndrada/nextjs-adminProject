import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const fromEmail = process.env.EMAIL_AUTH || "auth@ProjectAdmin.com";

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    try {
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "2FA Code",
            html: `<p>Your 2FA code: ${token}</p>`
        });
    } catch (error) {
        console.error("Error sending 2FA token email:", error);
    }
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    try {
        const resetLink = `${domain}/auth/new-password?token=${token}`

        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
        });
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    try {
        const confirmLink = `${domain}/auth/new-verification?token=${token}`;
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Confirm your email",
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`

        });
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};
