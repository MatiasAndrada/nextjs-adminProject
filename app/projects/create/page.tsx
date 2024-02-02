
/* import { Suspense } from "react";
 */
import Breadcrumbs from "@/components/breadcrumbs";
import { currentUser } from "@/hooks/use-current-user";
import Form from "@/components/projects/create-form";
import { lusitana } from "@/components/fonts";

export default async function Page() {
    const user = await currentUser();

    return (
        <main>
            {/*             <div className="h-screen d-flex flex-col justify-evenly content-between"> */}
            <div className="flex flex-col items-start justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: "Projects", href: "/" },
                        { label: "Create project", href: "/projects/create", active: true },
                    ]}
                />
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Create new project
                </h1>
            </div>
            <div className="h-full flex flex-col items-center justify-between">
                <Form />
            </div>
            {/*             </div> */}
        </main>
    );
}
