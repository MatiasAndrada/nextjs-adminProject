import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BackRedirect } from "@/components/back-redirect";
import { FormError } from "@/components/form-error";
export default function Page() {
  return (
    <CardWrapper
      headerLabel="403 Forbidden"
      backButtonLabel="Back to dashboard"
      showSocial={false}
    >
      <div className="space-y-4">
        <FormError message="Your role does not have access to the page." />
        <BackRedirect />
      </div>
    </CardWrapper>
  );
}
