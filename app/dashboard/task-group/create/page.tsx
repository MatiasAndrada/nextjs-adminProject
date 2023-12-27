import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/auth";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const user_id = session?.user?.id as string;
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Task Group", href: "/dashboard/task-group" },
                    {
                        label: "Create Task Group",
                        href: "/dashboard/task-group/create",
                        active: true,
                    },
                ]}
            />
            <Form user_id={user_id} />
        </main>
    );
}
