import Link from "next/link";
//components
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
//icons

export function UpdateProject({ id }: { id: string }) {
  return (
    <Link href={`/projects/${id}/edit`}>
      <Button>
        <PencilIcon className="w-7 hover:scale-110 text-slate-300 hover:text-white transition duration-300 ease-in-out transform" />
      </Button>
    </Link>
  );
}
