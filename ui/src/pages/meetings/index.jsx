import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

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

const columns = [
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
    key: "classCode",
    label: "Class Code",
    render: (row) => (
      <span className="rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
        {row.class?.code || "-"}
      </span>
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      const res = await MeetingService.getAll();
      setData(res.data || []);
    } catch (error) {
      console.error(error);
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

        <Link
          to={`/meetings/edit/${row.id}`}
          className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
        >
          <Pencil size={14} />
          Edit
        </Link>

        <button
          onClick={() => handleRemove(row.id)}
          className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 size={14} />
          Remove
        </button>
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
          Meeting Management
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          Manage all learning sessions, schedules, class meetings, and mentoring
          activities across Orange LMS.
        </p>
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
