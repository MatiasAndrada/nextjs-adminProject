export default function MainDashboard() {
    return (
        <section className="col-span-2 p-2 my-2 dark:bg-gray-800 dark:text-gray-100">
            <div className="ml-10">
                <h3 className="text-xl font-bold ">
                    Project Name
                </h3>
                <p className="text-sm font-medium min-h-14">
                    Project Description
                </p>

            </div>
            <div className="mt-2">
                {/*                 <h3>TASK GROUPS STATE</h3> */}
                <div className="container p-2 mx-auto sm:p-4 dark:dark:text-gray-100">
                    <h2 className="mb-4 text-2xl font-semibold leadi">Task group status</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full  w-full text-xs">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead className="dark:dark:bg-gray-700">
                                <tr className="text-left">
                                    <th className="p-3">Id  #</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Progress</th>
                                    <th className="p-3">Updated At</th>
                                    <th className="p-3">Criticality</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900">
                                    <td className="p-3">
                                        <p>923</p>
                                    </td>
                                    <td className="p-3">
                                        <p>Microsoft Corporation</p>
                                    </td>
                                    <td className="py-3 text-sm" role="cell">
                                        <div className="mx-2 flex font-bold">
                                            <div
                                                className="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                                            >
                                                <div
                                                    className="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-red-400"
                                                    style={{ width: '45%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <p>date</p>
                                    </td>
                                    <td className="p-3">
                                        <span className="px-3 py-1 font-semibold rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900">

                                            <span>Medium</span>
                                        </span>
                                    </td>
                                </tr>
                                {/*                                 <tr className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900">
                                    <td className="p-3">
                                        <p>97412378923</p>
                                    </td>
                                    <td className="p-3">
                                        <p>Tesla Inc.</p>
                                    </td>
                                    <td className="p-3">
                                        <p>14 Jan 2022</p>
                                        <p className="dark:dark:text-gray-400">Friday</p>
                                    </td>
                                    <td className="p-3">
                                        <p>01 Feb 2022</p>
                                        <p className="dark:dark:text-gray-400">Tuesday</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <p>$275</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <span className="px-3 py-1 font-semibold rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900">
                                            <span>Pending</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900">
                                    <td className="p-3">
                                        <p>97412378923</p>
                                    </td>
                                    <td className="p-3">
                                        <p>Coca Cola co.</p>
                                    </td>
                                    <td className="p-3">
                                        <p>14 Jan 2022</p>
                                        <p className="dark:dark:text-gray-400">Friday</p>
                                    </td>
                                    <td className="p-3">
                                        <p>01 Feb 2022</p>
                                        <p className="dark:dark:text-gray-400">Tuesday</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <p>$8,950,500</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <span className="px-3 py-1 font-semibold rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900">
                                            <span>Pending</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900">
                                    <td className="p-3">
                                        <p>97412378923</p>
                                    </td>
                                    <td className="p-3">
                                        <p>Nvidia Corporation</p>
                                    </td>
                                    <td className="p-3">
                                        <p>14 Jan 2022</p>
                                        <p className="dark:dark:text-gray-400">Friday</p>
                                    </td>
                                    <td className="p-3">
                                        <p>01 Feb 2022</p>
                                        <p className="dark:dark:text-gray-400">Tuesday</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <p>$98,218</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <span className="px-3 py-1 font-semibold rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900">
                                            <span>Pending</span>
                                        </span>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
