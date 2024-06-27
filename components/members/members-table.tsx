import React from 'react';
import { EditMember } from '@/components/members/redirects';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RoleIndicator } from '../indicators';
import { fetch_members } from '@/data/members';
import { RoleGate } from '@/components/auth/role-gate';
import { Role } from '@prisma/client';

interface MembersTable {
    query: string;
    currentPage: number;
}

const MembersTable = async ({ query, currentPage }: MembersTable) => {
    const members = await fetch_members(currentPage);
    if (members === undefined) return <div>Loading...</div>;
    if ('error' in members) return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-red-500">Error: {members.error}</h2>
        </div>
    );
    return (
        <div className="flex flex-wrap">
            <div className="w-full mb-6 mx-auto">
                <div className=" flex flex-col break-words rounded-lg bg-slate-900">
                    <div className="relative flex flex-col break-words ">
                        {/* card header */}
                        {/*                         <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                            <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                <span className="mr-3 font-semibold text-dark">Members List</span>
                                <span className="mt-1 font-medium text-secondary-dark text-lg/normal">All members in the team</span>
                            </h3>
                            <div className="relative flex flex-wrap items-center my-2">
                                <a href="javascript:void(0)" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light">
                                    See other members
                                </a>
                            </div>
                        </div> */}
                        {/* end card header */}
                        {/* card body  */}
                        <div className="flex-auto block py-8 pt-6 px-9">
                            <div className="overflow-x-auto">
                                <table className="w-full my-0 align-middle text-dark ">
                                    <thead className="align-bottom">
                                        <tr className="font-semibold text-md ">
                                            <th className="pb-3 text-start min-w-[70px]">AVATAR</th>
                                            <th className="pb-3 text-center min-w-[120px]">NAME</th>
                                            <th className="pb-3 text-center min-w-[120px]">EMAIL</th>
                                            <th className="pb-3 text-center min-w-[100px]">ROLE</th>
                                            <th className="pb-3 text-center min-w-[100px]">JOIN DATE</th>
                                            <th className="pb-3 text-center min-w-[100px]">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member, index) => (
                                            <tr key={index} className='py-8 h-12'>
                                                <td >
                                                    <div className="flex items-center">
                                                        <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                            <Avatar className="h-10 w-10">
                                                                {
                                                                    member.user.image ? (
                                                                        <AvatarImage src={member.user.image} alt="Icon user" />
                                                                    ) : (
                                                                        <AvatarFallback>{
                                                                            member.user.name?.[0] === null ? member.user.email?.[0] : member.user.name?.[0]
                                                                        }</AvatarFallback>
                                                                    )
                                                                }
                                                            </Avatar>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="font-semibold ">{member.user.name}</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="font-semibold ">{member.user.email}</span>
                                                </td>
                                                <td className="text-center">
                                                    <RoleIndicator role={member.role} shadow={true}>{member.role}</RoleIndicator>
                                                </td>
                                                <td className=" text-center">
                                                    {/*            <span className="font-semibold">{member.joinDate}</span> */}
                                                </td>
                                                <td className=" text-center">
                                                    {
                                                        member.role === Role.OWNER ? (
                                                            <h2 className="text-red-500">Not allowed</h2>
                                                        ) : (
                                                            <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]} onlyIcon={true} >
                                                                <div className="flex items-center gap-4 justify-center">
                                                                    <EditMember user_id={member.user.id} project_id={member.project_id} />
                                                                </div>
                                                            </RoleGate>
                                                        )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* end card body */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersTable;
