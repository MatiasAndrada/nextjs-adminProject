"use client";
import { useState, useRef, useEffect } from 'react';
import { selectedProjectStore } from "@/store/selectedProject";
import type { Project } from "@prisma/client";

interface DropDownProps {
    name: string;
    createName: string;
    selectedItem: Project | null;
    items?: Project[] | null;
}
export function DropDown({ name, createName, selectedItem, items }: DropDownProps) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const selectedProject = selectedProjectStore((state: any) => state.project);
    const setSelectedProjectStore = selectedProjectStore((state: any) => state.setProject);
    const setSelectedDefaultProjectStore = selectedProjectStore((state: any) => state.setDefaultProject);

    //refs
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const selectProject = async (project: Project) => {
        await setSelectedProjectStore(project);
        setDropdownOpen(false);
    };

    async function selectDefaultProject() {
        await setSelectedDefaultProjectStore();
        setDropdownOpen(false);
    }

    useEffect(() => {
        if (selectedItem !== null) {
            setSelectedProjectStore(selectedItem);
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
        <div className="relative inline-block text-left z-50">
            <button
                ref={dropdownButtonRef}
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
                {selectedProject !== null ? `Selected ${selectedProject?.name}` : `Select ${name}`}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ml-2 -mr-1 transition-transform transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
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
                className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {
                    items?.length && selectedProject !== null && <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            {item.name}
                        </button>
                    }
                    )}

                </div>
                <button className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
