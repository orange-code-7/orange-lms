import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { useBreadcrumbs, useSearch } from "@/hooks";

import MentorService from "@/services/modules/mentor.service";

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMentors = async () => {
    try {
      const res = await MentorService.getAll();

      setData(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const { query, setQuery, searchedData } = useSearch(data, ["name", "email"]);

  const handleRemove = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this mentor?");

    if (!confirmed) return;

    try {
      await MentorService.delete(id);

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const totalMentors = data.length;

  const activeMentors = data.filter((mentor) => mentor.isActive).length;

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
    <div className="p-4 space-y-4 bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs text-[var(--color-text-muted)]">
          {breadcrumbs.map((b, i) => (
            <span key={b.to}>
              {b.label}
              {i < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </p>

        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Mentor Management
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          Manage mentors, monitor teaching activities, class assignments, and
          learning contributions across Orange LMS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Total Mentors
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-500">
            {totalMentors}
          </h2>
        </div>

        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Active Mentors
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-500">
            {activeMentors}
          </h2>
        </div>

        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Total Classes
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {totalClasses}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mentor..."
          className="w-full rounded-sm border border-gray-200 px-3 py-2 outline-none"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {searchedData.map((mentor) => (
          <div
            key={mentor.id}
            className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-5"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <img
                src={mentor.avatarUrl || "https://placehold.co/100x100"}
                alt={mentor.name}
                className="h-16 w-16 rounded-full object-cover border border-gray-200"
              />

              <div>
                <h3 className="font-semibold text-lg">{mentor.name}</h3>

                <p className="text-sm text-[var(--color-text-muted)]">
                  {mentor.email}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Background:</span>{" "}
                {mentor.profile?.background || "-"}
              </p>

              <p className="text-sm flex items-center gap-2">
                <MapPin size={14} />
                {mentor.profile?.city || "-"}
              </p>
            </div>

            {/* Stats */}
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

            {/* Classes */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
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

            {/* Actions */}
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
                className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-rose-50 hover:text-rose-600"
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
