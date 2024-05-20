"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { useCurrentProjectStore } from '@/context/currentProjectStore';
import type { Project } from "@prisma/client";

interface DropDownProps {
    name: string;
    createName: string;
    selectedItem: Project | null;
    items?: Project[] | null;
}
export function DropDown({ name, createName, selectedItem, items }: DropDownProps) {
    const router = useRouter();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { project, setProject, setDefaultProject } = useCurrentProjectStore((state) => state);

    //refs
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    const selectProject = async (project: Project) => {
        await setProject(project);
        setDropdownOpen(false);
    };

    async function selectDefaultProject() {
        await setDefaultProject();
        setDropdownOpen(false);
    }

    useEffect(() => {
        if (selectedItem !== null) {
            setProject(selectedItem);
        }

        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownButtonRef.current &&
                !dropdownButtonRef.current.contains(event.target as Node) &&
                dropdownMenuRef.current &&
                !dropdownMenuRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative inline-block mx-2 text-left z-50">
            <button
                ref={dropdownButtonRef}
                onClick={toggleDropdown}
                className="select-none inline-flex justify-center w-full px-3 py-2 text-sm font-medium  bg-white hover:bg-slate-100 dark:bg-slate-950 border dark:hover:bg-slate-800 border-black dark:border-white  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
                {project !== null ? ` ${project?.name}` : `Select ${name}`}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ml-1 transition-transform transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                ref={dropdownMenuRef}
                className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-slate-200 dark:bg-slate-950 ring-1 ring-black ring-opacity-5 transition-opacity ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {
                    items?.length && project !== null && <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        <button
                            className="block px-4 py-2 text-sm  hover:bg-gray-300 dark:hover:bg-slate-800 rounded-lg"
                            role="menuitem"
                            onClick={selectDefaultProject}
                        >
                            Select none
                        </button>
                    </div>
                }
                <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                    {items?.map((item: Project) => {
                        return <button
                            key={item.id}
                            onClick={() => selectProject(item)}
                            className="block px-4 py-2 text-sm  hover:bg-gray-300 dark:hover:bg-slate-800 rounded-lg"
                            role="menuitem"
                        >
                            {item.name}
                        </button>
                    }
                    )}

                </div>
                <button className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => router.push(`/projects/create`)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block -mb-1 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {`Create ${createName}`}
                </button>
            </div>
        </div >
    );
}

export default DropDown;
