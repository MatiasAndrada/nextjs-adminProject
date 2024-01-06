import Form from "@/components/invoices/create-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetchCustomers } from "@/lib/data";

//route para crear nuevas facturas

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Create Invoice",
                        href: "/dashboard/invoices/create",
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
