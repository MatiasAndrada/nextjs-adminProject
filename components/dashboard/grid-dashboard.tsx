import type { Project } from "@prisma/client";
import HeaderDashboard from "./header-dashboard";
import MainDashboard from "./main-dashboard";
import AsideDashboard from "./aside-dashboard";
export default async function GridDashboard(project: Project) {
    return (
        <main className="min-h-screen dark:bg-gray-800" >
            {/*             <h3>YOUR PROJECTS GRAPHS</h3> */}
            < div className="min-h-screen grid grid-cols-3  gap-1" >
                <HeaderDashboard />
                <MainDashboard />
                <AsideDashboard />
            </div >
        </main >
    );

}