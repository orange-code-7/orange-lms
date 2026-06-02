import React from "react";

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
    <div className="flex flex-wrap gap-3 items-center mb-4">
      {/* LEFT: Search 50% */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-200 px-3 py-2 rounded"
        />
      </div>

      {/* RIGHT: Filter + Sort */}
      <div className="flex gap-2 flex-wrap">
        {/* Filter */}
        {filterOptions.length > 0 && (
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All</option>
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {/* Sort */}
        {sortOptions.length > 0 &&
          sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => toggleSort(opt.key)}
              className="border px-3 py-2 rounded"
            >
              {opt.label}
              {sortKey === opt.key ? " ↑↓" : ""}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TableControls;
