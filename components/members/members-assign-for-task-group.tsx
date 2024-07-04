/* "use client";

import React from 'react'; */
import { assign_member_to_task_group } from "@/actions/members";
/* import { Button } from "../ui/button"; */

const MembersAssignForTaskGroup = ({ id }: { id: string }) => {
    const products = [
        {
            id: "1",
            avatar: 'https://via.placeholder.com/50',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
        },
        {
            id: "2",
            avatar: 'https://via.placeholder.com/50',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
        },
        // Agrega el resto de productos aquí
    ];

    return (
        <form
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
            action={assign_member_to_task_group}
        /*             onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        const selectedIds = formData.getAll('selectedIds');
                        console.log('Selected IDs:', selectedIds);
                    }} */
        >
            <input type="hidden" name="id" value={id} />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                /*                                     onChange={(e) => {
                                                                        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="selectedIds"]');
                                                                        checkboxes.forEach((checkbox) => {
                                                                            (checkbox as HTMLInputElement).checked = e.target.checked;
                                                                        });
                                                                    }} */
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th className="text-start min-w-[70px]">AVATAR</th>
                        <th className="text-center min-w-[120px]">NAME</th>
                        <th className="text-center min-w-[120px]">EMAIL</th>
                        <th className="text-center min-w-[100px]">ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${product.id}`}
                                        type="checkbox"
                                        name="selectedIds"
                                        value={product.id}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`checkbox-table-search-${product.id}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-start">
                                {/*  <img src={product.avatar} alt="Avatar" className="w-10 h-10 rounded-full" /> */}
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                            <td className="px-6 py-4 text-center">{product.email}</td>
                            <td className="px-6 py-4 text-center">{product.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*             <div className="flex justify-end mt-4"> */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Assign members
            </button>
            {/*             </div> */}
        </form>
    );
};

export default MembersAssignForTaskGroup;
