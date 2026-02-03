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

import ClassService from "@/services/class.service";
import { Trash2, Edit2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  { key: "code", label: "Class Code" },
  { key: "name", label: "Class" },
  { key: "startDate", label: "Date" },
  { key: "mentor", label: "Mentor", render: (row) => row.mentor?.name },
  {
    key: "mentee.length",
    label: "Total Mentees",
    render: (row) =>
      row.Users?.filter((u) => u.ClassUser.roleInClass === "mentee").length,
  },
  { key: "meeting", label: "Meetings", render: (row) => row.meeting?.length },
  { key: "actions", label: "Actions" },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getAll();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // SEARCH
  const { query, setQuery, searchedData } = useSearch(data, [
    "name",
    "subject",
    "mentorName",
  ]);

  // FILTER
  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "subject",
  );

  // SORT
  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  // PAGINATION
  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 5);

  if (loading)
    return <div className="p-4 text-gray-500">Loading classes...</div>;

  // Handler aksi
  const handleRemove = (id) => {
    if (confirm("Are you sure you want to remove this class?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit class with ID: ${id}`);
  };

  const handleDetails = (id) => {
    alert(`View details for class ID: ${id}`);
  };

  // Tambahkan render aksi per row
  const dataWithActions = paginatedData.map((row) => ({
    ...row,
    actions: (
      <div className="flex gap-2">
        <Link
          to={`/classes/${row.id}`}
          className="text-blue-600 hover:text-blue-800"
          title="Details"
        >
          <Eye size={16} className="mr-2" /> Details
        </Link>
        <Link
          to={`/classes/update/${row.id}`}
          className="text-green-600 hover:text-green-800"
          title="Edit"
        >
          <Edit2 size={16} className="mr=2" /> Edit
        </Link>
        <button
          onClick={() => handleRemove(row.id)}
          className="text-red-600 hover:text-red-800"
          title="Remove"
        >
          <Trash2 size={16} className="mr-2" /> Remove
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
          { key: "totalMeetings", label: "Meetings" },
        ]}
        sortKey={sortKey}
        toggleSort={toggleSort}
      />

      {/* Count */}
      <div className="text-sm text-gray-600">
        Total: {sortedData.length} classes
      </div>

      {/* Table */}
      <Table columns={columns} data={dataWithActions} />

      {/* Pagination Controls */}
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
