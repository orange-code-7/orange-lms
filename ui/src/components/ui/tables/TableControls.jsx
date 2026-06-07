import React from "react";
import { Search } from "lucide-react";

const TableControls = ({
  searchQuery,
  setSearchQuery,

  filterOptions = [],
  filterValue,
  setFilterValue,

  sortOptions = [],
  sortKey,
  toggleSort,
}) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[250px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="
            w-full rounded-sm border border-gray-200
            py-2 pl-10 pr-3
            outline-none
            focus:border-orange-400
          "
        />
      </div>

      {/* Filter */}
      {filterOptions.length > 0 && (
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="
            rounded-sm border border-gray-200
            px-3 py-2
            outline-none
          "
        >
          <option value="">All</option>

          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Sort */}
      {sortOptions.length > 0 &&
        sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => toggleSort(option.key)}
            className="
              rounded-sm border border-gray-200
              px-3 py-2 text-sm
              hover:bg-gray-50
            "
          >
            {option.label}

            {sortKey === option.key && " ↑↓"}
          </button>
        ))}
    </div>
  );
};

export default TableControls;
