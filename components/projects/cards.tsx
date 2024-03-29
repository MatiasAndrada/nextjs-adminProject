import ButtonViewProject from "./buttonViewProject";
import { fetch_projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";
/* import { EyeIcon } from "@heroicons/react/24/outline"; */


export default async function CardWrapper() {
  const projects = await fetch_projects()

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      <div className="grid grid-cols-3">
        {/* 
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {
          projects === null ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium ">You don t have any projects yet.</h2>
              <Link href="/projects/new">
                <Button
                  variant="create"
                >
                  Create a project

                </Button>
              </Link>
            </div>
          ) :
            projects?.map((project) => (
              <Card
                key={project.id}
                id={project.id}
                name={project.name}
              />
            ))}
      </div>
    </>
  );
}

export function Card({
  id,
  name,
}: {
  id: string;
  name: string;
}) {

  return (
    <div className="mx-auto my-10">
      <div className=" bg-slate-100 dark:bg-slate-900  shadow-xl rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-6">
          <div className="p-2 bg-purple-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a2 2 0 00-2-2h-3v4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15v4a2 2 0 002 2h3v-4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16" />
            </svg>
          </div>
          <div >

            <h3 className="text-xl w-fit">{name}</h3>

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
      </div>
    </div >
  );
}
