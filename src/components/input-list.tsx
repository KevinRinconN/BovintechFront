"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ImgAvatar } from "@/components/img-avatar";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface combobox {
  search?: string;
  setSearch?: (search: string) => void;
  children?: React.ReactNode;
  withImg?: boolean;
  items?: ItemCombobox[];
  value?: string;
  onSelect?: (value: string) => void;
}

export interface ItemCombobox {
  id: string;
  img?: string;
  title?: string;
  subtitle?: string;
}

export function InputList({
  search,
  setSearch,
  items,
  withImg = false,
  value: valueProp = "",
  onSelect,
}: combobox) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(valueProp);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Cierra el dropdown solo si el foco está completamente fuera
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onFocus={() => setOpen(true)} // Mostrar el contenido al enfocar
      onBlur={handleBlur}
    >
      <Command className="">
        <div className="border rounded-xl my-1">
          {setSearch ? (
            <Input
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearch && setSearch(e.target.value);
              }}
              placeholder="Buscar..."
            />
          ) : (
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder="Buscar..."
            />
          )}
        </div>

        <div
          className={cn(
            "absolute top-full w-full rounded-xl z-10 overflow-hidden max-h-52 shadow-md",
            open ? "block opacity-100" : "hidden opacity-0"
          )}
        >
          <CommandList className="w-full px-1  bg-background">
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            <CommandGroup>
              <div className="px-1 grid grid-cols-1 divide-y divide-muted">
                {items?.map((item) => (
                  <CommandItem
                    className="py-2 flex gap-x-4"
                    key={item.id}
                    value={item.title}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? value : item.id);
                      onSelect &&
                        onSelect(currentValue === value ? value : item.id);
                      setOpen(false);
                    }}
                  >
                    {withImg && (
                      <ImgAvatar
                        className="w-10 h-10"
                        lastWeightImage={item.img}
                      />
                    )}
                    <div>
                      <p>{item.title}</p>
                      <p>{item.subtitle}</p>
                    </div>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </div>
      </Command>
    </div>
  );
}
