import Link from 'next/link';
import NavLinks from '@/components/dashboard/nav-links';
import DropDown from "@/components/dashboard/drop-down-select-project"
import AcmeLogo from '@/components/acme-logo';
import ThemeToggle from '@/components/ThemeToggle';
import { LogoutButton } from '@/components/buttons-auth';
import { fetch_projects } from "@/data/projects";
import { currentSelectedProject } from "@/hooks/use-current-project"
import { PowerIcon } from '@heroicons/react/24/outline';



export default async function SideNav() {
  const [projectItems, currentProject] = await Promise.all([fetch_projects(), currentSelectedProject()]); //Peticiones en paralelo
  return (
    <div className=" w-full bg-slate-300 dark:bg-slate-950 h-screen flex flex-col gap-2">
      <div className=" bg-blue-500 p-2 flex flex-col h-fit items-center justify-around gap-4">
        <DropDown name="Projects" createName="project" items={projectItems} selectedItem={currentProject} />
        <div className='flex flex-row items-center'>
          <Link href="/">
            <div className="w-32 text-white md:w-40">
              <AcmeLogo />
            </div>
          </Link>
          <ThemeToggle />
        </div>

      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="bg-slate-300 dark:bg-slate-950 hidden h-auto w-full grow rounded-md  md:block">
        </div>
      </div>

      <div className="mb-6 flex-none flex flex-col justify-end md:justify-start  ">
        <LogoutButton>
          <PowerIcon className="w-6" />
        </LogoutButton>
      </div>
    </div >
  );
}
