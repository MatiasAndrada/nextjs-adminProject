import RevenueChart from "@/components/dashboard/revenue-chart";
import LatestInvoices from "@/components/dashboard/latest-invoices";
import { lusitana } from "@/components/fonts";
import { Suspense } from "react";
import {
    RevenueChartSkeleton,
    LatestInvoicesSkeleton,
    CardsSkeleton
} from "@/components/skeletons";
import CardWrapper from '@/components/dashboard/cards';
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Home page
            </h1>
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Your projects</h2>
                <Link href="/projects/new">
                    <Button
                        variant="create"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Create a new project
                    </Button>
                </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
            <Suspense fallback={<CardsSkeleton />}>
                {<CardWrapper />}
            </Suspense>

            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Projects with you</h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    {/* <RevenueChart /> */}
                </Suspense>
                <Suspense />
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    {/* <LatestInvoices /> */}
                </Suspense>
            </div>
        </main>
    );
}
