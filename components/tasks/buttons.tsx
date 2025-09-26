"use client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { set_status_of_task, delete_task } from "@/actions/task";
import { Status } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ConfirmationModal } from "../ui/confirmation-modal";

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

export function DeleteTask({ 
  id, 
  taskName, 
  redirectPath 
}: { 
  id: string; 
  taskName?: string; 
  redirectPath?: string; 
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleDeleteTask() {
    setIsDeleting(true);
    setShowModal(false);
    
    try {
      const result = await delete_task(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        disabled={isDeleting}
        className="bg-red-500 hover:bg-red-600 text-white shadow hover:shadow-lg dark:shadow-red-500 hover:scale-105 transition duration-300 ease-in-out"
      >
        <TrashIcon className="w-7 hover:scale-110 transition duration-300 ease-in-out transform" />
      </Button>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteTask}
        title="Eliminar tarea"
        message={`¿Estás seguro de que quieres eliminar la tarea${taskName ? ` "${taskName}"` : ""}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
        type="danger"
      />
    </>
  );
}
