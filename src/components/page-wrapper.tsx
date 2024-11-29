import * as React from "react";

import { cn } from "@/lib/utils";

const PageWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-w-6xl flex flex-col space-y-12 mx-4 md:mx-8 my-10 w-screen overflow-x-hidden", className)}
    {...props}
  />
));
PageWrapper.displayName = "PageWrapper";


export { PageWrapper }