import SideNav from "@/components/dashboard/sidenav";
import { inter } from "@/components/fonts";
import { CurrentProjectStoreProvider } from "@/context/currentProjectStore";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-200 dark:bg-slate-950 text-black dark:text-white`} id="main_layout">

        <CurrentProjectStoreProvider>
          <div className="md:overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </div>
          </div>
        </CurrentProjectStoreProvider>
      </body>
    </html>
  );
}
