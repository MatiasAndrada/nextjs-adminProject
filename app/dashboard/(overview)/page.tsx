import GridDashboard from "@/components/dashboard/grid-dashboard";
import { lusitana } from "@/components/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton
} from "@/components/skeletons";
import { currentSelectedProject } from "@/hooks/use-current-project";
import { Loader1 } from "@/components/loaders";

export default async function Page() {

  return (
    <main className="bg-gray-50 dark:bg-slate-900">
      <h1 className={`${lusitana.className} text-white text-4xl mx-4 mb-4`}>
        Dashboard
      </h1>
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full">
          <Loader1 />
        </div>
      }>
        < GridDashboard />
      </Suspense>

    </main >
  );
}
