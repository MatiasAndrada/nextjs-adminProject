import { Criticality, Status } from "@prisma/client"

export function CriticalityIndicator({ criticality }: { criticality: Criticality }) {
    return (
        <span
            className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1 
          ${criticality === Criticality.LOW ? "text-criticality-low p-2 bg-criticality-low_foreground" : ""}
          ${criticality === Criticality.MEDIUM ? "text-criticality-medium p-2 bg-criticality-medium_foreground" : ""}
          ${criticality === Criticality.HIGH ? "text-criticality-high p-2 bg-criticality-high_foreground" : ""}
          ${criticality === Criticality.CRITICAL ? "text-criticality-critical p-2 bg-criticality-critical_foreground" : ""}
          " : ""}`}>
            {criticality}
        </span>
    )
}

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