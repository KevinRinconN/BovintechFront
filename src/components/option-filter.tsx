"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useControllableState } from "../hooks/useControllableState";

export interface OptionFilterProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  initialValues?: string[];
  values?: string[];
  onChangeValues?: (values: string[]) => void;
  children?: React.ReactNode;
  title?: string;
  options?: {
    id: string;
    text: string;
  }[];
  isMultiple?: boolean;
}

export const OptionFilter = ({
  initialValues,
  values,
  onChangeValues,
  title,
  children,
  isMultiple = false,
  options = [],
  className,
  ...props
}: OptionFilterProps) => {
  const [selectedValues, setSelectedValues] = useControllableState({
    defaultProp: initialValues,
    prop: values,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-8" {...props}>
        <p className="font-semibold">{title}</p>
        <div className="flex flex-col space-y-4">
          {options.map((option) => {
            return (
              <label
                key={option.id}
                htmlFor={option.id}
                className="flex items-center gap-x-4 text-sm font-medium text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Checkbox
                  checked={selectedValues?.includes(option.id)}
                  onCheckedChange={(checked) => {
                    if (!isMultiple) {
                      setSelectedValues([option.id]);
                      return;
                    }

                    if (!checked) {
                      const newValues =
                        selectedValues &&
                        selectedValues.filter((value) => value != option.id);
                      setSelectedValues(newValues);
                    } else {
                      setSelectedValues([...(selectedValues || []), option.id]);
                    }
                  }}
                  id={option.id}
                />
                {option.text}
              </label>
            );
          })}
        </div>
        <Button
          className="w-full"
          onClick={() => {
            onChangeValues && onChangeValues(selectedValues || []);
          }}
        >
          Aplicar
        </Button>
      </PopoverContent>
    </Popover>
  );
};
