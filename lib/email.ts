import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const domain = process.env.NEXT_PUBLIC_APP_URL as string || "http://localhost:3000";
export const fromEmail = (process.env.EMAIL_HOST as string) || "Project Admin <service-email@resend.dev>";