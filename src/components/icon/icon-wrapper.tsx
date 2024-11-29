import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { cva, type VariantProps } from "class-variance-authority";

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-9 h-9",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface IconWrapperProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "strokeWidth">,
    VariantProps<typeof iconVariants> {
  icon: Icons;
  strokeWidth?: "regular" | "bold";
}

export const IconWrapper = React.forwardRef<SVGSVGElement, IconWrapperProps>(
  ({ icon, size, strokeWidth, className, ...props }, ref) => {
    const Icon = Icons[icon || "arrowRight"];
    return (
      <Icon
        className={cn(iconVariants({ size, className }))}
        strokeWidth={strokeWidth == "bold" ? 2 : 1.2}
        {...props}
      />
    );
  }
);

IconWrapper.displayName = "IconWrapper";
