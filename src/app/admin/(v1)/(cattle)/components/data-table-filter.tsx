"use client"
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DataTableFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState(searchParams.get("filter") || "");

  const urlParams = new URLSearchParams(searchParams.toString());

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined) {
          urlParams.set(key, params[key] as string);
        }
      });
      urlParams.set("page", "0");
      return urlParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    !searchParams.get("filter") && setFilter("");
  }, [searchParams]);

  const hasFilters = filter ;
  return (
      <Input
        placeholder="Filtrar"
        value={filter}
        onChange={(e) => {
          const newFilter = e.target.value;
          setFilter(newFilter);
          router.push(
            `${pathname}?${createQueryString({ filter: newFilter })}`
          );
        }}
        className="max-w-sm"
      />

  );
}
