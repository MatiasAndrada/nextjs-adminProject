import Link from "next/link";
import { RectangleStackIcon } from "@heroicons/react/24/outline";
/* import { formatDate, formatDateToLocal } from "@/lib/utils"; */
import Image from "next/image";
/* import type { TaskGroup } from "@prisma/client"; */
import { CriticalityIndicator, StatusIndicator } from "./indicators";
import { Criticality, Status } from "@prisma/client";
import { UpdateTaskGroup, DeleteTaskGroup } from "./buttons";

export default async function TaskGridItem({
  task,
}: {
  task: {
    id: string;
    name: string;
    description: string | null;
    criticality: Criticality;
    status: Status;
    progress: string;
    updatedAt: Date | null;
  };
}) {
  const {
    id,
    name,
    description,
    criticality,
    status,
    progress,
    updatedAt,
  } = task;
  // Calcula los días restantes hasta la fecha de vencimiento
  const today = new Date();
  /*   const dueDateTime = new Date(dueDate);
    const daysRemaining = Math.ceil((dueDateTime - today) / (1000 * 60 * 60 * 24)); */

  return (
    <div className="min-w-96 max-w-lg mx-auto bg-slate-300 dark:bg-slate-800 rounded-xl">
      <div className="break-inside relative overflow-visible flex flex-col justify-between space-y-3 text-sm rounded-xl max-w-2xl p-3 text-black  dark:text-white">
        <div className="flex items-center justify-between font-medium">
          <div className="flex items-center space-x-2   ">
            <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Criticality:
            </p>
            <CriticalityIndicator criticality={criticality} />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Status:
            </p>
            <StatusIndicator status={status} />
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <div
            className={`flex flex-none items-center justify-center w-10 h-10 rounded-full text-white 
          ${criticality === Criticality.LOW ? "bg-criticality-low" : ""}
          ${criticality === Criticality.MEDIUM ? "bg-criticality-medium" : ""}
          ${criticality === Criticality.HIGH ? "bg-criticality-high" : ""}
          ${criticality === Criticality.CRITICAL ? "bg-criticality-critical" : ""}
          `}
          >
            <RectangleStackIcon className="w-6 h-6" />
          </div>
          <span className="text-md md:text-lg font-medium">{name}</span>
        </div>
        <div>
          {description ?? ""}
          {!description?.endsWith(".") && "."}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col items-center  space-x-2 py-1 ">
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate- 400 ">
              Time left:
            </span>
            <span
              className={`uppercase w-fit text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1 bg-slate-400 dark:bg-slate-700`}
            >
              Incoming
            </span>

            <div className="flex items-center space-x-2 py-1">
              <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                Tasks Completed:
              </p>
              <span className="uppercase text-md font-bold shadow-lg dark:shadow-slate-900 rounded-md px-2 py-1 bg-slate-400 dark:bg-slate-700">
                {progress}
              </span>
            </div>
          </div>
          <div /* className="flex items-center justify-center" */>
            <span className="mr-2 text-xs font-bold text-slate-500 dark:text-slate-400 ">Assigned to:</span>
            <dd className="flex justify-start -space-x-1.5">
              {/*<a href='#' className='inline-block -m-1'>*/}
              <Image
                className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-slate-800"
                width={36}
                height={36}
                src="/members-mock/balazs-orban.png"
                alt="avatar"
              />
              {/*</a>*/}
              {/*
              <a href='#' className='inline-block -m-1'> */}
              <Image
                className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-slate-800"
                width={36}
                height={36}
                src="/members-mock/emil-kowalski.png"
                alt="avatar"
              />
              {/*</a>
              <a href='#' className='inline-block -m-1'>*/}
              <Image
                className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-slate-800"
                width={36}
                height={36}
                src="/members-mock/lee-robinson.png"
                alt="avatar"
              />
              {/* </a>*/}
              <span className="inline-block m-1 rounded-full ring-2 ring-white dark:ring-slate-800">
                {/* <svg
                width="32"
                height="32"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-slate-200 dark:text-slate-600"
              >
                <path
                  d="M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 0 31 6.93959 31 15.5ZM8.20879 15.5C8.20879 19.5268 11.4732 22.7912 15.5 22.7912C19.5268 22.7912 22.7912 19.5268 22.7912 15.5C22.7912 11.4732 19.5268 8.20879 15.5 8.20879C11.4732 8.20879 8.20879 11.4732 8.20879 15.5Z"
                  fill="currentColor"
                />
                <path
                  d="M31 15.5C31 18.049 30.3714 20.5586 29.1698 22.8066C27.9682 25.0547 26.2307 26.9716 24.1113 28.3878C21.9919 29.8039 19.556 30.6755 17.0193 30.9254C14.4826 31.1752 11.9234 30.7956 9.56841 29.8201C7.21345 28.8447 5.1354 27.3035 3.51834 25.3331C1.90128 23.3627 0.795112 21.0239 0.297828 18.5239C-0.199455 16.0239 -0.0725081 13.4398 0.667425 11.0006C1.40736 8.56136 2.73744 6.34225 4.53984 4.53985L10.2876 10.2876C9.43046 11.1448 8.79791 12.2002 8.44602 13.3602C8.09413 14.5202 8.03376 15.7491 8.27025 16.9381C8.50675 18.127 9.03281 19.2393 9.80184 20.1764C10.5709 21.1134 11.5591 21.8464 12.6791 22.3103C13.799 22.7742 15.0161 22.9547 16.2225 22.8359C17.4289 22.7171 18.5874 22.3026 19.5953 21.6291C20.6033 20.9556 21.4295 20.0439 22.001 18.9748C22.5724 17.9058 22.8714 16.7122 22.8714 15.5H31Z"
                  fill="#2BC86A"
                />
              </svg> */}
              </span>
            </dd>
          </div>
        </div>
        <div className="flex justify-between items-center overflow-visible">
          <div className="flex gap-4">
            <DeleteTaskGroup id={id} />
            <UpdateTaskGroup id={id} />

          </div>
          <Link
            href={`task-groups/` + id}
            className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-2 space-x-1 border-2 border-black  hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            <span>View Tasks</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div >
  );
}
