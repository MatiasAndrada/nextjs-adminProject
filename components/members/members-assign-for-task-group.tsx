/* "use client";

import React from 'react'; */
import { assign_member_to_task_group } from "@/actions/members";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FormError } from "@/components/form-error";
import { fetch_members, fetch_members_assigned_to_task_group } from "@/data/members";
/* import { Button } from "../ui/button"; */

const MembersAssignForTaskGroup = async ({ id }: { id: string }) => {

    const membersAssigned = await fetch_members_assigned_to_task_group(id);
    if (!membersAssigned) return null;

    return (
        <>
            {
                membersAssigned.length === 0 ? (
                    <div className="w-fit mx-auto ">

                        <FormError message="No members assigned to this task group." />
                    </div>
                ) : null

            }
            <form
                className="relative overflow-x-auto shadow-md sm:rounded-lg"
                action={assign_member_to_task_group}>
                <input type="hidden" name="id" value={id} />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="p-4">
                                <div className="flex items-center">
                                    {/*                                 <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label> */}
                                </div>
                            </th>
                            <th className="text-start min-w-[70px]">AVATAR</th>
                            <th className="text-center min-w-[120px]">NAME</th>
                            <th className="text-center min-w-[120px]">EMAIL</th>
                            <th className="text-center min-w-[100px]">ROLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            membersAssigned.map((member) => (
                                <tr key={member.user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${member.user.id}`}
                                                type="checkbox"
                                                name="selectedIds"
                                                value={member.user.id}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor={`checkbox-table-search-${member.user.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-start">
                                        <Avatar className="w-10 h-10">
                                            {
                                                member.user.image ? (
                                                    <AvatarImage src={member.user.image} alt="Icon user" />
                                                ) : (
                                                    <AvatarFallback>{member.user.name?.[0]}</AvatarFallback>
                                                )
                                            }
                                        </Avatar>
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{member.user.name}</td>
                                    <td className="px-6 py-4 text-center">{member.user.email}</td>
                                    <td className="px-6 py-4 text-center">{member.role}</td>
                                </tr>
                            ))
                        }
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
        </>
    );
};

export default MembersAssignForTaskGroup;
