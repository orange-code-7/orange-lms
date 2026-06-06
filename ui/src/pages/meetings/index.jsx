import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Archive, CheckSquare, FileText } from "lucide-react";

import {
  useBreadcrumbs,
  useFilter,
  usePagination,
  useSearch,
  useSort,
} from "@/hooks";

import usePopupStore from "@/app/store/popupStore";

import MeetingService from "@/services/modules/meeting.service";

import { PAGE_META } from "@/constants/pageMeta";

import PageHeader from "@/components/ui/page/PageHeader";

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

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const page = PAGE_META.meetings?.[role] || PAGE_META.meetings?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const dataWithActions = paginatedData.map((row) => ({
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
  }));

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">
        Loading meetings...
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={page.title}
        description={page.description}
      />

      {/* Summary */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
      </div> */}

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

      {/* Pagination */}
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
