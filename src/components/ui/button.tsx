import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-secondary hover:bg-primary/75 hover:animate-scale-up-down",
        accent:
          "text-secondary bg-primary/75 hover:bg-primary hover:animate-scale-up-down",
        link: " disabled:underline underline-offset-2 disabled:text-foreground ",
        outline: "border hover:bg-border hover:animate-scale-up-down",
        danger:
          "text-danger border-danger border hover:text-secondary hover:bg-danger hover:animate-scale-up-down",
      },
      size: {
        default: "h-8 px-4 py-2",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<"button"> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
