import React from "react";
import Table from "@/components/ui/Table";
import TableControls from "@/components/ui/TableControls";
import useSearch from "@/hooks/useSearch";
import useFilter from "@/hooks/useFilter";
import useSort from "@/hooks/useSort";
import usePagination from "@/hooks/usePagination";

/**
 * TabTable Component
 * @param {Array} data - array of objects (rows)
 * @param {Array} columns - array of objects { key, label, render? }
 * @param {Number} pageSize - optional, default 5
 */
const TabTable = ({ data, columns, pageSize = 5 }) => {
  // default columns if not provided
  const finalColumns =
    columns && columns.length > 0
      ? columns
      : data[0]
        ? Object.keys(data[0]).map((key) => ({ key, label: key }))
        : [];

  // SEARCH
  const { query, setQuery, searchedData } = useSearch(
    data,
    finalColumns.map((c) => c.key),
  );

  // FILTER (optional: bisa kasih column pertama sebagai default filter)
  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    finalColumns[0]?.key || "",
  );

  // SORT
  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  // PAGINATION
  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, pageSize);

  return (
    <div className="mt-4">
      <TableControls
        searchQuery={query}
        setSearchQuery={setQuery}
        filterOptions={[]} // bisa dikirim dari parent jika perlu
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortOptions={finalColumns.map((c) => ({ key: c.key, label: c.label }))}
        sortKey={sortKey}
        toggleSort={toggleSort}
      />

      <Table columns={finalColumns} data={paginatedData} />

      <div className="flex gap-2 items-center mt-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TabTable;
