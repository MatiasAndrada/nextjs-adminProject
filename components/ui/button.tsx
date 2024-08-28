import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-md md:text-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white capitalize bg-primary hover:bg-secondary shadow hover:shadow-lg dark:shadow-blue-500",
        create:
          "mt-4  text-blue-600 bg-blue-200 hover:bg-blue-300  py-2 px-4 rounded-md transition duration-300 ease-in-out",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        info: "bg-slate-500 hover:bg-slate-600 focus:bg-slate-700 shadow hover:shadow-lg dark:shadow-slate-500 text-white",
        icon: "hover:scale-110 text-slate-300 hover:text-white rounded-full focus:bg-slate-300 focus:dark:bg-slate-800 transition duration-300 ease-in-out transform",
        outline: "border border-black  hover:bg-slate-200 shadow-sm ",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "text-black dark:text-white w-full flex items-center justify-center gap-2",
        sidenav:
          "w-full flex grow items-center justify-center gap-2 rounded-md bg-slate-100 dark:bg-slate-800  p-4 md:py-6 text-lg md:text-xl font-medium  hover:bg-sky-200 dark:hover:bg-sky-950 hover:text-blue-600 md:flex-none md:justify-start  ",
        link: "text-primary underline-offset-4 hover:underline",
        disabled: "bg-gray-200 text-gray-400 shadow-none cursor-not-allowed",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
