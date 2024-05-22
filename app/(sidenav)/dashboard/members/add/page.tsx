import Form from "@/components/members/add-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { lusitana } from "@/components/fonts";

export default async function Page() {

    return (
        <main>
            <div className="flex flex-col items-start justify-between">
                <Breadcrumbs breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Members', href: '/dashboard/members', active: true },
                    {
                        label: "Create Task",
                        href: "/dashboard/members/add",
                        active: true,
                    }
                ]}
                />
                <h1 className={`${lusitana.className} capitalize mb-4 text-xl md:text-2xl`}>
                    Add a member
                </h1>
            </div>
            <div className="h-full flex flex-col items-center justify-between">
                <Form />
            </div>
        </main>
    );
}
