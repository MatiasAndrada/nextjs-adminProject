"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ConfirmationModal } from "../ui/confirmation-modal";
import { useState } from "react";
import {
  delete_task_group,
  set_criticality_of_task_group,
  set_status_of_task_group,
} from "@/actions/task-group";
import { Status, Criticality } from "@prisma/client";

export function DeleteTaskGroup({ 
  id, 
  taskGroupName, 
  redirectPath 
}: { 
  id: string; 
  taskGroupName?: string; 
  redirectPath?: string; 
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleDeleteTaskGroup() {
    setIsDeleting(true);
    setShowModal(false);
    
    try {
      const result = await delete_task_group(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        // Si hay una ruta de redirección, redirigir después de eliminar
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      }
    } catch (error) {
      toast.error("Error al eliminar el grupo de tareas");
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
        onConfirm={handleDeleteTaskGroup}
        title="Eliminar grupo de tareas"
        message={`¿Estás seguro de que quieres eliminar el grupo de tareas${taskGroupName ? ` "${taskGroupName}"` : ""}? Esta acción eliminará también todas las tareas que contiene y no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
        type="danger"
      />
    </>
  );
}

export function SetTaskGroupCriticality({
  id,
  criticality,
  children,
}: {
  id: string;
  criticality: Criticality;
  children: React.ReactNode;
}) {
  async function handleSetTaskGroupCriticality() {
    await set_criticality_of_task_group(id, criticality).then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
      }
    });
  }
  return (
    <Button variant="ghost" onClick={() => handleSetTaskGroupCriticality()}>
      {children}
    </Button>
  );
}

export function SetTaskGroupStatus({
  id,
  status,
  children,
}: {
  id: string;
  status: Status;
  children: React.ReactNode;
}) {
  async function handleSetTaskGroupStatus() {
    await set_status_of_task_group(id, status).then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
      }
    });
  }
  return (
    <Button variant="ghost" onClick={() => handleSetTaskGroupStatus()}>
      {children}
    </Button>
  );
}
