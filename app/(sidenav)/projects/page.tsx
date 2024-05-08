import { Suspense } from "react";
import Link from "next/link";
import CardWrapper from "@/components/projects/cards";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/components/fonts";

//TODO: move to a separate file for create project button in components/projects/buttons.tsx
//TODO: create skeleton loaders for the components
export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} text-4xl `}>Projects page</h1>
            <Link href="/projects/create" className="absolute top-16 right-5">
                <Button variant="create">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Create a new project
                </Button>
            </Link>
            <div className="mt-4 space-y-4">
                <h2 className="text-lg font-medium ">Your projects</h2>
                {/*             <Suspense fallback={<CardsSkeleton />}> */}
                <CardWrapper />
                {/*             </Suspense> */}
                <h2 className="text-lg font-medium ">Projects with you</h2>
            </div>
        </main >
    );
}
