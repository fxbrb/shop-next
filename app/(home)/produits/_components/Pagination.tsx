import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) => {
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const renderPageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageLinks.push(
          <PaginationItem key={i}>
            <PaginationLink href={getPageUrl(i)} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pageLinks.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pageLinks;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}
        {renderPageLinks()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
