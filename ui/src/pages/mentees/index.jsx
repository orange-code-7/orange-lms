import { useEffect, useMemo, useState } from "react";

import usePopupStore from "@/app/store/popupStore";

import { PAGE_META } from "@/constants/pageMeta";

import { useBreadcrumbs, usePagination, useSearch } from "@/hooks";

import MenteeService from "@/services/modules/mentee.service";

import LoadingPage from "@/components/ui/loading/LoadingPage";
import PageHeader from "@/components/ui/page/PageHeader";

import StatsCard from "@/components/ui/cards/StatsCard";

import Table from "@/components/ui/tables/Table";
import TableActions from "@/components/ui/tables/TableActions";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

const columns = [
  {
    key: "mentee",
    label: "Mentee",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.avatarUrl || "https://placehold.co/100x100"}
          alt={row.name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <p className="font-medium">{row.name}</p>

          <p className="text-xs text-[var(--color-text-muted)]">{row.email}</p>
        </div>
      </div>
    ),
  },

  {
    key: "age",
    label: "Age",
    render: (row) => row.profile?.age || "-",
  },

  {
    key: "city",
    label: "City",
    render: (row) => row.profile?.city || "-",
  },

  {
    key: "classes",
    label: "Enrolled Classes",
    render: (row) => row.enrolledClasses?.length || 0,
  },

  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`rounded-sm px-2 py-1 text-xs font-medium ${
          row.isActive
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {row.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },

  {
    key: "actions",
    label: "Actions",
  },
];

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const page = PAGE_META.mentees.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const res = await MenteeService.getAll();

        setData(res.data || []);
      } catch (error) {
        console.error(error);

        openError({
          title: "Load Failed",
          message: error?.response?.data?.message || "Failed to load mentees.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, [openError]);

  const { query, setQuery, searchedData } = useSearch(data, ["name", "email"]);

  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(searchedData, 10);

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Mentee",
      message:
        "Are you sure you want to delete this mentee? This action cannot be undone.",

      action: async () => {
        try {
          await MenteeService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Mentee deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message:
              error?.response?.data?.message || "Failed to delete mentee.",
          });
        }
      },
    });
  };

  const stats = useMemo(
    () => ({
      total: data.length,
      active: data.filter((item) => item.isActive).length,
      inactive: data.filter((item) => !item.isActive).length,
      enrollments: data.reduce(
        (sum, item) => sum + (item.enrolledClasses?.length || 0),
        0,
      ),
    }),
    [data],
  );

  const tableData = useMemo(
    () =>
      paginatedData.map((row) => ({
        ...row,

        actions: (
          <TableActions
            id={row.id}
            resource="mentee"
            detailUrl={`/mentees/${row.id}`}
            editUrl={`/mentees/edit/${row.id}`}
            onDelete={handleRemove}
          />
        ),
      })),
    [paginatedData],
  );

  if (loading) {
    return <LoadingPage title="Loading Mentees..." />;
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={page.title}
        description={page.description}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatsCard title="Total Mentees" value={stats.total} />

        <StatsCard title="Active Mentees" value={stats.active} />

        <StatsCard title="Inactive Mentees" value={stats.inactive} />

        <StatsCard title="Enrollments" value={stats.enrollments} />
      </div>

      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <TableControls
          searchQuery={query}
          setSearchQuery={setQuery}
          filterOptions={[]}
          filterValue=""
          setFilterValue={() => {}}
          sortOptions={[]}
          sortKey=""
          toggleSort={() => {}}
        />
      </div>

      <div className="overflow-hidden rounded-sm border border-gray-200 bg-[var(--color-surface)]">
        <div className="border-b border-gray-200 px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Total {searchedData.length} Mentees
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
