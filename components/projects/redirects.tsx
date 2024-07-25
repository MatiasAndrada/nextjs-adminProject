import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

export function CreateProject() {
  return (
    <Link href="/projects/create">
      <Button>
        <PlusIcon className="h-5 mr-2" />
        <span> Create Project</span>
      </Button>
    </Link>
  );
}

export async function ViewProject({ children }: { children: React.ReactNode }) {
  return <Link href={`/dashboard`}>{children}</Link>;
}

export function EditProject({ id }: { id: string }) {
  return (
    <Link href={`/projects/${id}/edit`}>
      <Button variant="ghost">
        <PencilIcon className="w-4 h-4 mr-2" />
        <p>Update</p>
      </Button>
    </Link>
  );
}
