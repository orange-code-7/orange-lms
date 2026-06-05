import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Table from "@/components/ui/tables/Table";
import TableControls from "@/components/ui/tables/TableControls";

import {
  useBreadcrumbs,
  useFilter,
  useSearch,
  usePagination,
  useSort,
} from "@/hooks";

import ClassService from "@/services/modules/class.service";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { can } from "@/helpers";

const columns = [
  {
    key: "code",
    label: "Class Code",
    render: (row) => (
      <span className="inline-block rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
        {row.code || "-"}
      </span>
    ),
  },
  {
    key: "name",
    label: "Class Name",
    render: (row) => (
      <p className="font-semibold text-[var(--color-text)]">
        {row.name || "-"}
      </p>
    ),
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "level",
    label: "Level",
  },
  {
    key: "mentor",
    label: "Mentor",
    render: (row) => row.mentor?.name || "-",
    // row.Users?.find((u) => u.ClassUser?.roleInClass === "Mentor")?.name ||"-",
  },
  {
    key: "mentees",
    label: "Total Mentees",
    render: (row) => row.mentees?.length || 0,
  },
  {
    key: "meetings",
    label: "Meetings",
    render: (row) => row.meetings?.length || 0,
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

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getAll();
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const { query, setQuery, searchedData } = useSearch(data, [
    "code",
    "name",
    "category",
    "level",
  ]);

  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "category",
  );

  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 5);

  const handleRemove = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this class?");

    if (!confirmed) return;

    try {
      await ClassService.delete(id);

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
          to={`/classes/${row.id}`}
          className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
        >
          <Eye size={14} />
          Details
        </Link>

        {can(role, "class", "update") && (
          <Link
            to={`/classes/edit/${row.id}`}
            className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
          >
            <Pencil size={14} />
            Edit
          </Link>
        )}

        {can(role, "class", "delete") && (
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
        Loading classes...
      </div>
    );
  }
  const pageTitle =
    role === "Mentor"
      ? "My Classes"
      : role === "Mentee"
        ? "My Learning Classes"
        : "Class Management";

  const pageDescription =
    role === "Mentor"
      ? "View classes assigned to you and manage learning activities."
      : role === "Mentee"
        ? "View enrolled classes, meetings, assignments, notes, and learning materials."
        : "Manage all Orange LMS classes and learning activities.";
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

      {/* Controls */}
      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <TableControls
          searchQuery={query}
          setSearchQuery={setQuery}
          filterOptions={[
            "Full Stack",
            "Front End",
            "Back End",
            "JS Basic",
            "Web Design",
          ]}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          sortOptions={[
            {
              key: "name",
              label: "Name",
            },
            {
              key: "level",
              label: "Level",
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
            Total {sortedData.length} Classes
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
    </div>
  );
};

export default List;
