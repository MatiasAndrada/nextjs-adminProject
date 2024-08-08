"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { update_task_group } from "@/actions/task-group";
import { convertToDateValue } from "@/lib/utils";
//Types
import { Criticality } from "@prisma/client";
import type { State } from "@/schemas/task-group";
import type { TaskGroup } from "@prisma/client";
import { RangeValue } from "@nextui-org/calendar";
import { CalendarDate } from "@internationalized/date";

interface Props {
  taskGroup: Partial<TaskGroup>;
}

export default function EditTaskGroupForm({ taskGroup }: Props) {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(update_task_group, initialState);

  // Estado para manejar el rango de fechas
  const [dateRange, setDateRange] = useState<
    RangeValue<CalendarDate> | undefined
  >(
    taskGroup.startAt && taskGroup.endAt
      ? {
          start: convertToDateValue(new Date(taskGroup.startAt)),
          end: convertToDateValue(new Date(taskGroup.endAt)),
        }
      : undefined
  );
  const handleDateChange = (range: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setDateRange(range);
  };
  return (
    <form
      action={dispatch}
      className="w-full rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6"
    >
      <input type="hidden" name="id" value={taskGroup.id} />

      {/* Task Group Name */}
      <div className="mb-4">
        <Label htmlFor="name" required>
          Name
        </Label>
        <input
          type="text"
          id="name"
          name="name"
          className="peer block w-full rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={taskGroup.name}
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

      {/* Task Group Description */}
      <div className="mb-4">
        <Label htmlFor="description" required>
          Description
        </Label>
        <textarea
          id="description"
          className="peer block w-full h-fit rounded-md dark:bg-slate-800 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          name="description"
          defaultValue={taskGroup.description ? taskGroup.description : ""}
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

      {/* Task Group Criticality Dropdown from Type enum */}
      <div className="mb-4">
        <Label htmlFor="criticality" required>
          Criticality
        </Label>
        <select
          id="criticality"
          name="criticality"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-gray-300"
          defaultValue={taskGroup.criticality}
          aria-describedby="criticality-error"
        >
          <option value="" disabled hidden>
            Select Criticality
          </option>
          <option value={Criticality.LOW} className="text-criticality-low">
            Low
          </option>
          <option
            value={Criticality.MEDIUM}
            className="text-criticality-medium"
          >
            Medium
          </option>
          <option value={Criticality.HIGH} className="text-criticality-high">
            High
          </option>
          <option
            value={Criticality.CRITICAL}
            className="text-criticality-critical"
          >
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

      <div className="mb-4 flex flex-row gap-4">
        <Label htmlFor="select-members">Select time period</Label>
        <RangeCalendar
          aria-label="Date (Min Date Value)"
          minValue={today(getLocalTimeZone())}
          defaultValue={dateRange}
          onChange={handleDateChange}
          visibleMonths={2}
        />

        {taskGroup.startAt && taskGroup.endAt && (
          <>
            <input
              type="hidden"
              name="startDate"
              value={dateRange?.start.toString()}
            />
            <input
              type="hidden"
              name="endDate"
              value={dateRange?.end.toString()}
            />
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">Updated task group</Button>
      </div>
    </form>
  );
}
