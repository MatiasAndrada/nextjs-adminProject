"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
//components
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { AcceptInvite, DeclineInvite } from "@/components/invitation/buttons";
//actions
import { new_invitation } from "@/actions/invitations";
//types
import type { InviteToken } from "@prisma/client";
import type { Project } from "@prisma/client";
export const NewVerificationForm = () => {
  const [invitation, setInvitation] = useState<
    InviteToken & { project?: Project }
  >();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    new_invitation(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
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
          {!success && !error && <BeatLoader />}
          <FormSuccess message={success} />
          {invitation && token && (
            <>
              <h2 className="mt-4 text-lg font-base text-center">
                Invitation to join project: <br></br>
                <span className="font-semibold">
                  {invitation?.project?.name}
                </span>
              </h2>
              <p className="text-center font-base">
                With the role of: <br></br>
                <span className="font-semibold">{invitation?.role}</span>
              </p>
              <div className="mt-4 w-full flex justify-evenly">
                <AcceptInvite token={token} redirect="/invitation/accept" />
                <DeclineInvite token={token} redirect="/invitation/decline" />
              </div>
            </>
          )}
          {!success && <FormError message={error} />}
        </Suspense>
      </div>
    </CardWrapper>
  );
};
