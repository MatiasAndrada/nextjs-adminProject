import { Role } from "@prisma/client"

interface Props {
    role: Role;
    children?: React.ReactNode;
    shadow?: boolean;
}

export function RoleIndicator({ role, children, shadow }: Props) {
    return (
        <span className={`uppercase text-md font-bold  rounded-md px-2 py-1
            ${shadow ? "shadow-lg dark:shadow-slate-950" : ""}
            ${role === Role.OWNER ? "text-red-500" : ""}
            ${role === Role.ADMIN ? "text-amber-500" : ""}
            ${role === Role.EDITOR ? "text-emerald-500" : ""}
            ${role === Role.VIEWER ? "text-zinc-400" : ""}
        `}>
            {children}
        </span>
    )
}
