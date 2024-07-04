import { Button } from "../ui/button"
import { fetch_invitations_of_project } from "@/data/invitations"
import { InviteToken } from "@prisma/client"


export async function CardsInvitation() {
    const invitations = await fetch_invitations_of_project()
    return (
        <>
            {invitations.length === 0 && <InvitationsNotSent />}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    invitations.map((invite) => (
                        <CardInvitation key={invite.id} invitation={invite} />
                    ))
                }
            </div>
        </>
    )
}

export function CardInvitation({ invitation }: { invitation: InviteToken }) {

    const { email, role, expires } = invitation

    const expiresHours = Math.floor((expires.getTime() - new Date().getTime()) / 3600000)


    return (
        <div className="bg-slate-100 dark:bg-slate-900 text-gray-500 dark:text-slate-300 shadow-xl rounded-lg p-4">
            {/*  {
                cardLoading ? (
                    <div className="py-10 text-center">
                        Processing...
                    </div>
                ) : ( */}
            <ul className="mb-4 leading-loose">
                <li className="text-md ">With the role of: <span className="text-black dark:text-white font-bold text-lg">{role}</span></li>
                <li>Invitation to: <span className="text-white">{email}</span></li>
                <li>Invitation expires in:  <span className="text-white">{expiresHours} hs</span> </li>
            </ul>
            {/*                 )
            } */}
            <div className="flex justify-around">

                <Button
                    /*  disabled={cardLoading} */
                    /*                     onClick={() => handleInviteResponse(String(invite._id), "DELETE")} */
                    variant="destructive"

                >Cancel</Button>
            </div>
        </div>
    )
}

export function InvitationsNotSent() {
    return (
        <div className="w-full mx-auto text-center py-10">
            <h2 className="text-lg">No invitations sent.</h2>
        </div>
    )
}