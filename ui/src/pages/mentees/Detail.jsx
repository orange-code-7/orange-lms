import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import useBreadcrumbs from "@/hooks/useBreadcrumbs";
import MenteeService from "@/services/modules/mentee.service";

import {
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  CheckCircle,
  Clock,
  ArrowLeft,
  BookOpen,
  Pencil,
  Trash2,
} from "lucide-react";

const Detail = () => {
  const { id } = useParams();

  const breadcrumbs = useBreadcrumbs([
    {
      label: "Mentees",
      to: "/mentees",
    },
  ]);
  const [activeTab, setActiveTab] = useState("active");
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMentee = async () => {
    try {
      const res = await MenteeService.getById(id);

      setMentee(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentee();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!mentee) {
    return <div className="p-4">Mentee not found.</div>;
  }

  const activeClasses =
    mentee.enrolledClasses?.filter(
      (item) => item.ClassUser?.status === "Active",
    ) || [];

  const finishedClasses =
    mentee.enrolledClasses?.filter(
      (item) => item.ClassUser?.status === "Finished",
    ) || [];

  return (
    <div className="p-4 space-y-4 bg-[var(--color-background)] min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs text-[var(--color-text-muted)]">
        {breadcrumbs.map((b, i) => (
          <span key={b.to}>
            {b.label}
            {i < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
        <span> / {mentee.name}</span>
      </div>

      {/* Back */}
      <Link
        to="/mentees"
        className="inline-flex items-center gap-2 rounded-sm border border-gray-200 bg-[var(--color-surface)] px-3 py-2 text-sm hover:bg-gray-50"
      >
        <ArrowLeft size={16} />
        Back to Mentees
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-5">
            <div className="flex flex-col items-center">
              <img
                src={
                  mentee.avatarUrl || "https://placehold.co/150x150?text=Mentee"
                }
                alt={mentee.name}
                className="h-32 w-32 rounded-sm border border-gray-200 object-cover"
              />

              <h1 className="mt-4 text-xl font-bold text-center">
                {mentee.name}
              </h1>

              <p className="mt-1 text-center text-sm text-[var(--color-text-muted)]">
                {mentee.email}
              </p>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                  {mentee.role}
                </span>

                <span
                  className={`rounded-sm px-2 py-1 text-xs font-medium ${
                    mentee.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {mentee.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex w-full gap-2 pt-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-200">
                  <Pencil size={16} />
                  Edit
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-red-100 px-2 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              {/* Information */}
              <div className="mt-6 w-full space-y-4 border-t border-gray-200 pt-5">
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="mt-1 font-medium">
                    {mentee.profile?.age || "-"} Years Old
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="mt-1 font-medium">
                    {mentee.profile?.gender || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="mt-1 font-medium">
                    {mentee.profile?.address || "-"},{" "}
                    {mentee.profile?.city || "-"},{" "}
                    {mentee.profile?.country || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="mt-1 font-medium">
                    {mentee.profile?.phoneNumber || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Background</p>
                  <p className="mt-1 font-medium">
                    {mentee.profile?.background || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-sm border border-gray-200 bg-[var(--color-surface)]">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("active")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
                  activeTab === "active"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500"
                }`}
              >
                <BookOpen size={16} />
                Active Classes ({activeClasses.length})
              </button>

              <button
                onClick={() => setActiveTab("finished")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
                  activeTab === "finished"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500"
                }`}
              >
                <GraduationCap size={16} />
                Finished Classes ({finishedClasses.length})
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {activeTab === "active" ? (
                <div className="space-y-3">
                  {activeClasses.length === 0 ? (
                    <p className="text-sm text-gray-500">No active classes.</p>
                  ) : (
                    activeClasses.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-sm border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{item.name}</p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                              {item.code}
                            </p>
                          </div>

                          <span className="rounded-sm bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            Active
                          </span>
                        </div>

                        <div className="mt-4">
                          <div className="mb-1 flex justify-between text-xs">
                            <span>Progress</span>
                            <span>
                              {item.ClassUser?.progressPercentage || 0}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-orange-500"
                              style={{
                                width: `${
                                  item.ClassUser?.progressPercentage || 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {finishedClasses.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No finished classes.
                    </p>
                  ) : (
                    finishedClasses.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-sm border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{item.name}</p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                              {item.code}
                            </p>
                          </div>

                          <span className="rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                            Finished
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
