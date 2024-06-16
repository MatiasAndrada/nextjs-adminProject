import { Criticality, Status } from "@prisma/client"

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

/* export function CriticalityBgColor({ criticality, children }: { criticality: Criticality, children: React.ReactNode }) {
    return (
        <div
            className={`flex flex-none items-center justify-center w-10 h-10 rounded-full
          ${criticality === Criticality.LOW ? "bg-criticality-low" : ""}
          ${criticality === Criticality.MEDIUM ? "bg-criticality-medium" : ""}
          ${criticality === Criticality.HIGH ? "bg-criticality-high" : ""}
          ${criticality === Criticality.CRITICAL ? "bg-criticality-critical" : ""}
          `}
        >
            {children}
        </div>
    )
} */

export function StatusIndicator({ status }: { status: Status }) {
    return (
        <span
            className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1
                ${status === Status.PAUSED ? "text-status-paused p-2 bg-status-paused_foreground" : ""}
                ${status === Status.PENDING ? "text-status-pending p-2 bg-status-pending_foreground" : ""}
                ${status === Status.IN_PROGRESS ? "text-status-in_progress p-2 bg-status-in_progress_foreground" : ""}
                ${status === Status.COMPLETED ? "text-status-completed p-2 bg-status-completed_foreground" : ""}
              `}
        >
            {status}
        </span>
    )
}