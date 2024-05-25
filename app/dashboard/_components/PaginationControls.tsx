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
import { useRouter, useSearchParams } from "next/navigation";

export function PaginationControls({
  totalData,
  customPerPage,
  hasNext,
  hasPrev,
}: {
  totalData: number;
  customPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? customPerPage;
 
  return (
    <Pagination className="my-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              router.push(
                `?page=${Number(page) - 1}&per_page=${Number(per_page)}`,
                { scroll: false }
              );
            }}
            aria-disabled={!hasPrev}
            tabIndex={!hasPrev ? -1 : undefined}
            className={
              !hasPrev
                ? "pointer-events-none opacity-50"
                : "hover:bg-zinc-200 rounded"
            }
          />
        </PaginationItem>
        <PaginationItem>
          {page} / {Math.ceil(totalData / Number(per_page))}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              router.push(
                `?page=${Number(page) + 1}&per_page=${Number(per_page)}`,
                { scroll: false }
              );
            }}
            aria-disabled={!hasNext}
            tabIndex={!hasNext ? -1 : undefined}
            className={
              !hasNext
                ? "pointer-events-none opacity-50"
                : "hover:bg-zinc-200 rounded"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
