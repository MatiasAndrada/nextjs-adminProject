import { fetchProjectsOfUser } from "@/data/projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* import {
  BanknotesIcon,sa
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline"; */

/* import { lusitana } from "@/components/fonts";
 */

export default async function CardWrapper() {
  const projects = await fetchProjectsOfUser();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      <div className="grid grid-cols-2">
        {/* 
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {
          projects?.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium text-gray-900">You don't have any projects yet.</h2>
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
    <div className="max-w-sm mx-auto my-10">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-purple-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a2 2 0 00-2-2h-3v4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15v4a2 2 0 002 2h3v-4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-600 text-md">{name}</h3>
            {/*             <div className="text-gray-900 text-2xl font-semibold">
              71,897
              <span className="text-green-500 text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                122
              </span>
            </div> */}
          </div>
        </div>
        <Link
          href={`/dashboard`}
          className="w-full text-purple-600 bg-purple-100 hover:bg-purple-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out">
          View project
        </Link>
      </div>
    </div >
  );
}
