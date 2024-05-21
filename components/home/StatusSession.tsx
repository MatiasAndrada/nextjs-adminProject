import { SessionClient } from "@/components/home/SessionClient";
import { SessionServer } from "@/components/home/SessionServer";


export function StatusSession() {
    return (
        <div className="opacity-60">
            <h4 className="text-gray-500 dark:text-slate-300 text-balance text-sm w-36">
                Verify the server and client session status:
            </h4>
            <div className="flex flex-row gap-2">
                <span className="text-xs">Server:</span>
                <SessionServer />
                <span className="text-xs">Client:</span>
                <SessionClient />
            </div>
        </div >
    );
}