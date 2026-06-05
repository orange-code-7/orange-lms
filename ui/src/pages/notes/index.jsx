import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, Download } from "lucide-react";

import Table from "@/components/ui/tables/Table";
import TableControls from "@/components/ui/tables/TableControls";

import {
  useBreadcrumbs,
  useFilter,
  useSearch,
  usePagination,
  useSort,
} from "@/hooks";

import NoteService from "@/services/modules/note.service";
import PopUp from "../../components/ui/popup/PopUp";
import NoteDetail from "./Detail";
import { useSelector } from "react-redux";
import { can } from "@/helpers";

const columns = [
  {
    key: "note",
    label: "Note",
    render: (row) => (
      <div className="space-y-1 max-w-md">
        <p className="font-semibold text-[var(--color-text)]">
          {row.name || "-"}
        </p>

        {row.fileUrl && (
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
          >
            <Download size={12} />
            Download
          </a>
        )}

        <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">
          {row.description || "-"}
        </p>
      </div>
    ),
  },

  {
    key: "class",
    label: "Class",
    render: (row) => (
      <div className="space-y-1 max-w-xs">
        <span className="inline-block rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
          {row.Class?.code || "-"}
        </span>

        <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">
          Meeting {row.Meeting?.meetingNumber || "-"} -{" "}
          {row.Meeting?.name || "-"}
        </p>
      </div>
    ),
  },

  {
    key: "creator",
    label: "Created By",
    render: (row) => row.creator?.name || "-",
  },

  {
    key: "actions",
    label: "Actions",
  },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  // PopUp
  const [selectedNote, setSelectedNote] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await NoteService.getAll();
      setData(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const { query, setQuery, searchedData } = useSearch(data, [
    "name",
    "description",
  ]);

  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "name",
  );

  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 10);

  const handleRemove = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) return;

    try {
      await NoteService.delete(id);

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const dataWithActions = paginatedData.map((row) => ({
    ...row,

    actions: (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setSelectedNote(row);
            setOpenDetail(true);
          }}
          className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
        >
          <Eye size={14} />
          Details
        </button>
        {can(role, "note", "update") && (
          <Link
            to={`/notes/edit/${row.id}`}
            className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
          >
            <Pencil size={14} />
            Edit
          </Link>
        )}

        {can(role, "note", "delete") && (
          <button
            onClick={() => handleRemove(row.id)}
            className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={14} />
            Remove
          </button>
        )}
      </div>
    ),
  }));

  const pageTitle =
    role === "Mentor"
      ? "My Notes"
      : role === "Mentee"
        ? "Learning Notes"
        : "Note Management";

  const pageDescription =
    role === "Mentor"
      ? "Manage learning notes and documentation from your classes."
      : role === "Mentee"
        ? "View notes, summaries, and learning references from your enrolled classes."
        : "Manage learning notes, meeting documentation, summaries, and educational references across all Orange LMS classes.";

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">Loading notes...</div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs text-[var(--color-text-muted)]">
          {breadcrumbs.map((b, i) => (
            <span key={b.to}>
              {b.label}
              {i < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </p>

        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          {pageTitle}
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          {pageDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Tasks</p>

          <h3 className="mt-1 text-2xl font-bold">{data.length}</h3>
        </div>

        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Published</p>

          <h3 className="mt-1 text-2xl font-bold">
            {data.filter((item) => item.status === "Published").length}
          </h3>
        </div>

        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Draft</p>

          <h3 className="mt-1 text-2xl font-bold">
            {data.filter((item) => item.status === "Draft").length}
          </h3>
        </div>

        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Archived</p>

          <h3 className="mt-1 text-2xl font-bold">
            {data.filter((item) => item.status === "Archived").length}
          </h3>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <TableControls
          searchQuery={query}
          setSearchQuery={setQuery}
          filterOptions={["Published", "Draft", "Archived"]}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          sortOptions={[
            {
              key: "name",
              label: "Task Name",
            },
            {
              key: "maxScore",
              label: "Max Score",
            },
            {
              key: "status",
              label: "Status",
            },
          ]}
          sortKey={sortKey}
          toggleSort={toggleSort}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-sm border border-gray-200 bg-[var(--color-surface)]">
        <div className="border-b border-gray-200 px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Total {sortedData.length} Tasks
          </p>
        </div>

        <div className="p-4">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-1">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="rounded-sm border border-gray-200 px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 text-sm text-[var(--color-text-muted)]">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="rounded-sm bg-[var(--color-primary)] px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <PopUp
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        title={selectedNote?.name}
      >
        <NoteDetail note={selectedNote} role={role} />
      </PopUp>
    </div>
  );
};

export default List;
