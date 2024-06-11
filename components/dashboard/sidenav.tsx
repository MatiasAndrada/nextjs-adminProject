import Link from "next/link";

import NavLinks from "@/components/dashboard/nav-links";
import { DropDownProjects } from "@/components/dashboard/drop-down-projects";
import DropDown from "@/components/dashboard/drop-down-select-project";
import { IconWithText } from "@/components/logo";
import ThemeToggle from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/buttons-auth";

import { fetch_projects } from "@/data/projects";
import { currentProject } from "@/hooks/use-current-project";
import { PowerIcon } from "@heroicons/react/24/outline";

export default async function SideNav() {
  const [projectItems, project] = await Promise.all([
    fetch_projects(),
    currentProject(),
  ]); //Peticiones en paralelo
  return (
    <div className=" h-screen w-full bg-slate-300 dark:bg-slate-900  flex flex-col gap-2">
      <div className=" bg-blue-500 p-2 flex flex-col h-fit items-center justify-around gap-4">
        <div className="pt-2 flex flex-row items-center gap-1 justify-around w-full">
          <IconWithText redirect="/projects" />
          <ThemeToggle />

        </div>
        {/*
        <DropDown
          name="Projects"
          createName="project"
          items={projectItems}
          selectedItem={project}
        />
  */}
        <DropDownProjects
          name="Projects"
          createName="project"
          items={projectItems}
          selectedProject={project}
        />

      </div>
      <div className="mx-2 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="bg-slate-300 dark:bg-slate-900 hidden h-auto w-full grow rounded-md  md:block"></div>
      </div>

      <div className="mb-6 mx-2 flex-none flex flex-col justify-end md:justify-start">
        <LogoutButton>
          <PowerIcon className="w-6" />
        </LogoutButton>
      </div>
    </div>
  );
}
