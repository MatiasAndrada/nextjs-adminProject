import { Role } from "@prisma/client";
import { RoleIndicator } from "../ui/indicators";

interface CardInfoProps {
  role: Role;
  permissions: string[];
}

export function CardInfo({ role, permissions }: CardInfoProps) {
  return (
    <div>
      <div className="flex flex-col items-center p-10 bg-slate-300 dark:bg-gray-800 text-black dark:text-white rounded-lg">
        <span className="font-semibold">The role of</span>
        <RoleIndicator className="text-3xl" role={role}>
          {role}
        </RoleIndicator>
        <span className="font-semibold">have these permissions</span>
      </div>
      <div className="bg-slate-300 dark:bg-slate-900 p-10">
        <ul>
          {permissions.map((permission, index) => (
            <li className="flex items-center" key={index}>
              <svg
                className="w-5 h-5 text-green-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2">{permission}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
