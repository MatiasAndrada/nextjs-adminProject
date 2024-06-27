"use client"
import { useFormState } from 'react-dom';
import { Criticality } from '@prisma/client';
import { Button } from '../ui/button';
import { update_task_group } from '@/actions/task-group';
import type { State } from '@/schemas/task-group';
import type { TaskGroup } from "@prisma/client"

export default function EditTaskGroupForm({ taskGroup }: { taskGroup: TaskGroup }) {
    const initialState: State = { message: null, errors: {} }

    const [state, dispatch] = useFormState(update_task_group, initialState)

    return (
        <form action={dispatch} className="w-full rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6">
            <input type="hidden" name="id" value={taskGroup.id} />
            {/* Task Group Name */}
            <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-xl font-medium">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name='name'
                    className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={taskGroup.name}
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
                    Description:
                </label>
                <textarea
                    id="description"
                    className="peer block w-full h-fit  rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    name='description'
                    defaultValue={taskGroup.description ? taskGroup.description : ""}
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
            {/* Task Group Criticality Dropdown from Type enum*/}
            <div className="mb-4">
                <label htmlFor="criticality" className="mb-2 block text-xl font-medium">
                    Criticality
                </label>
                <select
                    id="criticality"
                    name='criticality'
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-gray-300"
                    defaultValue={taskGroup.criticality}
                    aria-describedby="criticality-error"
                >
                    <option value="" disabled hidden>
                        Select Criticality
                    </option>
                    <option value={Criticality.LOW} className='text-criticality-low '>Low</option>
                    <option value={Criticality.MEDIUM} className='text-criticality-medium '>Medium</option>
                    <option value={Criticality.HIGH} className='text-criticality-high '>High</option>
                    <option value={Criticality.CRITICAL} className='text-criticality-critical '>Critical</option>
                </select>
                {
                    state.errors?.criticality && (
                        <div
                            className="mt-2 text-md text-red-500"
                            aria-live='polite'
                        >
                            {state.errors.criticality.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )
                }
            </div>

            {/* Submit Button */}
            <Button type="submit" >
                Updated task group
            </Button>
        </form>
    )
}