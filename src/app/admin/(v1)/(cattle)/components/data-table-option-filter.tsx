"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  options?: {
    id: string;
    text: string;
  }[];
  isMultiple?: boolean;
  title?: string;
  filter?: string;
}

export const DataTableOptionFilter = ({
  filter = "",
  title,
  isMultiple = false,
  options = [],
}: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update the query params
  const updateQueryParams = (newValues: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValues.length > 0) {
      params.set(filter, newValues.join(","));
    } else {
      params.delete(filter);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    updateQueryParams(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    !searchParams.get(filter) && setSelectedValues([]);
  }, [searchParams]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed w-full md:w-fit">
          <IconWrapper icon="plusCircle" />
          <span className="ml-2">{title}</span>
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
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
                  selectedValues
                    .filter((option) =>
                      selectedValues.filter((value) => value == option)
                    )
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 pointer-events-auto" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.find(
                  (select) => select == option.id
                );
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      if (!isMultiple) {
                        setSelectedValues([option.id]);
                        return;
                      }

                      if (isSelected) {
                        const newValues = selectedValues.filter(
                          (value) => value != option.id
                        );
                        setSelectedValues(newValues);
                      } else {
                        setSelectedValues([...selectedValues, option.id]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>

                    <span>{option.text}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues([]);
                    }}
                    className="justify-center text-center"
                  >
                    Borrar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
