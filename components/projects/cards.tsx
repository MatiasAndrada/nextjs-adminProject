import Link from "next/link";
//components
import { ButtonViewProject } from "@/components/projects/buttons";
import ButtonActionsDropDropdown from "@/components/projects/drop-down-actions";
//types
import { Project, ProjectUser } from "@prisma/client";


export default function Cards({ ProjectsUser }: { ProjectsUser: Array<ProjectUser & { project: Project }> }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {ProjectsUser?.map((p) => (
        <Card key={p.id} id={p.project.id} name={p.project.name} />
      ))}
    </div>
  )

}

export function Card({ id, name }: { id: string; name: string }) {
  //TODO: debe de tener el rol del usuario
  return (
    <div className="min-w-fit flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-900  shadow-xl rounded-lg p-4">
      <div className="p-2 ">
        <ButtonActionsDropDropdown id={id} />
      </div>
      <div>
        <h3 className="text-lg text-balance">{name}</h3>
        <span className="text-green-500 text-md font-medium flex items-center">
          #{id && id.slice(-3)}
        </span>
      </div>

      <ButtonViewProject projectId={id} />

      {/*           <Link
            href={`/dashboard`}
            className="flex items-center text-blue-600 bg-blue-500 hover:bg-blue-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            <EyeIcon className="w-6 h-6 mr-2" />
            <span>View project</span>
          </Link> */}
    </div>
  );
}
