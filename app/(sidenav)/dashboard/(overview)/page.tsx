import GridDashboard from "@/components/dashboard/overview/grid-dashboard";
import { lusitana } from "@/components/fonts";
import { Suspense } from "react";
import { ProjectChat } from "@/components/chat/project-chat";
import { currentProject } from "@/hooks/use-current-project";
import { auth } from "@/auth";
/* import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton
} from "@/components/skeletons"; */
import { Loader1 } from "@/components/loaders";

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string; } }) {
  const project = await currentProject();
  const session = await auth();

  return (
    <main className="space-y-4 relative">
      <h1 className={`${lusitana.className} text-4xl `}>
        Dashboard
      </h1>
      <Suspense fallback={
        <Loader1 />
      }>
        <GridDashboard searchParams={searchParams} />
      </Suspense>
      
      {/* Chat flotante del proyecto */}
      {project && session?.user?.id && (
        <ProjectChat
          projectId={project.id}
          currentUserId={session.user.id}
          currentUserName={session.user.name || "Usuario"}
        />
      )}
    </main >
  );
}
