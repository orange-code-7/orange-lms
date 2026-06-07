import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  prevPage,
  nextPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="
          inline-flex items-center gap-1
          rounded-sm border border-gray-200
          px-4 py-2 text-sm
          transition-colors
          hover:bg-gray-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      <span className="px-3 text-sm font-medium text-[var(--color-text-muted)]">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="
          inline-flex items-center gap-1
          rounded-sm bg-[var(--color-primary)]
          px-4 py-2 text-sm text-white
          transition-opacity
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
