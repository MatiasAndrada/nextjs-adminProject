'use client';
import { useFormState } from 'react-dom';
import type { State } from '@/schemas/task';
import { create_task } from '@/actions/task';


export default function Form({ task_groups_names_and_ids }: { task_groups_names_and_ids: { id: string, name: string }[] }) {
    const initialState: State = {
        message: null, errors: {}
    };
    const [state, dispatch] = useFormState(create_task, initialState);

    return (
        <form action={dispatch} className="w-full rounded-md bg-gray-200 dark:bg-slate-950 p-4 md:p-6">
            {/* Task Group Name */}
            <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-xl font-medium">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name='name'
                    className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                    aria-describedby="name-error"
                />
                {state.errors?.name && (
                    <div
                        aria-live="polite"
                        className="mt-2 text-md text-red-500"
                    >
                        {state.errors.name.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Task Description */}
            <div className="mb-4">
                <label htmlFor="description" className="mb-2 block text-xl font-medium">
                    Description
                </label>
                <textarea
                    id="description"
                    className="peer block w-full h-fit  rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    name='description'
                    defaultValue=""
                    aria-describedby="description-error"
                />
                {
                    state.errors?.description && (
                        <div
                            className="mt-2 text-md text-red-500"
                            aria-live='polite'
                        >
                            {state.errors.description.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )
                }
            </div>
            {/*Select Task Group Dropdown*/}
            <div className="mb-4">
                <label htmlFor="task-group" className="mb-2 block text-xl font-medium">
                    Task Group
                </label>
                <select
                    id="task-group"
                    name='task_group_id'
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-gray-300"
                    defaultValue=""
                    aria-describedby="task-group-error"
                >
                    <option value="" disabled hidden>
                        Select a Task Group
                    </option>
                    {task_groups_names_and_ids.map((task_group: {
                        id: string, name: string
                    }) => (
                        <option key={task_group.id} value={task_group.id}>
                            {task_group.name}
                        </option>
                    ))}
                </select>
                {
                    state.errors?.task_group_id && (
                        <div
                            className="mt-2 text-md text-red-500"
                            aria-live='polite'
                        >
                            {state.errors.task_group_id.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )
                }
            </div>

            {/* Submit Button */}
            <button type="submit" className="capitalize bg-blue-500 text-white mt-2 px-4 py-2 rounded-md">
                Create task group
            </button>
        </form>

    );

}
