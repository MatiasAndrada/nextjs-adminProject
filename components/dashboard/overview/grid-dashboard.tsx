
import HeaderDashboard from "./header-dashboard";
import MainDashboard from "./main-dashboard";
import AsideDashboard from "./aside-dashboard";
import { currentSelectedProject } from "@/hooks/use-current-project";

export default async function GridDashboard({ searchParams }: { searchParams?: { query?: string; page?: string; } }) {

    const project = await currentSelectedProject();
    if (project) {
        const { id, name, description } = project;
        return (
            <main >
                {/* <h3>YOUR PROJECTS GRAPHS</h3> */}
                <div className="h-screen  grid grid-cols-3 grid-rows-6 gap-1">
                    <>
                        <HeaderDashboard id={id} />
                        <MainDashboard name={name} description={description ?? null} searchParams={searchParams} />
                        <AsideDashboard />
                    </>

                </div>
            </main>
        );
    }
} 