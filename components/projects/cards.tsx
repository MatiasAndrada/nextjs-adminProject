import Link from "next/link";
//components
import { SetCurrentProjectId } from "@/components/dashboard/buttons";
import DropdownActions from "@/components/projects/dropdown-actions";
import { LinkViewProject } from "./redirects";
import { EyeIcon } from "@heroicons/react/24/outline";
//types
import { Project, ProjectUser } from "@prisma/client";


export default function Cards({ ProjectsUser }: { ProjectsUser: Array<ProjectUser & { project: Project }> }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {ProjectsUser?.map((projectUser) => (
        <Card key={projectUser.id} id={projectUser.id} name={projectUser.project.name} />
      ))}
    </div>
  )

}

export function Card({ id, name }: { id: string; name: string }) {
  //TODO: debe de tener el rol del usuario
  return (
    <div className="min-w-fit flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-900  shadow-xl rounded-lg p-4">
      <div className="p-2 ">
        <DropdownActions id={id} />
      </div>
      <div>
        <h3 className="text-lg text-balance">{name}</h3>
        <span className="text-green-500 text-md font-medium flex items-center">
          #{id && id.slice(-3)}
        </span>
      </div>

      <LinkViewProject >
        <SetCurrentProjectId id={id} >
          <EyeIcon className="w-6 h-6 mr-1" />
          View project
        </SetCurrentProjectId>
      </LinkViewProject>
    </div>
  );
}
