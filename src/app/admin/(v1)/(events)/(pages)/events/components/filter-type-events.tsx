"use client";
import { QueryOptionFilter } from "@/components/query-option-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
export interface OptionFilterButton extends QueryOptionFilter {
  side?: "left" | "right";
}

export const OptionFilterButton = ({
  queryKey,
  options,
  className,
  children,
  side = "left",
  ...props
}: OptionFilterButton) => {
  const searchParams = useSearchParams();
  const filters = searchParams?.get(queryKey)?.split(",");

  const selectedValues = options?.filter((value) => {
    return filters?.includes(value.id);
  });

  return (
    <QueryOptionFilter queryKey={queryKey} options={options} {...props}>
      <Button
        variant="outline"
        className={cn(
          "w-full md:w-fit flex items-center h-9 font-medium",
          side == "left" && "md:ml-2 md:pr-4 ",
          side == "right" && "md:mr-2 md:pl-4 flex-row-reverse",
          className
        )}
      >
        {selectedValues && selectedValues?.length > 0 && (
          <>
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.length}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.length > 2 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.length} selected
                </Badge>
              ) : (
                selectedValues.map((option) => (
                  <Badge
                    variant="secondary"
                    key={option.id}
                    className="rounded-sm px-1 font-normal"
                  >
                    {option.text}
                  </Badge>
                ))
              )}
            </div>
            <Separator orientation="vertical" className="mx-2 h-4" />
          </>
        )}
        <div className="flex">{children}</div>
      </Button>
    </QueryOptionFilter>
  );
};
