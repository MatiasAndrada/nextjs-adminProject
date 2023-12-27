'use client'
import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation'

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { LoginButton } from '@/app/ui/buttons-auth';
import { ArrowRightIcon, } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useSession, signIn } from 'next-auth/react'
import { set } from 'zod';


export default function LoginForm() {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const [email, setEmail] = useState('')
  /*   const [provider, setProvider] = useState('google') */

  const providers = [
    { name: 'google' },
  ]

  if (status === 'loading') return <div>Loading...</div>

  if (session) {
    setTimeout(() => {
      push('/dashboard')
    }, 5000)

    return (
      <div className="bg-yellow-200 text-yellow-800 p-4 rounded-lg">
        <div className="flex items-center">
          <ExclamationCircleIcon className="h-5 w-5 mr-2" />
          <p className="font-medium">You are already signed in</p>
        </div>
      </div>
    )
  }

  const handleLogin = async () => {

    const res = await signIn('email', {
      email,
      redirect: false,
    });
    console.log(res);

  }

  return (
    <div className='
      flex flex-col
      space-y-3
      rounded-lg
      bg-gray-50
      px-6 pb-4 pt-8
    '>

      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

        </div>
        <button
          className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4 py-2 text-sm font-medium"
          onClick={() => {
            handleLogin()
          }}
        >
          <ArrowRightIcon className="h-6 w-6 mr-2" />
          <span>Continue with Email</span>
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => {
            signIn('google', {
              redirect: true,
            })
          }
          }>
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">
            <title>Google-color</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path>
                  <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path>
                  <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path>
                  <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path>
                </g>
              </g>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

      </div>
    </div >
  );
} 
