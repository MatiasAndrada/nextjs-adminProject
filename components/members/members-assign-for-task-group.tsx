/* "use client"; */
import { assign_member_to_task_group } from "@/actions/members";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FormError } from "@/components/form-error";
import {
  fetch_members,
  fetch_members_assigned_to_task_group,
} from "@/data/members";
import { RoleIndicator } from "../ui/indicators";
/* import { Button } from "../ui/button"; */

const MembersAssignForTaskGroup = async ({
  id,
  searchParams,
}: {
  id: string;
  searchParams: { page: number };
}) => {
  const currentPage = searchParams.page || 1;
  const [members, membersAssigned] = await Promise.all([
    fetch_members(currentPage),
    fetch_members_assigned_to_task_group(id),
  ]);
  if (!members || !membersAssigned) return null;
  if (!membersAssigned) return null;
  return (
    <>
      {members.length === 0 ? (
        <div className="w-fit mx-auto ">
          <FormError message="No members assigned to this task group." />
        </div>
      ) : (
        <form
          className="relative overflow-x-auto shadow-md sm:rounded-lg"
          action={assign_member_to_task_group}
        >
          <input type="hidden" name="id" value={id} />
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xs text-black dark:text-white uppercase bg-slate-400 dark:bg-slate-700">
              <tr>
                <th className="p-4">
                  <div className="flex items-center">
                    {/*
                                            <input
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            */}
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th className="text-start min-w-[70px]">AVATAR</th>
                <th className="text-center min-w-[120px]">NAME</th>
                <th className="text-center min-w-[120px]">EMAIL</th>
                <th className="text-center min-w-[100px]">ROLE</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.user.id}
                  className="bg-white border-b dark:bg-slate-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="selectedIds"
                        value={member.user.id}
                        defaultChecked={membersAssigned.some(
                          (m) => m.user.id === member.user.id
                        )}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${member.user.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-start">
                    <Avatar className="w-10 h-10">
                      {member.user.image ? (
                        <AvatarImage src={member.user.image} alt="Icon user" />
                      ) : (
                        <AvatarFallback>{member.user.name?.[0]}</AvatarFallback>
                      )}
                    </Avatar>
                  </td>
                  <td className="px-6 py-4 text-center font-medium whitespace-nowrap">
                    {member.user.name}
                  </td>
                  <td className="px-6 py-4 text-center ">
                    {member.user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <RoleIndicator role={member.role}>
                      {member.role}
                    </RoleIndicator>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Assign members
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default MembersAssignForTaskGroup;
