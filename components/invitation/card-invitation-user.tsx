import { Button } from "../ui/button"
import { fetch_invitations_of_user } from "@/data/invitations"
import { InviteToken } from "@prisma/client"

export async function CardsInvitation() {
    const invitations = await fetch_invitations_of_user()
    return (<>
            {invitations.length === 0 && <InvitationsNotFound /> }
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

    const { project_id, email, role, expires } = invitation

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
                <li className="text-md ">Project: <span className="text-black dark:text-white font-bold text-lg">{role}</span></li>
                {/*      <li>Invite From: {email_owner}</li> */}
                <li>Invite Expires in  {expiresHours} hs</li>
            </ul>
            {/*                 )
            } */}
            <div className="flex justify-around">
                <Button
                /* disabled={cardLoading} */
                /* onClick={() => handleInviteResponse(String(invite._id), "PUT")} */

                >Accept</Button>
                <Button
                    /*  disabled={cardLoading} */
                    /*                     onClick={() => handleInviteResponse(String(invite._id), "DELETE")} */
                    variant="destructive"

                >Reject</Button>
            </div>
        </div>
    )
}

export function InvitationsNotFound() {
    return (
        <div className="w-full mx-auto text-center py-10">
            <h2 className="text-lg">No invitations found.</h2>
        </div>
    )
}