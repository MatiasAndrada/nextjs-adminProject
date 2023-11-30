import Form from "@/app/ui/customers/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

//route para crear nuevas facturas

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Customers", href: "/dashboard/customers" },
                    {
                        label: "Create Customers",
                        href: "/dashboard/customers/create",
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}
