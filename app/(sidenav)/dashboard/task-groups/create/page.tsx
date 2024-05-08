import Form from "@/components/task-group/create-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { lusitana } from "@/components/fonts";


export default function Page() {

    return (
        <main>
            <div className="flex flex-col items-start justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Tasks Group", href: "/dashboard/task-groups" },
                        {
                            label: "Create Task Group",
                            href: "/dashboard/task-groups/create",
                            active: true,
                        },
                    ]}
                />
                <h1 className={`${lusitana.className} capitalize mb-4 text-xl md:text-2xl`}>
                    Create new task group
                </h1>
            </div>
            <div className="h-full flex flex-col items-center justify-between">
                <Form />
            </div>
        </main>
    );
}
