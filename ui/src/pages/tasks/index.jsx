import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";

import usePopupStore from "@/app/store/popupStore";

import { PAGE_META } from "@/constants/pageMeta";

import {
  useBreadcrumbs,
  useFilter,
  usePagination,
  useSearch,
  useSort,
} from "@/hooks";

import TaskService from "@/services/modules/task.service";

import PageHeader from "@/components/ui/page/PageHeader";
import PopUp from "@/components/ui/popup/PopUp";
import Table from "@/components/ui/tables/Table";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

import TaskDetail from "./Detail";
import { can } from "@/helpers";
import StatsCard from "@/components/ui/cards/StatsCard";

const columns = [
  {
    key: "task",
    label: "Task",
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
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`rounded-sm px-2 py-1 text-xs font-medium ${
          row.status === "Published"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {row.status || "-"}
      </span>
    ),
  },

  {
    key: "maxScore",
    label: "Max Score",
    render: (row) => row.maxScore ?? "-",
  },

  {
    key: "dueDate",
    label: "Due Date",
    render: (row) =>
      row.dueDate ? new Date(row.dueDate).toLocaleDateString("id-ID") : "-",
  },

  {
    key: "creator",
    label: "Creator",
    render: (row) => row.creator.name ?? "-",
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

  const page = PAGE_META.tasks?.[role] || PAGE_META.tasks?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  // PopUp
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await TaskService.getAll();

      setData(res.data || []);
    } catch (error) {
      console.error(error);

      openError({
        title: "Load Failed",
        message: error?.response?.data?.message || "Failed to load tasks.",
      });
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
    "status",
  ]);

  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "name",
    "status",
  );

  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 10);

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Task",
      message:
        "Are you sure you want to delete this task? This action cannot be undone.",

      action: async () => {
        try {
          await TaskService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Task deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message: error?.response?.data?.message || "Failed to delete task.",
          });
        }
      },
    });
  };
  const dataWithActions = paginatedData.map((row) => ({
    ...row,

    actions: (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setSelectedTask(row);
            setOpenDetail(true);
          }}
          className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
        >
          <Eye size={14} />
          Details
        </button>

        {can(role, "task", "update") && (
          <Link
            to={`/tasks/edit/${row.id}`}
            className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
          >
            <Pencil size={14} />
            Edit
          </Link>
        )}

        {can(role, "task", "delete") && (
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
      <div className="p-4 text-[var(--color-text-muted)]">Loading tasks...</div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <div className="grid grid-cols-2">
        {/* Page Header */}
        <PageHeader
          breadcrumbs={breadcrumbs}
          title={page.title}
          description={page.description}
        />

        {/* Stats Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatsCard title="Tasks" value={data.length} />

          <StatsCard
            title="Published"
            value={data.filter((item) => item.status === "Published").length}
          />

          <StatsCard
            title="Draft"
            value={data.filter((item) => item.status === "Draft").length}
          />

          <StatsCard
            title="Archived"
            value={data.filter((item) => item.status === "Archived").length}
          />
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <PopUp
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        title={selectedTask?.name}
      >
        <TaskDetail task={selectedTask} role={role} />
      </PopUp>
    </div>
  );
};

export default List;
