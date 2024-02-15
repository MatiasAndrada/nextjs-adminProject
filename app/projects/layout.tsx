import SideNav from "@/components/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-black dark:text-white bg-gray-50 dark:bg-slate-900 md:overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>
  );
}