import Link from "next/link";
import { Button } from "../ui/button";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

export function CreateTask() {
  return (
    <Link href="/dashboard/tasks/create">
      <Button>
        <PlusIcon className="h-5 mr-2" />
        <span>Create Task</span>
      </Button>
    </Link>
  );
}

export function EditTask({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/task/${id}/edit`}>
      <Button>
        <PencilIcon className="w-7 hover:scale-110 text-slate-300 hover:text-white transition duration-300 ease-in-out transform" />
      </Button>
    </Link>
  );
}
