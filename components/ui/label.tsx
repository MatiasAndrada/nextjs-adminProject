"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import {
  TooltipProvider,
  Root as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "mb-1 block text-md md:text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    {props.children}
    {required && (
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <span className="text-red-500 cursor-help"> *</span>
          </TooltipTrigger>
          <TooltipContent className="text-xs bg-slate-950 text-white px-2 py-1 rounded-md">
            Required
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
