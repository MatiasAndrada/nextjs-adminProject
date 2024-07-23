import Link from "next/link";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

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
