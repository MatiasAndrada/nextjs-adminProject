import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const domain = process.env.APP_URL || "http://localhost:3000";
export const fromEmail = (process.env.EMAIL_HOST as string) || "Project Admin <project-admin@matiasandrada.uno>";