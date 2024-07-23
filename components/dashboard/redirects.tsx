import Link from "next/link";
//components
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
//icons

export function CreateProject() {
  return (
    <Button className="w-full">
      <Link href="/projects/create" className="flex">
        <PlusIcon className="mr-2 w-5" />
        <span>Create Project</span>
      </Link>
    </Button>
  );
}

export function UpdateProject({ id }: { id: string }) {
  return (
    <Link
      href={`/projects/${id}/edit`}
      className="rounded-md border p-2 hover:bg-slate-300"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
