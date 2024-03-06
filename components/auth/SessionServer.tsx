import React from 'react'
import { auth } from '@/auth';
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export async function SessionServer() {
    const session = await auth();
    if (session) {
        return (
            <CheckIcon className="w-6 h-6 text-green-500" />
        )
    } else {
        return (
            <XMarkIcon className="w-6 h-6 text-red-500" />
        )
    }
}

