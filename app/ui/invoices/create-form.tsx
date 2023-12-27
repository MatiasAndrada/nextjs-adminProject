'use client';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { create_task_group } from '@/app/lib/actions/task-group';

export default function Form({ user_id }: { user_id: string }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create_task_group, initialState);
  return (
    <form action={dispatch} className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Task Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Task Name
        </label>
        <input
          type="text"
          id="name"
          name='name'
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="name-error"
        />
        {/*         {state.errors?.name ? (
          <div
            id="name-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.name.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null} */}



      </div>

      {/* Task Description */}
      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Task Description
        </label>
        <textarea
          id="description"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
        {/*         {state.error('description') && (
          <div className="mt-2 text-sm text-red-500">
            {state.error('description').map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )} */}
      </div>

      {/* Task Criticality */}
      <div className="mb-4">
        <label htmlFor="criticality" className="mb-2 block text-sm font-medium">
          Task Criticality
        </label>
        <select
          id="criticality"

          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        >
          <option value="">Select a criticality</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {/*         {state.error('criticality') && (
          <div className="mt-2 text-sm text-red-500">
            {state.error('criticality').map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )} */}
      </div>

      {/* Task Ends At */}
      <div className="mb-4">
        <label htmlFor="endsAt" className="mb-2 block text-sm font-medium">
          Task Ends At
        </label>
        <input
          type="date"
          id="endsAt"
          name='endsAt'
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="endsAt-error"
        />
        {/*         {state.error('endsAt') && (
          <div className="mt-2 text-sm text-red-500">
            {state.error('endsAt').map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )} */}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Create Task
      </button>
    </form>

  );

}
