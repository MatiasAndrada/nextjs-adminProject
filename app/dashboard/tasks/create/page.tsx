import Form from "@/components/tasks/create-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { lusitana } from "@/components/fonts";
//import { getServerSession } from "next-auth";
//import { authOptions } from "@/lib/auth/auth-DEPRECATED";

export default async function Page() {

    return (
        <main>
            <div className="flex flex-col items-start justify-between">
                <Breadcrumbs breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Tasks', href: '/dashboard/tasks', active: true },
                    {
                        label: "Create Task",
                        href: "/dashboard/tasks/create",
                        active: true,
                    }
                ]}
                />
                <h1 className={`${lusitana.className} capitalize mb-4 text-xl md:text-2xl`}>
                    Create new task
                </h1>
            </div>
            <div className="h-full flex flex-col items-center justify-between">
                <Form />
            </div>
        </main>
    );
}
