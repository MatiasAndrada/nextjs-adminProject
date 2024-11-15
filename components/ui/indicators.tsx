import moment from "moment";
import * as Tooltip from "@radix-ui/react-tooltip";
import { inter } from "@/components/fonts";
import { convertFractionToPercentage, cn } from "@/lib/utils";
import { Criticality, Status, Role } from "@prisma/client";

export function CriticalityIndicator({
  criticality,
  children,
}: {
  criticality: Criticality;
  children?: React.ReactNode;
}) {
  const bgColor = (criticality: Criticality) => {
    if (criticality === Criticality.LOW) return "bg-green-500";
    if (criticality === Criticality.MEDIUM) return "bg-sky-500";
    if (criticality === Criticality.HIGH) return "bg-orange-500";
    if (criticality === Criticality.CRITICAL) return " bg-red-500";
    return "text-zinc-400";
  };
  const shadowColor = (criticality: Criticality) => {
    if (criticality === Criticality.LOW) return "shadow-green-500";
    if (criticality === Criticality.MEDIUM) return "shadow-sky-500";
    if (criticality === Criticality.HIGH) return "shadow-orange-500";
    if (criticality === Criticality.CRITICAL) return " shadow-red-500";
    return "shadow-zinc-400";
  };
  return (
    <span
      className={`${inter.className} ${bgColor(criticality)} uppercase text-md text-black font-bold shadow-md ${shadowColor(criticality)} rounded-md px-2 py-1 
          " : ""}`}
    >
      {children}
    </span>
  );
}

interface StatusIndicatorProps {
  status: Status;
  children?: React.ReactNode;
}

export function StatusIndicator({ status, children }: StatusIndicatorProps) {
  const shadowColor = (status: Status) => {
    if (status === Status.PAUSED) return "shadow-status-paused_foreground";
    if (status === Status.PENDING) return "shadow-status-pending_foreground";
    if (status === Status.IN_PROGRESS)
      return "shadow-status-in_progress_foreground";
    if (status === Status.COMPLETED)
      return "shadow-status-completed_foreground";
    return "shadow-zinc-400";
  };
  return (
    <span
      className={`uppercase text-md font-bold text-black shadow-md ${shadowColor(status)} rounded-md px-2 py-1
                ${status === Status.PAUSED ? "text-status-paused p-2 bg-status-paused_foreground" : ""}
                ${status === Status.PENDING ? "text-status-pending p-2 bg-status-pending_foreground" : ""}
                ${status === Status.IN_PROGRESS ? "text-status-in_progress p-2 bg-status-in_progress_foreground" : ""}
                ${status === Status.COMPLETED ? "text-status-completed p-2 bg-status-completed_foreground" : ""}
              `}
    >
      {children ? children : status}
    </span>
  );
}

interface ProgressIndicatorProps {
  progress?: number;
  fraction?: { numerator: number; denominator: number };
}

export function ProgressIndicator({
  progress,
  fraction,
}: ProgressIndicatorProps) {
  const percentage = progress
    ? progress + "%"
    : fraction
      ? convertFractionToPercentage(fraction.numerator, fraction.denominator)
      : "0%";
  return (
    <Tooltip.Provider skipDelayDuration={400}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <div className="h-3 w-16 mx-auto rounded-full bg-slate-300">
            <div
              className=" h-full rounded-md bg-brand-500 bg-green-400"
              style={{
                width: percentage,
              }}
            ></div>
            {/*                         <div className="flex items-center justify-center text-xs font-bold text-slate-900 dark:text-slate-300">
                            {percentage}
                        </div> */}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">
          <div className="bg-slate-900 px-4 py-2 rounded-full flex items-center justify-center text-md font-bold text-slate-900 dark:text-slate-300">
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
  className?: string;
}

export function RoleIndicator({
  role,
  children,
  className,
}: RoleIndicatorProps) {
  const getColorText = (role: Role) => {
    if (role === Role.OWNER) return "text-red-500";
    if (role === Role.ADMIN) return "text-amber-500";
    if (role === Role.EDITOR) return "text-emerald-500";
    return "text-zinc-400";
  };

  const bgColorRole = getColorText(role);

  return (
    <span
      className={cn(
        bgColorRole,
        "uppercase text-md font-bold rounded-md px-2 py-1",
        className // Add the extra className prop here
      )}
    >
      {children}
    </span>
  );
}

export const TimeDisplay = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const today = moment();
  const start = moment(startDate);
  const end = moment(endDate);

  let message;
  let bgColor;

  if (today.isBefore(start)) {
    const daysUntilStart = start.diff(today, "days");
    message = `${daysUntilStart} days until start`;
    bgColor = "bg-blue-400 dark:bg-blue-700";
  } else if (today.isBetween(start, end, "days", "[]")) {
    const daysUntilEnd = end.diff(today, "days");
    message = `${daysUntilEnd} days left`;
    bgColor = "bg-slate-400 dark:bg-slate-700";
  } else {
    const daysSinceEnd = today.diff(end, "days");
    message = `${daysSinceEnd} days since end`;
    bgColor = "bg-red-400 dark:bg-red-700";
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
              deadline:
            </span>
            <span
              className={` w-fit text-xs font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1 ${bgColor}`}
            >
              {message}
            </span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content className="bg-black text-white p-2 rounded shadow-lg">
          {message}
          <Tooltip.Arrow className="fill-current text-black" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
