import Form from "@/components/invoices/create-form";
import Breadcrumbs from "@/components/breadcrumbs";
//import { getServerSession } from "next-auth";
//import { authOptions } from "@/lib/auth/auth-DEPRECATED";

export default async function Page() {

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
            {/*<Form user_id={user_id} />*/}
        </main>
    );
}
