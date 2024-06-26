'use client';
import { useFormState } from 'react-dom';
import type { State } from '@/schemas/member';
import { Role } from '@prisma/client';
import { send_invitation } from '@/actions/invitations';


export default function Form() {

    const initialState: State = {
        errors: {
            email: [],
            role: [],
        },
        message: null,
    };
    const [state, dispatch] = useFormState(send_invitation, initialState);
    //not permit admin permission
    const roles = Object.keys(Role).filter((role) => role !== Role.OWNER);
    return (
        <form action={dispatch} className="w-full rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6">
            {/* TO EMAIL INVITE*/}
            <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-xl font-medium">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name='email'
                    className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                    aria-describedby="email-error"
                />
                {state.errors?.email && (
                    <div
                        aria-live="polite"
                        className="mt-2 text-md text-red-500"
                    >
                        {state.errors.email.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
            {/*Select Role*/}
            <div className="mb-4">
                <label htmlFor="role" className="mb-2 block text-xl font-medium">
                    Role
                </label>
                <select
                    id="role"
                    name='role'
                    className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                    aria-describedby="role-error"
                >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
                {state.errors?.role && (
                    <div
                        aria-live="polite"
                        className="mt-2 text-md text-red-500"
                    >
                        {state.errors.role.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex gap-4 item-center'>
                {/* Submit Button */}
                <button type="submit" className="capitalize bg-blue-500 text-white mt-2 px-4 py-2 rounded-md">
                    Send invitation
                </button>
                {state.message && (
                    <div
                        className="mt-2 text-md text-red-500"
                        aria-live='polite'
                    >
                        {state.message}
                    </div>
                )}
            </div>
        </form>

    );

}
