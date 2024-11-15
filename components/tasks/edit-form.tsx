"use client";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { State } from "@/schemas/project";
import type { Task } from "@prisma/client";
import { update_task } from "@/actions/task";
import { useState } from "react";

export default function EditTaskForm({ task }: { task: Task }) {
  const initialState: State = { message: null, errors: {} };

  const [state, dispatch] = useFormState(update_task, initialState);
  console.log(state);
  const [charactersCount, setCharactersCount] = useState(
    task.description ? task.description.length : 0
  ); // Add this line to initialize charactersCount state

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCharactersCount(event.target.value.length); // Update charactersCount state based on textarea value length
  };

  return (
    <form
      action={dispatch}
      className="w-full rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6"
    >
      <input type="hidden" name="id" value={task.id} />
      <input type="hidden" name="id_task_group" value={task.task_group_id} />
      {/* Task Name */}
      <div className="mb-4">
        <Label htmlFor="name" required>
          Name
        </Label>
        <input
          type="text"
          id="name"
          name="name"
          className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={task.name}
          aria-describedby="name-error"
        />
        {state.errors?.name && (
          <div aria-live="polite" className="mt-2 text-md text-red-500">
            {state.errors.name.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Task Description*/}
      <div className="mb-4">
        <Label htmlFor="description" required>
          Description
        </Label>
        <textarea
          id="description"
          className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
          name="description"
          defaultValue={task.description ? task.description : ""}
          aria-describedby="description-error"
          rows={12} // Add this line to allow the textarea to expand
          onChange={handleDescriptionChange} // Add this line to handle textarea value change
        />
        <p className="text-end text-sm text-gray-500 mt-2 mr-2">
          {charactersCount} / 4000 characters
        </p>
        {state.errors?.description && (
          <div className="mt-2 text-md text-red-500" aria-live="polite">
            {state.errors.description.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Submit Button */}
      <Button type="submit">Updated task</Button>
    </form>
  );
}
