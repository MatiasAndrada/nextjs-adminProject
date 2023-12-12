'use client'
import { lusitana } from '@/app/ui/fonts';
import { Button } from './button';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { Sign_up } from '@/app/lib/actions';
import PhoneInput from 'react-phone-number-input';

export default function SignUpForm() {
    const initialState = { message: null, errors: {} }
    //const [state, dispatch] = useFormState(Sign_up, initialState);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Please sign up in to continue.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    minLength={6}
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* <LoginButton />*/}
                    <div className="flex h-8 items-end space-x-1">
                        {state === 'CredentialsSignIn' && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                <span className="text-xs text-red-500">
                                    Credenciales invalidas
                                </span>
                            </>
                        )}
                    </div>
                </div>
        </form>
    )
}

{/*
function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
*/}
