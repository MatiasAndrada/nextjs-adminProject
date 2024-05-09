"use client"
import { useFormState } from 'react-dom';
import type { State } from '@/schemas/project';
import type { Project } from "@prisma/client"
import { update_project } from '@/actions/projects';
export default function EditTaskGroupForm({ project }: { project: Project }) {

    const initialState: State = { message: null, errors: {} }

    const [state, dispatch] = useFormState(update_project, initialState)

    return (
        <form action={dispatch} className="w-full rounded-md bg-slate-300 dark:bg-slate-950 p-4 md:p-6">
            <input type="hidden" name="id" value={project.id} />
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
                    defaultValue={project.name}
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
                    defaultValue={project.description ? project.description : ""}
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


            {/* Submit Button */}
            <button type="submit" className="capitalize bg-blue-500 text-white mt-2 px-4 py-2 rounded-md">
                Updated task group
            </button>
        </form>
    )
}