import NextAuth from "next-auth"

import bcrypt from "bcrypt"
import { sql } from "@vercel/postgres"
import { z } from "zod"
import type { User } from "@/app/lib/definitions"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

async function getUser(email: string): Promise<User> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return {}
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider(
            {
                name: "Credentials",
                credentials: {
                    email: { label: "email", type: "email", placeholder: "test@test.com" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials: Partial<Record<"email" | "password", unknown>>): Promise<User | null> {
                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(6) })
                        .safeParse(credentials);
                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await getUser(email);
                        if (!user) return null;
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (!passwordsMatch) return null;
                        return user;
                    }
                    return null;
                }
            }
        ),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),

    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },

    // Enable debug messages in the console if you are having problems
    debug: true,
})

export { handler as GET, handler as POST };
