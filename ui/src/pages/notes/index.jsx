import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { Download } from "lucide-react";

import usePopupStore from "@/app/store/popupStore";

import { PAGE_META } from "@/constants/pageMeta";

import {
  useBreadcrumbs,
  useFilter,
  usePagination,
  useSearch,
  useSort,
} from "@/hooks";

import NoteService from "@/services/modules/note.service";

import LoadingPage from "@/components/ui/loading/LoadingPage";

import StatsCard from "@/components/ui/cards/StatsCard";

import PageHeader from "@/components/ui/page/PageHeader";

import PopUp from "@/components/ui/popup/PopUp";

import Table from "@/components/ui/tables/Table";
import TableActions from "@/components/ui/tables/TableActions";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

import NoteDetail from "./Detail";

const columns = [
  {
    key: "note",
    label: "Note",
    render: (row) => (
      <div className="max-w-md space-y-1">
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
      <div className="max-w-xs space-y-1">
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

const SORT_OPTIONS = [
  {
    key: "name",
    label: "Note Name",
  },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedNote, setSelectedNote] = useState(null);

  const [openDetail, setOpenDetail] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const page = PAGE_META.notes?.[role] || PAGE_META.notes?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await NoteService.getAll();

        setData(res.data || []);
      } catch (error) {
        console.error(error);

        openError({
          title: "Load Failed",
          message: error?.response?.data?.message || "Failed to load notes.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [openError]);

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

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Note",
      message:
        "Are you sure you want to delete this note? This action cannot be undone.",

      action: async () => {
        try {
          await NoteService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Note deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message: error?.response?.data?.message || "Failed to delete note.",
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
            resource="note"
            editUrl={`/notes/edit/${row.id}`}
            onDelete={handleRemove}
            onDetail={() => {
              setSelectedNote(row);
              setOpenDetail(true);
            }}
          />
        ),
      })),
    [paginatedData, role],
  );

  if (loading) {
    return <LoadingPage title="Loading Notes..." />;
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PageHeader
          breadcrumbs={breadcrumbs}
          title={page.title}
          description={page.description}
        />

        <div className="grid grid-cols-1 gap-4">
          <StatsCard title="Notes" value={data.length} />
        </div>
      </div>

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
            Total {sortedData.length} Notes
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

      <PopUp
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        title={selectedNote?.name}
      >
        <NoteDetail
          note={selectedNote}
          role={role}
          onDelete={(id) => {
            setOpenDetail(false);
            handleRemove(id);
          }}
        />
      </PopUp>
    </div>
  );
};

export default List;
