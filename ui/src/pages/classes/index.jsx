import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import usePopupStore from "@/app/store/popupStore";

import { PAGE_META } from "@/constants/pageMeta";

import {
  useBreadcrumbs,
  useFilter,
  usePagination,
  useSearch,
  useSort,
} from "@/hooks";

import ClassService from "@/services/modules/class.service";

import PageHeader from "@/components/ui/page/PageHeader";

import Table from "@/components/ui/tables/Table";
import TableActions from "@/components/ui/tables/TableActions";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

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

  const page = PAGE_META.classes[role];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getAll();

      setData(res.data);
    } catch (error) {
      console.error(error);

      openError({
        title: "Load Failed",
        message: error?.response?.data?.message || "Failed to load classes.",
      });
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

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Class",
      message:
        "Are you sure you want to delete this class? This action cannot be undone.",

      action: async () => {
        try {
          await ClassService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Class deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message:
              error?.response?.data?.message || "Failed to delete class.",
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
        resource="class"
        detailUrl={`/classes/${row.id}`}
        editUrl={`/classes/edit/${row.id}`}
        onDelete={handleRemove}
      />
    ),
  }));

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">
        Loading classes...
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
