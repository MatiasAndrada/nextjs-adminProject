"use client";
import { Button } from "./button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: "danger" | "warning" | "info";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  type = "danger"
}: ConfirmationModalProps) {
  
  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "info":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  const getConfirmButtonVariant = () => {
    switch (type) {
      case "danger":
        return "destructive";
      case "warning":
        return "destructive";
      case "info":
        return "default";
      default:
        return "destructive";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full min-w-0 max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-600 animate-in fade-in-0 zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className={`p-2 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 ${getIconColor()}`}>
            <ExclamationTriangleIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white break-words hyphens-auto overflow-wrap-anywhere flex-1 min-w-0">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed break-words overflow-wrap-anywhere hyphens-auto whitespace-pre-wrap w-full">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-6 pt-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl border-t border-slate-200 dark:border-slate-600">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {cancelText}
          </Button>
          <Button
            variant={getConfirmButtonVariant() as any}
            onClick={onConfirm}
            disabled={isLoading}
            className={`${isLoading ? "opacity-50" : ""} ${
              type === "danger" ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700" : ""
            }`}
          >
            {isLoading ? "Procesando..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}