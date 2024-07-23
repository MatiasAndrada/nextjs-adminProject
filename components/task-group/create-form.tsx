"use client";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { create_task_group } from "@/actions/task-group";
import type { State } from "@/schemas/task-group";
import { Criticality } from "@prisma/client";

export default function Form() {
  const initialState: State = {
    message: null,
    errors: {
      name: [],
      description: [],
      criticality: [],
    },
  };
  const [state, dispatch] = useFormState(create_task_group, initialState);
  return (
    <form
      action={dispatch}
      className="w-full rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6"
    >
      {/* Task Group Name */}
      <div className="mb-4">
        <Label htmlFor="name" required>
          Name
        </Label>
        <input
          required
          type="text"
          id="name"
          name="name"
          className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
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

      {/* Task Description */}
      <div className="mb-4">
        <Label htmlFor="description" required>
          Description
        </Label>
        <textarea
          id="description"
          className="peer block w-full h-fit  rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          name="description"
          defaultValue=""
          aria-describedby="description-error"
        />
        {state.errors?.description && (
          <div className="mt-2 text-md text-red-500" aria-live="polite">
            {state.errors.description.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Task Group Criticality Dropdown from Type enum*/}
      <div className="mb-4">
        <Label htmlFor="criticality" required>
          Criticality
        </Label>
        <select
          id="criticality"
          name="criticality"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-gray-300"
          defaultValue=""
          aria-describedby="criticality-error"
        >
          <option value="" disabled hidden>
            Select Criticality
          </option>
          <option value={Criticality.LOW} className="text-green-500 ">
            Low
          </option>
          <option value={Criticality.MEDIUM} className="text-yellow-500 ">
            Medium
          </option>
          <option value={Criticality.HIGH} className="text-orange-500 ">
            High
          </option>
          <option value={Criticality.CRITICAL} className="text-red-500 ">
            Critical
          </option>
        </select>
        {state.errors?.criticality && (
          <div className="mt-2 text-md text-red-500" aria-live="polite">
            {state.errors.criticality.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {/* Submit Button */}
        <Button type="submit">Create task group</Button>
        {state.message && (
          <div className="mt-2 text-md text-red-500" aria-live="assertive">
            {state.message}
          </div>
        )}
      </div>
    </form>
  );
}
