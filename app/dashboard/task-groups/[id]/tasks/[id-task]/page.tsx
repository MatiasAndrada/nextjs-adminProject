/* import { useEffect, Suspense } from 'react'; */
/* import Search from '@/components/search';
import { lusitana } from '@/components/fonts';
import { tasks } from '@/lib/placeholder-data';
 */
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Task Details | Dashboard',
};

export default async function Page() {
    const mockTask = {
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
    const { task_id, task_group_id, name, description, status, progress, created_at, updated_at, ends_at, history_changes, messages } = mockTask;

    return (
        <div className="w-full">
            <Breadcrumbs breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Task Groups', href: '/dashboard/task-groups', active: true },
                {
                    label: 'Tasks of Task Group',
                    href: `/dashboard/task-groups/${task_group_id}`,
                    active: true,
                },
                {
                    label: 'Task Details',
                    href: `/dashboard/task-groups/${task_group_id}/tasks/${task_id}`,
                    active: true,
                },
            ]}
            />
            <div className="flex w-full items-center justify-between">
                <h1 className='text-2xl'>{name}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 ">
                <div className='flex flex-col gap-1'>
                    <h2 className="mb-2 text-xl font-bold ">Details</h2>
                    <p className="ml-4 mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Description:
                    </p>
                    <p className="text-sm font-medium max-h-64 overflow-y-auto">
                        {description}
                    </p>

                    {/*     
                    <p>Status: {status}</p>
                    <p>Progress: {progress}%</p>
                    <p>Created At: {created_at}</p>
                    <p>Updated At: {updated_at}</p>
                    <p>Ends At: {ends_at}</p> */}
                </div>
                <div>
                    <h2 className="text-xl font-bold">History</h2>
                    <ul>
                        {history_changes.map((change, index) => (
                            <li key={index}>{change}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-bold">Messages</h2>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Additional sections for task management (e.g., comments, attachments, etc.) */}
        </div>
    );
};
