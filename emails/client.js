import nodemailer from "nodemailer";

const adminEmail = process.env.ADMIN_EMAIL;
const adminEmailFull = process.env.ADMIN_EMAIL_FULL;
const pass = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: adminEmail,
    pass,
  },
});

async function main() {
  try {
    const testResult = await transporter.verify();
    console.log("Email service is ready to take our messages", testResult);
  } catch (error) {
    console.error("Error verifying email service:", error);
  }
}

export const mailOptions = {
  from: adminEmailFull,
  to: adminEmailFull,
};
