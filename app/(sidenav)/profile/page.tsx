import React from 'react'
import UserUpload from '@/components/profile/user-upload-avatar'
import UserUpdateInformation from '@/components/profile/user-update-information'
import AccountsLinked from '@/components/profile/accounts-linked'
import Notifications from '@/components/profile/notifications'
import EmailNotifications from '@/components/profile/email-notifications'
import Sessions from '@/components/profile/sessions'
//TODO: Socials account linked, password change, email change, delete account, alerts & notifications, email notifications, language, timezone, sessions 
import { lusitana } from '@/components/fonts'



export default function Page() {


    return (
        <main className='space-y-2'>
            <h1 className={`${lusitana.className} text-4xl `}>Profile page</h1>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-6 gap-8">
                <div className='col-span-2 row-span-2'>
                    <UserUpload />
                </div>
                <div className='col-span-4 row-span-3 '>
                    <UserUpdateInformation />
                </div>
                <div className='col-span-2 '>
                    <AccountsLinked />
                </div>
                <div className='col-span-3 row-span-2'>
                    <Notifications />
                </div>
                <div className='col-span-3 row-span-2'>
                    <EmailNotifications />
                </div>
            </div>
        </main>
    )
}