import SideNav from "@/components/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen flex flex-col md:flex-row md:overflow-hidden">
      <SideNav />

      {/*       {      <div className="p-2 md:overflow-y-auto md:p-4">{children}</div>} */}
      <div className="w-full">{children}</div>
    </div>

  );
}
