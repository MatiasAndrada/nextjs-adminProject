import SideNav from "@/components/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (

    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full md:w-64"> {/*optional flex-none */}
        <SideNav />
      </div>
      {/*       {      <div className="p-2 md:overflow-y-auto md:p-4">{children}</div>} */}
      <div>{children}</div>
    </div>

  );
}
