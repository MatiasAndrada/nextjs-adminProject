"use client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { set_status_of_task } from "@/actions/task";
import { Status } from "@prisma/client";

export function SetTaskStatus({
  id,
  status,
  children,
}: {
  id: string;
  status: Status;
  children: React.ReactNode;
}) {
  async function handleSetTaskStatus() {
    await set_status_of_task(id, status).then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
      }
    });
  }
  return (
    <Button variant="ghost" onClick={() => handleSetTaskStatus()}>
      {children}
    </Button>
  );
}

/* export function UpdateInvoice({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/invoices/${id}/edit`}
            className="rounded-md border p-2 hover:bg-slate-300"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteInvoice({ id }: { id: string }) {
        const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    return (
        <>
            <form >
                <button className="rounded-md border p-2 hover:bg-slate-300">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
} */
