"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
//components
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
//actions
import { new_invitation, accept_invitation, decline_invitation } from "@/actions/invitations";
//types
import type { InviteToken } from "@prisma/client";
import type { Project } from "@prisma/client";
export const NewVerificationForm = () => {
    const [invitation, setInvitation] = useState<InviteToken & { project?: Project }>();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    if (!token) {
        setError("Missing token!");
        return;
    }

    const onSubmit = useCallback(() => {
        console.log("cb")
        if (success || error) return;
        console.log("cb2")
        new_invitation(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
                setInvitation(data.invitation);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);


    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your invitation"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex flex-col items-center w-full justify-center">
                <Suspense fallback={<BeatLoader />}>
                    {!success && !error && (
                        <BeatLoader />
                    )}
                    <FormSuccess message={success} />
                    {invitation && (
                        <>
                            <h2 className="mt-4 text-lg font-base text-center">Invitation to join project:  <br>
                            </br><span className="font-semibold">{invitation?.project?.name}</span></h2>
                            <p className="text-center font-base">With the role of: <br></br><span className="font-semibold">{invitation?.role}</span></p>
                            <div className="mt-4 w-full flex justify-evenly">
                                <Button
                                    onClick={() => accept_invitation(token)}
                                >Accept</Button>
                                <Button
                                    onClick={() => decline_invitation(token)}
                                    variant="destructive"
                                >Decline</Button>
                            </div>
                        </>
                    )}
                    {!success && (
                        <FormError message={error} />
                    )}
                </Suspense>
            </div >
        </CardWrapper >
    );
};
