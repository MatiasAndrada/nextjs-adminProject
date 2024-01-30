import GridDashboard from "@/components/dashboard/grid-dashboard";
import { lusitana } from "@/components/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton
} from "@/components/skeletons";
import { currentSelectedProject } from "@/hooks/use-current-project";

export default async function Page() {
  const currentProject = await currentSelectedProject();
  return (
    <main className="container">
      {<h1 className={`${lusitana.className} text-4xl mt-4 ml-4`}>
        Dashboard page
      </h1>}
      {currentProject === null ? (
        <div className="mt-4 flex flex-col items-center justify-center h-screen bg-gray-200 rounded-lg">
          <h3 className="text-2xl text-red-500">First you must select a project!</h3>
        </div>

      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <GridDashboard {...currentProject} />
        </Suspense>
      )
      }
    </main >
  );
}
