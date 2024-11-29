"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface DataPaginationProps {
  page: number;
  max_page: number;
}

export function DataPagination({ page, max_page }: DataPaginationProps) {
  const searchParams = useSearchParams();

  const isFirst = page == 0;
  const isLast = page == max_page - 1;
  const nextPage = Number(page) + 1;
  const prevPage = Number(page) - 1;

  // Número de páginas a mostrar antes y después de la página actual
  const range = 2;

  // Calcula el inicio y el fin del rango de páginas a mostrar
  const startPage = Math.max(0, page - range);
  const endPage = Math.min(max_page - 1, page + range);

  const createUrlWithPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Clonar los parámetros actuales
    params.set("page", String(newPage)); // Actualizar el parámetro de página
    return `?${params.toString()}`;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="w-full"> 
          <PaginationItem>
            <PaginationPrevious
              className={isFirst ? "opacity-50 pointer-events-none" : ""}
              href={isFirst ? "#" : createUrlWithPage(prevPage)}
            />
          </PaginationItem>

          {startPage > 0 && (
            <PaginationItem>
              <PaginationLink href={createUrlWithPage(0)}>1</PaginationLink>
            </PaginationItem>
          )}

          {startPage > 1 && (
            <PaginationItem>
              <PaginationLink href="#">
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((item: number) => (
            <PaginationItem key={item}>
              <PaginationLink
                href={createUrlWithPage(item)}
                isActive={page == item}
              >
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < max_page - 2 && (
            <PaginationItem>
              <PaginationLink href="#">
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}

          {endPage < max_page - 1 && (
            <PaginationItem>
              <PaginationLink href={createUrlWithPage(max_page - 1)}>
                {max_page}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              className={isLast ? "opacity-50 pointer-events-none" : ""}
              href={isLast ? "#" : createUrlWithPage(nextPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
