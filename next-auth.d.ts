import NextAuth, { type DefaultSession } from "next-auth";
import type { UsersOnProjects } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
    currentProjectId: string;
    currentProject: UsersOnProjects,
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        currentProjectId: string;
        currentProject: UsersOnProjects,
        isTwoFactorEnabled: boolean;
        email: string;
        isOAuth: boolean;
    }
}

