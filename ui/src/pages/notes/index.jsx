// React
import React, { useEffect, useState } from "react";

// External
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";

// Store
import usePopupStore from "@/app/store/popupStore";

// Constants
import { PAGE_META } from "@/constants/pageMeta";

// Hooks
import {
  useBreadcrumbs,
  useFilter,
  usePagination,
  useSearch,
  useSort,
} from "@/hooks";

// Services
import NoteService from "@/services/modules/note.service";

// Components
import StatsCard from "@/components/ui/cards/StatsCard";
import PageHeader from "@/components/ui/page/PageHeader";
import PopUp from "@/components/ui/popup/PopUp";
import Pagination from "@/components/ui/tables/Pagination";
import Table from "@/components/ui/tables/Table";
import TableControls from "@/components/ui/tables/TableControls";

// Local
import NoteDetail from "./Detail";
import { can } from "@/helpers";

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

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const page = PAGE_META.notes?.[role] || PAGE_META.notes?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedNote, setSelectedNote] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

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

  useEffect(() => {
    fetchNotes();
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

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">Loading notes...</div>
    );
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      {/* Header */}
      <div className="grid grid-cols-2">
        {/* Page Header */}
        <PageHeader
          breadcrumbs={breadcrumbs}
          title={page.title}
          description={page.description}
        />

        {/* Stats Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
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
          sortOptions={[
            {
              key: "name",
              label: "Note Name",
            },
          ]}
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
          <Table columns={columns} data={dataWithActions} />
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
        <NoteDetail note={selectedNote} role={role} />
      </PopUp>
    </div>
  );
};

export default List;
