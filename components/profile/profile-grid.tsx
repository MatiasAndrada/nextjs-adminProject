import UserUpload from '@/components/profile/grid-items/user-upload-avatar'
import UserUpdateInformation from '@/components/profile/grid-items/user-update-information'
import AccountsLinked from '@/components/profile/grid-items/accounts-linked'
import Notifications from '@/components/profile/grid-items/notifications'
import EmailNotifications from '@/components/profile/grid-items/email-notifications'
import Sessions from '@/components/profile/grid-items/sessions'

export default function ProfileGrid() {
    return (
        <div className="w-full grid items-center grid-cols-1 lg:grid-cols-2 2xl:grid-cols-6 gap-4">
            <div className='col-span-2 row-span-1'>
                <UserUpload />
            </div>
            <div className='col-span-4 row-span-3 '>
                <UserUpdateInformation />
            </div>
            <div className='col-span-2 row-span-2'>
                <AccountsLinked />
            </div>
            <div className='col-span-2 row-span-2'>
                <Notifications />
            </div>
            <div className='col-span-2 row-span-2'>
                <EmailNotifications />
            </div>
            <div className='col-span-2 row-span-2'>
                <Sessions />
            </div>
        </div>
    )
}