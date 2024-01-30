'use client';
import Link from 'next/link';
import {
    PhoneIcon,
    EnvelopeIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/button';
import { useFormState } from 'react-dom';
import { createCustomer } from '@/actions/customers';
import PhoneInput from 'react-phone-number-input';
/* import { Customer } from "../../lib/definitions" */
import 'react-phone-number-input/style.css'

export default function Form() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createCustomer, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter name:
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="string"
                                step="0.01"
                                placeholder="Enter name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state.errors?.name ? (
                            <div
                                id="name-error"
                                aria-live="polite"
                                className="mt-2 text-sm text-red-500"
                            >
                                {state.errors.name.map((error: string) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                {/* Customer email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Enter email:
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                step="0.01"
                                placeholder="Enter email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                            />
                            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state.errors?.email ? (
                            <div
                                id="email-error"
                                aria-live="polite"
                                className="mt-2 text-sm text-red-500"
                            >
                                {state.errors.email.map((error: string) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                {/* Customer phone */}
                <div className="mb-4">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Enter phone number:
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <PhoneInput
                                id="phone"
                                name="phone"
                                type="phone"
                                onChange={(e) => console.log(e)}
                                step="0.01"
                                placeholder="Enter phone number"
                                aria-describedby="phone-error"
                            />
                        </div>
                        {state.errors?.phone ? (
                            <div
                                id="phone-error"
                                aria-live="polite"
                                className="mt-2 text-sm text-red-500"
                            >
                                {state.errors.phone.map((error: string) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/dashboard/customers"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <Button type="submit">Create Customer</Button>
                </div>
            </div>
        </form>
    );
}
