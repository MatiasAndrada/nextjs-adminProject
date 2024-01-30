import Link from 'next/link';
import NavLinks from '@/components/dashboard/nav-links';
import DropDown from "@/components/dashboard/drop-down-select-project"
import AcmeLogo from '@/components/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { fetchProjectsOfUser } from "@/data/projects";
import { currentSelectedProject } from "@/hooks/use-current-project"
import { LogoutButton } from '@/components/buttons-auth';



export default async function SideNav() {
  const [projectItems, currentProject] = await Promise.all([fetchProjectsOfUser(), currentSelectedProject()]); //Peticiones en paralelo
  return (
    <div className="w-[250px] flex h-full flex-col md:px-2">
      <div className="dark:bg-slate-950 mb-1 flex flex-col h-20 items-center justify-around rounded-md bg-blue-600 p-2 md:h-40">
        <DropDown name="Projects" createName="project" items={projectItems} selectedItem={currentProject} />
        <Link href="/">
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
        </Link>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
      <div className="mb-6 mr-4 flex-none flex flex-col justify-end md:justify-start">
        <LogoutButton>
          <PowerIcon className="w-6" />
        </LogoutButton>
      </div>
    </div>
  );
}
