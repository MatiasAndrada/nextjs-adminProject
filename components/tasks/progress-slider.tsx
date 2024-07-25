import { Slider } from "@nextui-org/react";

export default function SliderProgress({ value }: { value: number }) {
  return (
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
      onChange={(value) => console.log(value)}
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
  );
}
