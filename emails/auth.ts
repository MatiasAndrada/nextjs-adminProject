"use server";
import { resend } from "@/lib/email";

const domain = process.env.APP_URL || "http://localhost:3000";
const fromEmail = (process.env.EMAIL_HOST as string) || "Project Admin <service-email@resend.dev>";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    try {
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "2FA token",
            html: `<p>Your 2FA token is: <strong>${token}</strong></p>`,
        });

    } catch (error) {
        console.error("Error sending 2FA token email:", error);
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    try {
        const resetLink = `${domain}/auth/new-password?token=${token}`;
        const a = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
        });
        console.log("🦇  sendTwoFactorTokenEmail  a:", a)
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
};

export const sendVerificationEmail = async (email: string, token: string) => {
    try {
        const confirmLink = `${domain}/auth/new-verification?token=${token}`;
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Confirm your email",
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
        });
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};
