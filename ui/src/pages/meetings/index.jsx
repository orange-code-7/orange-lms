import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Archive, CheckSquare, FileText } from "lucide-react";

import usePopupStore from "@/app/store/popupStore";

import { PAGE_META } from "@/constants/pageMeta";

import {
  useBreadcrumbs,
  useFilter,
  usePagination,
  useSearch,
  useSort,
} from "@/hooks";

import MeetingService from "@/services/modules/meeting.service";

import PageHeader from "@/components/ui/page/PageHeader";

import LoadingPage from "@/components/ui/loading/LoadingPage";

import Table from "@/components/ui/tables/Table";
import TableActions from "@/components/ui/tables/TableActions";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

const columns = [
  {
    key: "classCode",
    label: "Class",
    render: (row) => (
      <div className="max-w-md space-y-1">
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
      <div className="max-w-md space-y-1">
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

const SORT_OPTIONS = [
  {
    key: "name",
    label: "Topic",
  },
  {
    key: "meetingDate",
    label: "Meeting Date",
  },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const page = PAGE_META.meetings?.[role] || PAGE_META.meetings?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await MeetingService.getAll();

        setData(res.data || []);
      } catch (error) {
        console.error(error);

        openError({
          title: "Load Failed",
          message: error?.response?.data?.message || "Failed to load meetings.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [openError]);

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

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Meeting",
      message:
        "Are you sure you want to delete this meeting? This action cannot be undone.",

      action: async () => {
        try {
          await MeetingService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Meeting deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message:
              error?.response?.data?.message || "Failed to delete meeting.",
          });
        }
      },
    });
  };

  const tableData = useMemo(
    () =>
      paginatedData.map((row) => ({
        ...row,

        actions: (
          <TableActions
            id={row.id}
            role={role}
            resource="meeting"
            detailUrl={`/meetings/${row.id}`}
            editUrl={`/meetings/edit/${row.id}`}
            onDelete={handleRemove}
          />
        ),
      })),
    [paginatedData, role],
  );

  if (loading) {
    return <LoadingPage title="Loading Meetings..." />;
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={page.title}
        description={page.description}
      />

      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <TableControls
          searchQuery={query}
          setSearchQuery={setQuery}
          filterOptions={[]}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          sortOptions={SORT_OPTIONS}
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
          <Table columns={columns} data={tableData} />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default List;
