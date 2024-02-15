"use client";
import React from 'react'

const DropdownMoreActions = () => {
    return (
        <div>
            <main className=" p-2 text-zinc-700 dark:text-white flex items-center justify-center">
                <button
                    className="z-40 relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-gray-200 dark:bg-slate-800  gap-2 rounded-lg border border-zinc-200">
                    <span>
                        More Actions
                    </span>
                    <svg className="rotate-90 group-focus:rotate-180" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                    </svg>
                    <div
                        className="absolute shadow-lg -bottom-40 left-0 w-full h-max p-2 bg-gray-200 dark:bg-slate-800  border-zinc-200 rounded-lg flex flex-col gap-2">
                        <span className="flex flex-row gap-2 items-center hover:slate-200 hover:bg-slate-300 hover:dark:bg-slate-950 p-2 rounded-lg">
                            <p>Rename</p>
                        </span>
                        <span className="flex flex-row gap-2 items-center hover:bg-slate-300 hover:dark:bg-slate-950 p-2 rounded-lg">

                            <p>Update</p>
                        </span>
                        <span className="flex flex-row gap-2 items-center hover:bg-slate-300 hover:dark:bg-slate-950 p-2 rounded-lg">

                            <p>Delete</p>
                        </span>
                    </div>
                </button>
            </main>
        </div >
    )
}

export default DropdownMoreActions