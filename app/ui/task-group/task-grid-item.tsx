import { taskGroupItem } from "@/app/lib/definitions/task";

export default function TaskGridItem({ task }: { task: taskGroupItem }) {
  const { name, description, status, progress, ends_at, updated_at } = task;

  // Calcula los días restantes hasta la fecha de vencimiento
  const today = new Date();
  /*   const dueDateTime = new Date(dueDate);
    const daysRemaining = Math.ceil((dueDateTime - today) / (1000 * 60 * 60 * 24)); */

  return (
    <a className="p-4 border border-gray-300 m-2 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-sm mb-2"></p>
      {/*       <p className="text-sm">Última vez abierta: {lastOpened}</p> */}
    </a>
  );
}
