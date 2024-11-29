"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function DataPageSize({ pageSize = "10" }: { pageSize: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createUrlWithSize = (newSize: string) => {
    const params = new URLSearchParams(searchParams.toString()); // Clonar los parámetros actuales
    params.set("size", String(newSize)); // Actualizar el parámetro de página
    params.set("page", "0");
    return `${window.location.pathname}?${params.toString()}`;
  };
  return (
    <div className="flex items-center space-x-2">
      <p className="text-xs md:text-sm font-medium">Filas por página</p>
      <Select
        value={pageSize}
        onValueChange={(value) => {
          router.push(createUrlWithSize(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
