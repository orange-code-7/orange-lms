import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { GraduationCap, MapPin } from "lucide-react";

import usePopupStore from "@/app/store/popupStore";

import { PAGE_META } from "@/constants/pageMeta";

import { useBreadcrumbs, useSearch } from "@/hooks";

import MentorService from "@/services/modules/mentor.service";

import LoadingPage from "@/components/ui/loading/LoadingPage";

import PageHeader from "@/components/ui/page/PageHeader";

import StatsCard from "@/components/ui/cards/StatsCard";

import TableControls from "@/components/ui/tables/TableControls";

import TableActions from "@/components/ui/tables/TableActions";

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const page = PAGE_META.mentors?.[role] || PAGE_META.mentors?.Admin;

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchMentors();
  }, [openError]);

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

  const stats = useMemo(() => {
    const totalMentors = data.length;

    const activeMentors = data.filter((mentor) => mentor.isActive).length;

    const inactiveMentors = totalMentors - activeMentors;

    const totalClasses = data.reduce(
      (sum, mentor) => sum + (mentor.mentoredClasses?.length || 0),
      0,
    );

    return {
      totalMentors,
      activeMentors,
      inactiveMentors,
      totalClasses,
    };
  }, [data]);

  if (loading) {
    return <LoadingPage title="Loading Mentors..." />;
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={page.title}
        description={page.description}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatsCard title="Total Mentors" value={stats.totalMentors} />

        <StatsCard title="Active Mentors" value={stats.activeMentors} />

        <StatsCard title="Inactive Mentors" value={stats.inactiveMentors} />

        <StatsCard title="Assigned Classes" value={stats.totalClasses} />
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

            <div className="mt-5">
              <TableActions
                id={mentor.id}
                role={role}
                resource="mentor"
                detailUrl={`/mentors/${mentor.id}`}
                editUrl={`/mentors/edit/${mentor.id}`}
                onDelete={handleRemove}
              />
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
