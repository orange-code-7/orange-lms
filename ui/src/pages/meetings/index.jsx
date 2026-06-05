import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  CheckSquare,
  FileText,
  Archive,
} from "lucide-react";

import Table from "@/components/ui/tables/Table";
import TableControls from "@/components/ui/tables/TableControls";

import {
  useBreadcrumbs,
  useFilter,
  useSearch,
  usePagination,
  useSort,
} from "@/hooks";

import MeetingService from "@/services/modules/meeting.service";
import { useSelector } from "react-redux";
import { can } from "@/helpers/can";

const columns = [
  {
    key: "classCode",
    label: "Class Code",
    render: (row) => (
      <div className="space-y-1 max-w-md">
        <p>
          <span className="rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
            {row.class?.code || "-"}
          </span>
        </p>

        <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">
          {row.class?.name || "-"}
        </p>
      </div>
    ),
  },
  {
    key: "name",
    label: "Topic",
    render: (row) => (
      <div className="space-y-1 max-w-md">
        <p className="font-semibold text-[var(--color-text)]">
          {row.name || "-"}
        </p>

        <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">
          {row.description || "-"}
        </p>
      </div>
    ),
  },

  {
    key: "meetingDate",
    label: "Date",
    render: (row) =>
      row.meetingDate
        ? new Date(row.meetingDate).toLocaleDateString("id-ID")
        : "-",
  },
  {
    key: "resources",
    label: "Resources",
    render: (row) => (
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <CheckSquare size={14} className="text-blue-500" />
          <span>Tasks: {row.tasks?.length || 0}</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText size={14} className="text-green-500" />
          <span>Notes: {row.notes?.length || 0}</span>
        </div>

        <div className="flex items-center gap-2">
          <Archive size={14} className="text-orange-500" />
          <span>Materials: {row.materials?.length || 0}</span>
        </div>
      </div>
    ),
  },
  {
    key: "startHour",
    label: "Start Hour",
    render: (row) => row.startHour || "-",
  },

  {
    key: "finishHour",
    label: "Finish Hour",
    render: (row) => row.finishHour || "-",
  },

  {
    key: "actions",
    label: "Actions",
  },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeetings = async () => {
    try {
      const res = await MeetingService.getAll();
      setData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const { query, setQuery, searchedData } = useSearch(data, [
    "name",
    "description",
  ]);

  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "meetingDate",
  );

  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 10);

  const handleRemove = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this meeting?");

    if (!confirmed) return;

    try {
      await MeetingService.delete(id);

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const dataWithActions = paginatedData.map((row) => ({
    ...row,

    actions: (
      <div className="flex items-center gap-2">
        <Link
          to={`/meetings/${row.id}`}
          className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
        >
          <Eye size={14} />
          Details
        </Link>

        {can(role, "meeting", "update") && (
          <Link
            to={`/meetings/edit/${row.id}`}
            className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
          >
            <Pencil size={14} />
            Edit
          </Link>
        )}

        {can(role, "meeting", "delete") && (
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

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">
        Loading meetings...
      </div>
    );
  }

  const pageTitle =
    role === "Mentor"
      ? "My Meetings"
      : role === "Mentee"
        ? "Learning Meetings"
        : "Meeting Management";

  const pageDescription =
    role === "Mentor"
      ? "View meetings from classes assigned to you."
      : role === "Mentee"
        ? "View your learning schedules, assignments, notes, and materials."
        : "Manage all learning sessions, schedules, class meetings, and mentoring activities across Orange LMS.";

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

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Meetings</p>

          <h3 className="mt-1 text-2xl font-bold">{data.length}</h3>
        </div>

        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Tasks</p>

          <h3 className="mt-1 text-2xl font-bold">
            {data.reduce((acc, item) => acc + (item.tasks?.length || 0), 0)}
          </h3>
        </div>

        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Notes</p>

          <h3 className="mt-1 text-2xl font-bold">
            {data.reduce((acc, item) => acc + (item.notes?.length || 0), 0)}
          </h3>
        </div>

        <div className="rounded-sm border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Materials</p>

          <h3 className="mt-1 text-2xl font-bold">
            {data.reduce((acc, item) => acc + (item.materials?.length || 0), 0)}
          </h3>
        </div>
      </div>

      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <TableControls
          searchQuery={query}
          setSearchQuery={setQuery}
          filterOptions={[]}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          sortOptions={[
            {
              key: "name",
              label: "Topic",
            },
            {
              key: "meetingDate",
              label: "Meeting Date",
            },
          ]}
          sortKey={sortKey}
          toggleSort={toggleSort}
        />
      </div>

      <div className="overflow-hidden rounded-sm border border-gray-200 bg-[var(--color-surface)]">
        <div className="border-b border-gray-200 px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Total {sortedData.length} Meetings
          </p>
        </div>

        <div className="p-4">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

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
    </div>
  );
};

export default List;
