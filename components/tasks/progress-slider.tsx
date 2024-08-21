import { Slider, Progress } from "@nextui-org/react";
import { toast } from "sonner";

import { set_progress_of_task } from "@/actions/task";
import { Role } from "@prisma/client";

export default function SliderProgress({
  role,
  id,
  value,
}: {
  role: Role;
  id: string;
  value: number;
}) {
  async function onChangeProgress(value: number | number[]) {
    const progressValue = Array.isArray(value) ? value[0] : value;
    /*     const res = await set_progress_of_task(id, progressValue);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
    } */
  }

  // Renderizado condicional
  return role !== Role.VIEWER ? (
    <Slider
      color="success"
      size="lg"
      step={10}
      maxValue={100}
      minValue={0}
      label="Select a progress value"
      aria-label="Progress"
      defaultValue={value}
      className="max-w-md"
      showSteps={true}
      onChange={(value) => onChangeProgress(value)}
      marks={[
        {
          value: 20,
          label: "20%",
        },
        {
          value: 50,
          label: "50%",
        },
        {
          value: 80,
          label: "80%",
        },
      ]}
    />
  ) : (
    <Progress aria-label="Loading..." value={value} className="max-w-md" />
  );
}
