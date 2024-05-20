"use server";

export const domain = process.env.APP_URL || "http://localhost:3000";
export const fromEmail = (process.env.EMAIL_HOST as string) || "Project Admin <service-email@resend.dev>";