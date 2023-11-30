import { Metadata } from 'next';
import Table from "@/app/ui/groupTask/table";
/* import { InvoicesTableSkeleton } from "@/app/ui/skeletons"; */
/* import Search from "@/app/ui/search"; */
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Page() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Task group</h1>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Table />
            </Suspense>
        </div>
    );
}
