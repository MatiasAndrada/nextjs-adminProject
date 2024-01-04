import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/lib/db";
import { user } from "@/app/lib/placeholder-data";


export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),

    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                id: token.id,
                randomKey: token.randomKey,
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
});
