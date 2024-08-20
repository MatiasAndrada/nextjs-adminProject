"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { delete_project_by_id } from "@/actions/projects";

export function ButtonDeleteProject({ id }: { id: string }) {
  async function handleDelete() {
    await delete_project_by_id(id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
        }
      })
      .catch((error) => {
        toast.error("An unexpected error occurred.");
        console.error(error);
      });
  }
  return (
    <Button variant="ghost" onClick={() => handleDelete()}>
      <TrashIcon className=" text-red-500 w-4 h-4 mr-1" />
      <p className="text-red-500">Delete</p>
    </Button>
  );
}
