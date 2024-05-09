import Link from "next/link";
import { ButtonViewProject } from "@/components/projects/buttons";
import { Button } from "@/components/ui/button";
//types
import { Project } from "@prisma/client";
/* import { EyeIcon } from "@heroicons/react/24/outline"; */

export default function Cards({ projects, yours = true }: { projects: Project[] | null, yours?: boolean }) {
  return projects === null ? (
    <div className="mx-auto flex flex-col items-center justify-center space-y-2">
      {yours ? (
        <>
          <h2 className="text-lg font-medium ">You don t have any projects yet.</h2>
          <Link href="/projects/new">
            <Button variant="create" size="sm">
              Create a project
            </Button>
          </Link>
        </>
        /*  */
      )
        : (
          <>
            <h2 className="text-lg font-medium ">There are no projects with you yet.</h2>
            <p className="text-gray-500">Join or invite on your project to start collaborating with others.</p>
            <Button variant="disabled" size="sm">
              Join a project
            </Button>
          </>
        )
      }
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {projects?.map((project) => (
        <Card key={project.id} id={project.id} name={project.name} />
      ))}
    </div>
  );
}

export function Card({ id, name }: { id: string; name: string }) {
  return (
    <div className="min-w-fit flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-900  shadow-xl rounded-lg p-4">
      <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 15v4a2 2 0 002 2h3v-4"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16" />
        </svg>
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
