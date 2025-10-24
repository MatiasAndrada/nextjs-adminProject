import { Suspense } from "react";
import { lusitana } from "@/components/fonts";
import Cards from "@/components/projects/cards";
import { CardsInvitation } from "@/components/invitation/card-invitation-user";
import { CreateProject } from "@/components/projects/redirects";
import { fetch_projects_owner, fetch_projects_member } from "@/data/projects";
import { ProjectsGridSkeleton } from "@/components/skeletons";
import { skeletonDelay } from "@/lib/skeleton-delay";

// Componente para proyectos del owner
async function OwnerProjects() {
  // Delay configurable para testing de skeletons (controlado por env var)
  await skeletonDelay();
  
  const projects_owner = await fetch_projects_owner();
  
  if (projects_owner.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center space-y-2">
        <h2 className="text-xl font-medium">
          You don't have any projects yet.
        </h2>
        <CreateProject />
      </div>
    );
  }
  
  return <Cards ProjectsUser={projects_owner} />;
}

// Componente para proyectos como miembro
async function MemberProjects() {
  // Delay configurable para testing de skeletons (controlado por env var)
  await skeletonDelay();
  
  const projects_member = await fetch_projects_member();
  
  if (projects_member.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center space-y-2">
        <h2 className="text-xl font-medium">
          There are no projects with you yet.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          You must have an invitation to a project to start collaborating with others.
        </p>
      </div>
    );
  }
  
  return <Cards ProjectsUser={projects_member} />;
}

// Componente para invitaciones
async function InvitationsSection() {
  // Delay configurable para testing de skeletons (controlado por env var)
  await skeletonDelay();
  
  return <CardsInvitation />;
}

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className={`${lusitana.className} text-4xl`}>Projects page</h1>
      
      <div className="space-y-4">
        {/* Your Projects Section */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium">Your projects</h2>
          <div className="ml-end">
            <CreateProject />
          </div>
        </div>
        
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <OwnerProjects />
        </Suspense>
        
        {/* Projects with you Section */}
        <h2 className="text-2xl font-medium">Projects with you</h2>
        
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <MemberProjects />
        </Suspense>
        
        {/* Invitations Section */}
        <h3 className="text-2xl font-medium">Invitations</h3>
        
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <InvitationsSection />
        </Suspense>
      </div>
    </section>
  );
}
