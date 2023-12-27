import type { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { sendVerificationRequest } from "@/app/lib/actions/send-verification-email"

const prisma = new PrismaClient()


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",

    },
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
                from: process.env.EMAIL_FROM,
            },
            sendVerificationRequest: async ({ identifier: email, url, }) => {
                console.log("entro en email provider")
                await sendVerificationRequest({ identifier: email, url, provider: EmailProvider })
            },

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
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
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
};
/*
!FORMAS DE RECUPERAR LA SESIÓN DEL USUARIO
?Sesión en un componente del servidor
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function Home() {
    const session = await getServerSession(authOptions);
    return <div>{JSON.stringify(session)}
?Obtener la sesión en una ruta API
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session,
        session});
}
?Obtener la sesión en un componente del cliente
*Debemos crear el componente NextAuthProvider
?provider
import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};
?componente
import { NextAuthProvider } from "./providers";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
    <html lang="en">
        <body>
        <NextAuthProvider>{children}</NextAuthProvider>
        </body>
    </html>
    );
}


*/