import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DotsHorizontalIcon,
  DoubleArrowDownIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";

interface DataPaginationProps {
  page: number;
  per_page: number;
  max_page: number;
}

export function DataPagination({
  page,
  per_page,
  max_page,
}: DataPaginationProps) {
  const isFirst = page == 0;
  const isLast = page == per_page - 1;
  const nextPage = Number(page) + 1;
  const prevPage = Number(page) - 1;
  const nextFivePage = Math.min(page + 5, max_page - 1);
  const prevFivePage = Math.max(page - 5, 0);

  let pages = [];
  for (let i = 0; i < max_page; i++) {
    if (page) {
    }
    pages.push(i);
  }
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={isFirst ? "opacity-50 pointer-events-none" : ""}
              href={
                isFirst
                  ? "#"
                  : `?${new URLSearchParams({
                      page: String(prevPage),
                    })}`
              }
            />
          </PaginationItem>

          {pages.map((item: number) => {
            return (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`?${new URLSearchParams({
                      page: String(item),
                    })}`}
                    isActive={page == item}
                  >
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            );
          })}

          <PaginationItem>
            <PaginationNext
              className={isLast ? "opacity-50 pointer-events-none" : ""}
              href={
                isLast
                  ? "#"
                  : `?${new URLSearchParams({
                      page: String(nextPage),
                    })}`
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
