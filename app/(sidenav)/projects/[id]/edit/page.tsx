import Form from '@/components/projects/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { fetch_project_by_id } from "@/actions/projects"
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const projects = await fetch_project_by_id(id);
    console.log("🦇  Page  projects:", projects)

    if (!projects) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Projects', href: '/projects' },
                    {
                        label: 'Edit Project',
                        href: `/dashboard/project/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form project={projects} />
        </main>
    );
}