import { Metadata } from "next";
import SideNav from "@/components/dashboard/sidenav";
import { CurrentProjectStoreProvider } from "@/context/currentProjectStore";
import { inter } from "@/components/fonts"
/* import SelectedProjectStore from "@/context/selectedProjectStore"; */
import { currentProject } from "@/hooks/use-current-project";

export const metadata: Metadata = {
  title: {
    template: '%s | Project Admin', // El %s se reemplazara con el título de la página especifica
    default: 'Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const project = await currentProject();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-200 dark:bg-slate-950 text-black dark:text-white`} id="main_layout">
        <CurrentProjectStoreProvider>
          <div className=" h-screen flex flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            {/*       {      <div className="p-2 md:overflow-y-auto md:p-4">{children}</div>} */}
            {project === null ? (
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
        </CurrentProjectStoreProvider>
      </body>
    </html>

  );
}