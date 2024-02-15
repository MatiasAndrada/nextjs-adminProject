
import HeaderDashboard from "./header-dashboard";
import MainDashboard from "./main-dashboard";
import AsideDashboard from "./aside-dashboard";
import { currentSelectedProject } from "@/hooks/use-current-project";

export default async function GridDashboard() {
    const currentProject = await currentSelectedProject();
    const currentProjectId = currentProject?.id; // Provide a default value for currentProjectId

    return (
        <main className="min-h-screen ">
            {/* <h3>YOUR PROJECTS GRAPHS</h3> */}
            <div className="min-h-screen  grid grid-cols-3 grid-rows-5 gap-1">
                {currentProjectId !== undefined && currentProjectId !== null ? (
                    <>
                        <HeaderDashboard id={currentProjectId} />
                        <MainDashboard />
                        <AsideDashboard />
                    </>
                ) : null}
            </div>
        </main>
    );

} 