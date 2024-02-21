import SideNav from "@/components/dashboard/sidenav";
import { currentSelectedProject } from "@/hooks/use-current-project";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const currentProject = await currentSelectedProject();
  return (
    <div className="text-black dark:text-white bg-gray-50 dark:bg-slate-900 h-screen flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      {/*       {      <div className="p-2 md:overflow-y-auto md:p-4">{children}</div>} */}
      {currentProject === null ? (
        <div className="flex items-center justify-center h-screen w-full mx-auto">
          <h3 className="text-2xl text-red-500 h-32">
            First you must select a project!
          </h3>
        </div>

      ) : (
        /*         <div className="w-full flex-grow px-4 md:overflow-y-auto md:px-6">{children}</div> //con padding*/
        <div className="h-screen flex-grow md:overflow-y-auto  p-6 md:p-12">{children}</div>
      )}
    </div>

  );
}