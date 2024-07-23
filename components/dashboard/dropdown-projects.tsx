import type { Project, UsersOnProjects } from "@prisma/client";
import { SetCurrentProjectId } from "./buttons";
import { CreateProject } from "./redirects";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "../../components/ui/dropdown-menu";

interface DropDownProps {
  selectedProject: Project | undefined;
  items?: Array<UsersOnProjects & { project: Project }>;
}

export async function DropDownProjects({
  selectedProject,
  items,
}: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="select-none inline-flex justify-center w-full px-3 py-2 text-sm font-medium bg-white hover:bg-slate-100 dark:bg-slate-950 border dark:hover:bg-slate-900 text-black dark:text-white border-slate-800 dark:border-slate-300 rounded-md ">
          {selectedProject !== undefined
            ? ` ${selectedProject?.name}`
            : `Select project`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ml-1 transition-transform transform `}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mt-2 w-56  bg-slate-200 dark:bg-slate-950 border-none">
          {items?.length && selectedProject !== undefined && (
            <>
              <DropdownMenuItem className="   hover:bg-gray-300 dark:hover:bg-slate-900  rounded-lg">
                <SetCurrentProjectId id={null}>Select none</SetCurrentProjectId>
              </DropdownMenuItem>
              <DropdownMenuSeparator className=" bg-slate-300" />
            </>
          )}
          {items?.map((userOnProject) => (
            <DropdownMenuItem
              key={userOnProject.id}
              className="   hover:bg-gray-300 dark:hover:bg-slate-800 rounded-lg"
            >
              <SetCurrentProjectId id={userOnProject.id}>
                {userOnProject.project.name}
              </SetCurrentProjectId>
            </DropdownMenuItem>
          ))}
          {(items?.length ?? 0) > 0 && (
            <DropdownMenuSeparator className=" bg-slate-300" />
          )}
          <DropdownMenuItem className=" hover:bg-gray-300 dark:hover:bg-slate-900 rounded-lg">
            <CreateProject />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
