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

import MaterialService from "@/services/modules/material.service";

import LoadingPage from "@/components/ui/loading/LoadingPage";

import StatsCard from "@/components/ui/cards/StatsCard";

import PageHeader from "@/components/ui/page/PageHeader";

import PopUp from "@/components/ui/popup/PopUp";

import Table from "@/components/ui/tables/Table";
import TableActions from "@/components/ui/tables/TableActions";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

import MaterialDetail from "./Detail";

const columns = [
  {
    key: "material",
    label: "Material",
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
    key: "type",
    label: "Type",
    render: (row) => (
      <span className="rounded-sm bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">
        {row.type || "-"}
      </span>
    ),
  },

  {
    key: "uploader",
    label: "Uploaded By",
    render: (row) => row.uploader?.name || "-",
  },

  {
    key: "actions",
    label: "Actions",
  },
];

const FILTER_OPTIONS = ["PDF", "VIDEO", "LINK", "DOC", "PPT"];

const SORT_OPTIONS = [
  {
    key: "name",
    label: "Material Name",
  },
  {
    key: "type",
    label: "Type",
  },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [openDetail, setOpenDetail] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const page = PAGE_META.materials?.[role] || PAGE_META.materials?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await MaterialService.getAll();

        setData(res.data || []);
      } catch (error) {
        console.error(error);

        openError({
          title: "Load Failed",
          message:
            error?.response?.data?.message || "Failed to load materials.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [openError]);

  const { query, setQuery, searchedData } = useSearch(data, [
    "name",
    "description",
    "type",
  ]);

  const { filterValue, setFilterValue, filteredData } = useFilter(
    searchedData,
    "type",
  );

  const { sortedData, sortKey, toggleSort } = useSort(filteredData);

  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedData, 10);

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Material",
      message:
        "Are you sure you want to delete this material? This action cannot be undone.",

      action: async () => {
        try {
          await MaterialService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Material deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message:
              error?.response?.data?.message || "Failed to delete material.",
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
            resource="material"
            editUrl={`/materials/edit/${row.id}`}
            onDelete={handleRemove}
            onDetail={() => {
              setSelectedMaterial(row);
              setOpenDetail(true);
            }}
          />
        ),
      })),
    [paginatedData, role],
  );

  if (loading) {
    return <LoadingPage title="Loading Materials..." />;
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PageHeader
          breadcrumbs={breadcrumbs}
          title={page.title}
          description={page.description}
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatsCard title="Materials" value={data.length} />

          <StatsCard
            title="Document"
            value={
              data.filter(
                (item) => item.type === "PDF" || item.type === "Document",
              ).length
            }
          />

          <StatsCard
            title="Image"
            value={data.filter((item) => item.type === "JPG").length}
          />

          <StatsCard
            title="Links"
            value={data.filter((item) => item.type === "URL").length}
          />
        </div>
      </div>

      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <TableControls
          searchQuery={query}
          setSearchQuery={setQuery}
          filterOptions={FILTER_OPTIONS}
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
            Total {sortedData.length} Materials
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
        title={selectedMaterial?.name}
      >
        <MaterialDetail
          material={selectedMaterial}
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
