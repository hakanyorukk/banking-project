"use client";

import React, { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationBox = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(1);

  function handlePage(activePage: number): void {
    const params = new URLSearchParams(searchParams);
    params.set("page", activePage.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setActivePage(activePage);
  }

  return (
    <Pagination className="h-full mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePage(activePage === 1 ? 1 : activePage - 1)}
          />
        </PaginationItem>
        {/* Generate pagination links dynamically */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePage(page)}
                isActive={page === activePage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePage(
                activePage === totalPages ? activePage : activePage + 1
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBox;
