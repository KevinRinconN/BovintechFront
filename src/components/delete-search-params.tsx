"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

export const DeleteSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

  return (
    <div>
      {searchParams.size > 0 && (
        <TooltipProvider>
          <Tooltip delayDuration={3}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 lg:px-3"
                onClick={() => {
                  router.push(`${pathname}`);
                }}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Eliminar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
