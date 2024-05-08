import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { currentUser } from '@/hooks/use-current-user'

export default async function Page() {
    const user = await currentUser()
    if (!user) return null
    const { name, email, image } = user
    const initialLetters = name?.split(' ').map((n) => n[0]) ?? ''

    return (
        <div className=' p-4 h-full flex flex-row items-center justify-between gap-2 bg-slate-300 dark:bg-gray-900 rounded-lg'>
            <Avatar className='w-20 h-20'>
                {image ? (
                    <AvatarImage src={image} alt={"user avatar"} />
                ) : (
                    <AvatarFallback>{initialLetters}</AvatarFallback>
                )}
            </Avatar>
            <div className='space-y-2'>
                <div>
                    <h1 className='text-3xl'>{name}</h1>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Change you avatar</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
                    </input>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG (MAX. 800x400px).</p>
                </div>
            </div>
        </div>
    )
}