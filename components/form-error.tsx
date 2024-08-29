import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  // Agrega un punto al final si el mensaje no termina con uno.
  const formattedMessage = message.endsWith(".") ? message : `${message}.`;
  return (
    <div
      className={`bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ${!message && " w-fit mx-auto"}`}
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{formattedMessage}</p>
    </div>
  );
};
