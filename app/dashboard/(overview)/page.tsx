
import { initializeStore } from "@/lib/store";
import GridDashboard from "@/components/dashboard/grid-dashboard";
import { lusitana } from "@/components/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton
} from "@/components/skeletons";

export default async function Page() {

  return (
    <main>

      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard page
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <GridDashboard />
      </Suspense>

    </main >
  );
}

