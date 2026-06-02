import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, Users, GraduationCap } from "lucide-react";

import { useBreadcrumbs, useSearch, usePagination } from "@/hooks";

import MenteeService from "@/services/modules/mentee.service";

const List = () => {
  const breadcrumbs = useBreadcrumbs();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMentees = async () => {
    try {
      const res = await MenteeService.getAll();

      setData(res.data || []);
    } catch (error) {
      console.error(error);
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

  const handleRemove = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this mentee?");

    if (!confirmed) return;

    try {
      await MenteeService.delete(id);

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const totalMentees = data.length;

  const activeMentees = data.filter((item) => item.isActive).length;

  const totalEnrollments = data.reduce(
    (sum, item) => sum + (item.enrolledClasses?.length || 0),
    0,
  );

  if (loading) {
    return (
      <div className="p-4 text-[var(--color-text-muted)]">
        Loading mentees...
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
          Mentee Management
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          Manage enrolled students, monitor learning participation, and oversee
          mentee activity across Orange LMS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Total Mentees
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-500">
            {totalMentees}
          </h2>
        </div>

        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Active Mentees
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-500">
            {activeMentees}
          </h2>
        </div>

        <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Total Enrollments
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {totalEnrollments}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mentee..."
          className="w-full rounded-sm border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-sm border border-gray-200 bg-[var(--color-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                  Mentee
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                  Age
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                  City
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                  Enrolled
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((mentee) => (
                <tr
                  key={mentee.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentee.avatarUrl || "https://placehold.co/100x100"}
                        alt={mentee.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-medium">{mentee.name}</p>

                        <p className="text-xs text-[var(--color-text-muted)]">
                          {mentee.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">{mentee.profile?.age || "-"}</td>

                  <td className="px-4 py-4">{mentee.profile?.city || "-"}</td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} />

                      <span>{mentee.enrolledClasses?.length || 0}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-sm px-2 py-1 text-xs font-medium ${
                        mentee.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {mentee.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/mentees/${mentee.id}`}
                        className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
                      >
                        <Eye size={14} />
                        Details
                      </Link>

                      <Link
                        to={`/mentees/edit/${mentee.id}`}
                        className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
                      >
                        <Pencil size={14} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleRemove(mentee.id)}
                        className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="rounded-sm border border-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="rounded-sm bg-orange-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
