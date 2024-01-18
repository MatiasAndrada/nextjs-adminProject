import type { Project } from "./project";
interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    accounts: Account[];
    ProjectUser: ProjectUser[];
    selected_project_id?: string;
    isTwoFactorEnabled: boolean;
    twoFactorConfirmation?: TwoFactorConfirmation;
}

interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    user: User;
}

interface VerificationToken {
    id: string;
    email: string;
    token: string;
    expires: Date;
}

interface PasswordResetToken {
    id: string;
    email: string;
    token: string;
    expires: Date;
}

interface TwoFactorToken {
    id: string;
    email: string;
    token: string;
    expires: Date;
}

interface TwoFactorConfirmation {
    id: string;
    userId: string;
    user: User;
}
enum Role {
    ADMIN = "ADMIN",
    EDITOR = "EDITOR",
    READER = "READER"
}

interface ProjectUser {
    id: string;
    user_id: string;
    project_id: string;
    role: Role;
    user: User;
    project: Project;
}
