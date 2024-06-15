import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
export default function Page() {
    return (
        <CardWrapper
            headerLabel="403"
            backButtonLabel="Back to dashboard"
            backButtonHref="/dashboard"
        >
            <FormError message="Your role does not have access to the page" />
        </CardWrapper>
    )
}