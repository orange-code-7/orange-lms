// React
import React, { useEffect, useState } from "react";

// External
import { Link } from "react-router-dom";

// Store
import usePopupStore from "@/app/store/popupStore";

// Hooks
import { useBreadcrumbs, usePagination, useSearch } from "@/hooks";

// Services
import MenteeService from "@/services/modules/mentee.service";

// Components
import PageHeader from "@/components/ui/page/PageHeader";
import StatsCard from "@/components/ui/cards/StatsCard";
import Table from "@/components/ui/tables/Table";
import TableControls from "@/components/ui/tables/TableControls";
import Pagination from "@/components/ui/tables/Pagination";

// Constants
import { PAGE_META } from "@/constants/pageMeta";

// Icons
import { Eye, Pencil, Trash2 } from "lucide-react";

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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const page = PAGE_META.mentees.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

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

  useEffect(() => {
    fetchMentees();
  }, []);

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

  const totalMentees = data.length;

  const activeMentees = data.filter((item) => item.isActive).length;

  const inactiveMentees = totalMentees - activeMentees;

  const totalEnrollments = data.reduce(
    (sum, item) => sum + (item.enrolledClasses?.length || 0),
    0,
  );

  const dataWithActions = paginatedData.map((row) => ({
    ...row,

    actions: (
      <div className="flex items-center gap-2">
        <Link
          to={`/mentees/${row.id}`}
          className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
        >
          <Eye size={14} />
          Details
        </Link>

        <Link
          to={`/mentees/edit/${row.id}`}
          className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
        >
          <Pencil size={14} />
          Edit
        </Link>

        <button
          onClick={() => handleRemove(row.id)}
          className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-rose-50 hover:text-rose-600"
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
        Loading mentees...
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatsCard title="Total Mentees" value={totalMentees} />

        <StatsCard title="Active Mentees" value={activeMentees} />

        <StatsCard title="Inactive Mentees" value={inactiveMentees} />

        <StatsCard title="Enrollments" value={totalEnrollments} />
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
          <Table columns={columns} data={dataWithActions} />
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
