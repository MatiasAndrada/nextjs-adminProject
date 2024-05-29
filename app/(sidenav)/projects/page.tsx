/* import { Suspense } from "react"; */
//components
import Link from "next/link";
import Cards from "@/components/projects/cards";
import { CardsInvitation } from "@/components/invitation/card-invitation";
import { LinkCreate } from "@/components/projects/redirects";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/components/fonts";
//functions
import { fetch_projects_owner, fetch_projects_member } from "@/data/projects";

//TODO: move to a separate file for create project button in components/projects/buttons.tsx
//TODO: create skeleton loaders for the components
export default async function Page() {
    const projects_owner = await fetch_projects_owner();
    const projects_member = await fetch_projects_member();
    return (
        <main>
            <h1 className={`${lusitana.className} text-4xl `}>Projects page</h1>
            <div className="absolute top-16 right-5">
                <LinkCreate />
            </div>
            <div className="mt-4 space-y-4">
                <h2 className="text-xl font-medium ">Your projects:</h2>
                {projects_owner.length === 0 ? (
                    <div className="mx-auto flex flex-col items-center justify-center space-y-2">
                        <h2 className="text-lg font-medium ">
                            You don t have any projects yet.
                        </h2>
                        <Link href="/projects/new">
                            <Button variant="create" size="sm">
                                Create a project
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Cards ProjectsUser={projects_owner} />
                )}
                <h2 className="text-xl font-medium ">Projects with you:</h2>
                {projects_member.length === 0 ? (
                    <div className="mx-auto flex flex-col items-center justify-center space-y-2">
                        <h2 className="text-lg font-medium ">There are no projects with you yet.</h2>
                        <p className="text-gray-500">Join or invite on your project to start collaborating with others.</p>
                        <Button variant="disabled" size="sm">
                            Join a project
                        </Button>
                    </div>
                ) : (
                    <Cards ProjectsUser={projects_member} />
                )
                }
                <h3 className="text-xl font-medium">invitations:</h3>
                <CardsInvitation />
            </div>
        </main >
    );
}
