import React, { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import TableControls from "@/components/ui/TableControls";

import {
  useBreadcrumbs,
  useFilter,
  useSearch,
  usePagination,
  useSort,
} from "@/hooks";

import MentorService from "@/services/modules/mentor.service";
import { Trash2, Edit2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "mentor", label: "Age", render: (row) => row.profile?.age },
  { key: "mentor", label: "Address", render: (row) => row.profile?.address },
  {
    key: "mentor",
    label: "Background",
    render: (row) => row.profile?.background,
  },
  { key: "actions", label: "Actions" },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await MentorService.getAll();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  // SEARCH
  const { query, setQuery, searchedData } = useSearch(data, [
    "name",
    "background",
    "mentorName",
  ]);

  // FILTER (by class)
  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "name",
  );

  // SORT
  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  // PAGINATION
  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 10);

  if (loading)
    return <div className="p-4 text-gray-500">Loading mentors...</div>;

  const handleRemove = (id) => {
    if (confirm("Are you sure you want to remove this mentor?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit mentor with ID: ${id}`);
  };

  const dataWithActions = paginatedData.map((row) => ({
    ...row,
    actions: (
      <div className="flex gap-3">
        <Link
          to={`/mentors/${row.id}`}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <Eye size={16} /> Details
        </Link>
        <Link
          to={`/mentors/update/${row.id}`}
          className="text-green-600 hover:text-green-800 flex items-center gap-1"
        >
          <Edit2 size={16} /> Edit
        </Link>
        <button
          onClick={() => handleRemove(row.id)}
          className="text-red-600 hover:text-red-800 flex items-center gap-1"
        >
          <Trash2 size={16} /> Remove
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-4 space-y-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500">
        {breadcrumbs.map((b, i) => (
          <span key={b.to}>
            {b.label}
            {i < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </div>

      {/* Controls */}
      <TableControls
        searchQuery={query}
        setSearchQuery={setQuery}
        filterOptions={[
          "Full Stack Development",
          "Front End Development",
          "Back End Development",
        ]}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortOptions={[
          { key: "name", label: "Name" },
          { key: "date", label: "Date" },
        ]}
        sortKey={sortKey}
        toggleSort={toggleSort}
      />

      <div className="text-sm text-gray-600">
        Total: {sortedData.length} mentors
      </div>

      <Table columns={columns} data={dataWithActions} />

      {/* Pagination */}
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

export default List;
