"use client";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { State } from "@/schemas/project";
import { create_project } from "@/actions/projects";

export default function Form() {
  const initialState: State = {
    message: null,
    errors: {
      name: [],
      description: [],
    },
  };
  const [state, dispatch] = useFormState(create_project, initialState);
  return (
    <form
      action={dispatch}
      className="w-full rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6"
    >
      {/* Project Name */}
      <div className="mb-4">
        <Label htmlFor="name" required>
          Name
        </Label>
        <input
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
      {/* Project Description */}
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
      {/* Submit Button */}
      <Button type="submit">Create Project</Button>
    </form>
  );
}
