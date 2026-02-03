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

import NotesService from "@/services/notes.service";
import { Trash2, Edit2, Eye, Download } from "lucide-react";
import NotesDetails from "./Detail";
import { Link } from "react-router-dom";

const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "code", label: "Class Code", render: (row) => row.Class?.code },
  {
    key: "meetingName",
    label: "Meeting Name",
    render: (row) => row.Meeting?.name,
  },
  {
    key: "task",
    label: "Created By",
    render: (row) => row.NoteCreatedBy?.name,
  },
  {
    key: "fileUrl",
    label: "Link",
    render: (row) => {
      const url = row.fileUrl;
      return (
        <button className="p-2 bg-blue-800 text-white rounded">
          <div className="flex justify-center items-center">
            <Download size={16} className="mr-2"></Download>
            Download
          </div>
        </button>
      );
    },
  },
  { key: "actions", label: "Actions" },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await NotesService.getAll();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // SEARCH
  const { query, setQuery, searchedData } = useSearch(data, [
    "name",
    "createdAt",
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
    usePagination(sortedData, 5);

  if (loading) return <div className="p-4 text-gray-500">Loading notes...</div>;

  // ACTION HANDLERS
  const handleRemove = (id) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit note with ID: ${id}`);
  };

  const handleDetails = (note) => {
    NotesDetails(note);
  };

  const dataWithActions = paginatedData.map((row) => ({
    ...row,
    actions: (
      <div className="flex gap-3 items-center">
        <button
          onClick={() => handleDetails(row)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <Eye size={16} /> Detail
        </button>

        <Link
          to={`/notes/update/${row.id}`}
          className="text-green-600 hover:text-green-800 flex items-center gap-1"
        >
          <Edit2 size={16} /> Edit
        </Link>

        <button
          onClick={() => handleRemove(row.id)}
          className="text-red-600 hover:text-red-800 flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
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
        filterOptions={[...new Set(data.map((d) => d.className))]}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortOptions={[
          { key: "name", label: "name" },
          { key: "createdAt", label: "Created Date" },
        ]}
        sortKey={sortKey}
        toggleSort={toggleSort}
      />

      {/* Count */}
      <div className="text-sm text-gray-600">
        Total: {sortedData.length} notes
      </div>

      {/* Table */}
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
