// React
import React, { useEffect, useState } from "react";

// External
import { Link } from "react-router-dom";

// Store
import usePopupStore from "@/app/store/popupStore";

// Hooks
import { useBreadcrumbs, useSearch } from "@/hooks";

// Services
import MentorService from "@/services/modules/mentor.service";

// Components
import PageHeader from "@/components/ui/page/PageHeader";
import StatsCard from "@/components/ui/cards/StatsCard";
import TableControls from "@/components/ui/tables/TableControls";

// Constants
import { PAGE_META } from "@/constants/pageMeta";

// Icons
import { Eye, Pencil, Trash2, GraduationCap, MapPin } from "lucide-react";

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const page = PAGE_META.mentors.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const fetchMentors = async () => {
    try {
      const res = await MentorService.getAll();

      setData(res.data || []);
    } catch (error) {
      console.error(error);

      openError({
        title: "Load Failed",
        message: error?.response?.data?.message || "Failed to load mentors.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const { query, setQuery, searchedData } = useSearch(data, ["name", "email"]);

  const handleRemove = (id) => {
    openConfirm({
      title: "Delete Mentor",
      message:
        "Are you sure you want to delete this mentor? This action cannot be undone.",

      action: async () => {
        try {
          await MentorService.delete(id);

          setData((prev) => prev.filter((item) => item.id !== id));

          openSuccess({
            title: "Success",
            message: "Mentor deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message:
              error?.response?.data?.message || "Failed to delete mentor.",
          });
        }
      },
    });
  };

  const totalMentors = data.length;

  const activeMentors = data.filter((mentor) => mentor.isActive).length;

  const inactiveMentors = totalMentors - activeMentors;

  const totalClasses = data.reduce(
    (sum, mentor) => sum + (mentor.mentoredClasses?.length || 0),
    0,
  );

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">
        Loading mentors...
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
        <StatsCard title="Total Mentors" value={totalMentors} />

        <StatsCard title="Active Mentors" value={activeMentors} />

        <StatsCard title="Inactive Mentors" value={inactiveMentors} />

        <StatsCard title="Assigned Classes" value={totalClasses} />
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {searchedData.map((mentor) => (
          <div
            key={mentor.id}
            className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={mentor.avatarUrl || "https://placehold.co/100x100"}
                alt={mentor.name}
                className="h-16 w-16 rounded-full border border-gray-200 object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold">{mentor.name}</h3>

                <p className="text-sm text-[var(--color-text-muted)]">
                  {mentor.email}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Background:</span>{" "}
                {mentor.profile?.background || "-"}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <MapPin size={14} />
                {mentor.profile?.city || "-"}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-sm bg-orange-50 p-3">
                <p className="text-xs text-gray-500">Active Classes</p>

                <p className="text-xl font-bold text-orange-500">
                  {
                    mentor.mentoredClasses?.filter(
                      (item) => item.status === "Active",
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-sm bg-blue-50 p-3">
                <p className="text-xs text-gray-500">Total Classes</p>

                <p className="text-xl font-bold text-blue-500">
                  {mentor.mentoredClasses?.length || 0}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2">
                <GraduationCap size={16} />

                <span className="text-sm font-medium">Classes</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {mentor.mentoredClasses?.length ? (
                  mentor.mentoredClasses.slice(0, 4).map((item) => (
                    <span
                      key={item.id}
                      className="rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700"
                    >
                      {item.code}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">
                    No classes assigned
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <Link
                to={`/mentors/${mentor.id}`}
                className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
              >
                <Eye size={14} />
                Details
              </Link>

              <Link
                to={`/mentors/edit/${mentor.id}`}
                className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
              >
                <Pencil size={14} />
                Edit
              </Link>

              <button
                onClick={() => handleRemove(mentor.id)}
                className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {!searchedData.length && (
        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-muted)]">
          No mentors found.
        </div>
      )}
    </div>
  );
};

export default List;
