import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:border-primary hover:border-accent",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
