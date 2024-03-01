import React from "react";
import moment from "moment";
import { Status } from "@prisma/client";

interface TabContentInfoProps {
    status: Status;
    progress: number;
    createdAt: Date;
}

const TabContentInfo: React.FC<TabContentInfoProps> = ({
    status,
    progress,
    createdAt,
}) => {
    const createdAtLocal = moment(createdAt).format("DD/MM/YYYY");
    return (
        <div className="grid grid-cols-2 grid-rows-4">
            <div className="col-span-1 row-span-2">
                <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                        Status:
                    </p>
                    <p
                        className={`uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1
                ${status === Status.PAUSED ? "text-status-paused p-2 bg-status-paused_foreground" : ""}
                ${status === Status.PENDING ? "text-status-pending p-2 bg-status-pending_foreground" : ""}
                ${status === Status.IN_PROGRESS ? "text-status-in_progress p-2 bg-status-in_progress_foreground" : ""}
                ${status === Status.COMPLETED ? "text-status-completed p-2 bg-status-completed_foreground" : ""}
            `}
                    >
                        {status}
                    </p>
                </div>
            </div>
            <div className="col-span-1 row-span-2">
                <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                        Progress:
                    </p>
                    <p className="text-lg">{progress}%</p>
                </div>
            </div>
            <div className="col-span-1 row-span-2">
                <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                        Updated At:
                    </p>
                    <p className="text-lg ">coming soon</p>
                </div>
            </div>
            <div className="col-span-1 row-span-2">
                <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                        Created At:
                    </p>
                    <p className="text-lg">{createdAtLocal}</p>
                </div>
            </div>
        </div>
    );
};

export default TabContentInfo;
