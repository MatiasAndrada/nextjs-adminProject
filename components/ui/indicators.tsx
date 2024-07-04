import * as Tooltip from '@radix-ui/react-tooltip';
import { convertFractionStringToPercentage } from "@/lib/utils";
import { Criticality, Status, Role } from "@prisma/client"
import { cn } from "@/lib/utils";


export function CriticalityIndicator({ criticality, children }: { criticality: Criticality, children?: React.ReactNode }) {
    return (
        <span
            className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1 
          ${criticality === Criticality.LOW ? "text-green-950 bg-green-500" : ""}
          ${criticality === Criticality.MEDIUM ? "text-sky-950 bg-sky-500" : ""}
          ${criticality === Criticality.HIGH ? "text-orange-950  bg-orange-500" : ""}
          ${criticality === Criticality.CRITICAL ? "text-red-950 bg-red-500" : ""}
          " : ""}`}>
            {children}
        </span>
    )
}

interface StatusIndicatorProps {
    status: Status;
    children?: React.ReactNode;
}

export function StatusIndicator({ status, children }: StatusIndicatorProps) {
    return (
        <span
            className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1
                ${status === Status.PAUSED ? "text-status-paused p-2 bg-status-paused_foreground" : ""}
                ${status === Status.PENDING ? "text-status-pending p-2 bg-status-pending_foreground" : ""}
                ${status === Status.IN_PROGRESS ? "text-status-in_progress p-2 bg-status-in_progress_foreground" : ""}
                ${status === Status.COMPLETED ? "text-status-completed p-2 bg-status-completed_foreground" : ""}
              `}
        >
            {
                children ? children : status
            }
        </span>
    )
}

interface ProgressIndicatorProps {
    progress: number | string;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
    const percentage = typeof progress === "string" ? convertFractionStringToPercentage(progress) : `${progress}%`;
    return (
        <Tooltip.Provider
            skipDelayDuration={400

            }>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <div className="h-3 w-16 mx-auto rounded-full bg-slate-300">
                        <div
                            className=" h-full rounded-md bg-brand-500 bg-green-400"
                            style={{
                                width: percentage,
                            }}
                        >
                        </div>
                        {/*                         <div className="flex items-center justify-center text-xs font-bold text-slate-900 dark:text-slate-300">
                            {percentage}
                        </div> */}
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                    side='bottom'>
                    <div className='bg-slate-900 px-4 py-2 rounded-full flex items-center justify-center text-md font-bold text-slate-900 dark:text-slate-300'>
                        {percentage}
                    </div>
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>

    );
}


interface RoleIndicatorProps {
    role: Role;
    children?: React.ReactNode;
    shadow?: boolean;
    className?: string;
}

export function RoleIndicator({ role, children, shadow, className }: RoleIndicatorProps) {
    return (
        <span
            className={cn(
                "uppercase text-md font-bold rounded-md px-2 py-1",
                shadow && "shadow-lg dark:shadow-slate-950",
                role === Role.OWNER && "text-red-500",
                role === Role.ADMIN && "text-amber-500",
                role === Role.EDITOR && "text-emerald-500",
                role === Role.VIEWER && "text-zinc-400",
                className // Add the extra className prop here
            )}
        >
            {children}
        </span>
    );
}
