import { useEffect, Suspense } from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth/auth';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { tasks } from '@/app/lib/placeholder-data';

export type Task = {
    task_id: string;
    task_group_id: string;
    user_id: string;
    owner_id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    created_at: string;
    updated_at: string;
    ends_at: string;
    history_changes?: string[]; // Assuming history_changes is an array of strings
    messages?: string[]; // Assuming messages is an array of strings
};

export const metadata: Metadata = {
    title: 'Task Details | Dashboard',
};

export default async function Page() {
    const mockTask: Task = {
        task_id: '1',
        task_group_id: '123',
        user_id: 'user123',
        owner_id: 'owner123',
        name: 'Sample Task',
        description: 'This is a sample task description.',
        status: 'In Progress',
        progress: 50,
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        ends_at: '2023-02-01',
        history_changes: ['Changed description', 'Updated status'],
        messages: ['Message 1', 'Message 2'],
    };
    const task = mockTask;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>{task?.name}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <div>
                    <h2 className="text-xl font-bold">Details</h2>
                    <p>Description: {task?.description}</p>
                    <p>Status: {task?.status}</p>
                    <p>Progress: {task?.progress}%</p>
                    <p>Created At: {task?.created_at}</p>
                    <p>Updated At: {task?.updated_at}</p>
                    <p>Ends At: {task?.ends_at}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">History</h2>
                    <ul>
                        {task?.history_changes?.map((change, index) => (
                            <li key={index}>{change}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-bold">Messages</h2>
                    <ul>
                        {task?.messages?.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Additional sections for task management (e.g., comments, attachments, etc.) */}
        </div>
    );
};
