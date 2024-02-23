"use client";
import React, { useState, useEffect } from 'react';
import { updateSearchParams } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Criticality, Status } from '@prisma/client';

const Filter = () => {
    const router = useRouter();
    const [criticalityFilter, setCriticalityFilter] = useState({
        [Criticality.LOW]: false,
        [Criticality.MEDIUM]: false,
        [Criticality.HIGH]: false,
        [Criticality.CRITICAL]: false
    });

    const [statusFilter, setStatusFilter] = useState({
        [Status.PAUSED]: false,
        [Status.PENDING]: false,
        [Status.IN_PROGRESS]: false,
        [Status.COMPLETED]: false
    });


    const handleUpdateParams = () => {
        //criticality filter true 
        const criticality = Object.entries(criticalityFilter).filter(([key, value]) => value).map(([key, value]) => key).join(',');
        //status filter true
        const status = Object.entries(statusFilter).filter(([key, value]) => value).map(([key, value]) => key).join(',');
        //update search params
        router.push(updateSearchParams('criticality', criticality));
    };

    const handleResetCriticality = () => {
        setCriticalityFilter({
            [Criticality.LOW]: false,
            [Criticality.MEDIUM]: false,
            [Criticality.HIGH]: false,
            [Criticality.CRITICAL]: false
        });
    };

    const handleResetStatus = () => {
        setStatusFilter({
            [Status.PAUSED]: false,
            [Status.PENDING]: false,
            [Status.IN_PROGRESS]: false,
            [Status.COMPLETED]: false
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="relative w-fit">
            <button
                type="button"
                className="rounded bg-blue-600 px-5 py-3 text-xs font-medium active:scale-95"
                onClick={handleToggleModal}
            >
                Toggle Filters
            </button>
            {isModalOpen && (
                <div className="absolute top-30 right-50 mt-2 w-64 bg-slate-300 dark:bg-slate-900 border text-black dark:text-white border-gray-200 rounded-lg shadow-lg">
                    <form action="" className="flex border-t border-gray-200" onChange={handleUpdateParams}>
                        <fieldset className="w-full">
                            <legend className="block w-full px-5 py-3 text-xs font-medium">Criticality</legend>

                            <div className="space-y-2 px-5 py-6">
                                {Object.entries(Criticality).map(([key, value]) => (
                                    <div className="flex items-center" key={key}>
                                        <input
                                            id={value}
                                            type="checkbox"
                                            name={`criticalityFilter[${value}]`}
                                            className="h-5 w-5 rounded border-gray-300"
                                            checked={criticalityFilter[value]}
                                            onChange={() => setCriticalityFilter({ ...criticalityFilter, [value]: !criticalityFilter[value] })}
                                        />
                                        <label htmlFor={value} className="ml-3 text-sm font-medium capitalize">{value.toLowerCase()}</label>
                                    </div>
                                ))}
                                <div className="pt-2">
                                    <button type="button" className="text-xs underline p-2 bg-slate-600 hover:bg-slate-700 rounded-lg" onClick={handleResetCriticality}>Reset Criticality</button>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="w-full">
                            <legend className="block w-full px-5 py-3 text-xs font-medium">Status</legend>

                            <div className="space-y-2 px-5 py-6">
                                {Object.entries(Status).map(([key, value]) => (
                                    <div className="flex items-center" key={key}>
                                        <input
                                            id={value}
                                            type="checkbox"
                                            name={`statusFilter[${value}]`}
                                            className="h-5 w-5 rounded border-gray-300"
                                            checked={statusFilter[value]}
                                            onChange={() => setStatusFilter({ ...statusFilter, [value]: !statusFilter[value] })}
                                        />
                                        <label htmlFor={value} className="ml-3 text-sm font-medium capitalize">{value.toLowerCase()}</label>
                                    </div>
                                ))}
                                <div className="pt-2">
                                    <button type="button" className="text-xs underline p-2 bg-slate-600 hover:bg-slate-700 rounded-lg" onClick={handleResetStatus}>Reset Status</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <div className="">
                        <div className="flex justify-between border-t border-gray-200 px-5 py-3">
                            <button name="reset" type="button" className="rounded text-xs font-medium  underline">Reset All</button>
                            <button name="commit" type="button" className="rounded bg-blue-600 px-5 py-3 text-xs font-medium active:scale-95">Apply Filters</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filter;
