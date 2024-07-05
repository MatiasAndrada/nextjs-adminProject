import type { Project, UsersOnProjects } from "@prisma/client";
import { SetCurrentProjectId } from './buttons';
import { LinkCreate } from "./redirects";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuPortal
} from "../../components/ui/dropdown-menu";

interface DropDownProps {
    name: string;
    createName: string;
    selectedProject: Project | undefined;
    items?: Array<UsersOnProjects & { project: Project }>;
}

export async function DropDownProjects({ name, createName, selectedProject, items }: DropDownProps) {

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <div className="select-none inline-flex justify-center w-full px-3 py-2 text-sm font-medium bg-white hover:bg-slate-100 dark:bg-slate-950 border dark:hover:bg-slate-800 border-black dark:border-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                    {selectedProject !== undefined ? ` ${selectedProject?.name}` : `Select ${name}`}
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
                <DropdownMenuContent className="mt-2 w-56 rounded-md shadow-lg bg-slate-200 dark:bg-slate-950 ring-1 ring-black ring-opacity-5">
                    {items?.length && selectedProject !== undefined && (
                        <DropdownMenuItem className="   hover:bg-gray-300 dark:hover:bg-slate-800 rounded-lg">
                            <SetCurrentProjectId id={null}>
                                Select none
                            </SetCurrentProjectId>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="my-1 bg-slate-300" />
                    {items?.map((userOnProject) => (
                        <DropdownMenuItem key={userOnProject.id} className="   hover:bg-gray-300 dark:hover:bg-slate-800 rounded-lg">
                            <SetCurrentProjectId id={userOnProject.id} >
                                {userOnProject.project.name}
                            </SetCurrentProjectId>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="my-2 bg-slate-300" />
                    <DropdownMenuItem className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <LinkCreate />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}


