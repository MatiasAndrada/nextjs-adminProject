import Form from "@/components/customers/create-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetchCustomers } from "@/lib/data";

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
