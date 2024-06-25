import { Role } from "@prisma/client"
export function RoleIndicator({ role, children }: { role: Role, children?: React.ReactNode }) {
    return (
        <span className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1
            ${role === Role.OWNER ? "text-red-500" : ""}
            ${role === Role.ADMIN ? "text-amber-500" : ""}
            ${role === Role.EDITOR ? "text-emerald-500" : ""}
            ${role === Role.VIEWER ? "text-zinc-400" : ""}
        `}>
            {children}
        </span>
    )
}
