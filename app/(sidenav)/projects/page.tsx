/* import { Suspense } from "react"; */
//components
import Cards from "@/components/projects/cards";
import { CardsInvitation } from "@/components/invitations/card-invitation";
import { ButtonCreate } from "@/components/projects/buttons";
import { lusitana } from "@/components/fonts";
//functions
import { fetch_projects } from "@/data/projects";

//TODO: move to a separate file for create project button in components/projects/buttons.tsx
//TODO: create skeleton loaders for the components
export default async function Page() {
    //se están pidiendo los datos aquí por que luego se creara el fetch_projects_with_you para pasarla props a la card
    const projects = await fetch_projects()
    //const projectsWithYou = await fetch_projects()
    return (
        <main>
            <h1 className={`${lusitana.className} text-4xl `}>Projects page</h1>
            <div className="absolute top-16 right-5" >
                <ButtonCreate />
            </div>
            <div className="mt-4 space-y-4">
                <h2 className="text-xl font-medium ">Your projects:</h2>
                {/*             <Suspense fallback={<CardsSkeleton />}> */}
                <Cards projects={projects} />
                {/*             </Suspense> */}
                < h2 className="text-xl font-medium ">Projects with you:</h2>
                <Cards projects={null} yours={false} />
                <h3 className="text-xl font-medium">invitations:</h3>
                <CardsInvitation />
            </div>
        </main >
    );
}
