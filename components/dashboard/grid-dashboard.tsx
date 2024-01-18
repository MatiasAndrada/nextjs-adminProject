
import { useStore } from "@/lib/store";
import { currentSelectedProject } from "@/lib/auth";

export default async function GridDashboard() {
    /*     const currentProject = await currentSelectedProject(); */
    //const { data } = useStore((state) => state);
    const data = "Not Found";

    if (data === "Not Found") {
        return (
            <main>
                <h3>YOUR PROJECTS GRAPHS</h3>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                        <div className="flex flex-col gap-4">
                            <h3>SELECTED PROJECT API</h3>
                            <p>Not Found</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                        {/* Add Hero Images Here */}
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main>
            <h3>YOUR PROJECTS GRAPHS</h3>
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <div className="flex flex-col gap-4">
                        <h3>SELECTED PROJECT API</h3>
                        <pre>{JSON.stringify(data)}</pre>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    {/* Add Hero Images Here */}
                </div>
            </div>
        </main>
    );

}