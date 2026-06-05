import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import MeetingService from "@/services/modules/meeting.service";
import useBreadcrumbs from "@/hooks/useBreadcrumbs";

import {
  CalendarDays,
  Clock3,
  BookOpen,
  User,
  CheckSquare,
  FileText,
  Archive,
  Edit2,
  Trash2,
  Download,
} from "lucide-react";

import { formatDate } from "@/helpers";

const tabs = ["Tasks", "Notes", "Materials", "Attendance"];

const Detail = () => {
  const { id } = useParams();

  const breadcrumbs = useBreadcrumbs([
    {
      label: "Meetings",
      to: "/meetings",
    },
  ]);

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tasks");

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await MeetingService.getById(id);
        console.log("Meeting details:", res.data);
        setMeeting(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading meeting...</div>;
  }

  if (!meeting) {
    return <div className="p-4 text-sm text-red-500">Meeting not found</div>;
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        {breadcrumbs.map((b, i) => (
          <span key={b.to}>
            {b.label}
            {i < breadcrumbs.length && " / "}
          </span>
        ))}

        <span className="font-medium text-gray-700">{meeting.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* LEFT */}
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-5">
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-sm bg-orange-100">
                <BookOpen size={40} className="text-orange-600" />
              </div>

              <h1 className="mt-4 text-center text-xl font-bold">
                Meeting #{meeting.meetingNumber}
              </h1>

              <p className="mt-1 text-center text-sm text-[var(--color-text-muted)]">
                {meeting.name}
              </p>

              <div className="mt-5 w-full space-y-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Class</p>

                  <p className="font-medium">{meeting.class?.code || "-"}</p>

                  <p className="text-xs text-gray-500">
                    {meeting.class?.name || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Meeting Date</p>

                  <p>
                    {meeting.meetingDate
                      ? formatDate(meeting.meetingDate)
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Time</p>

                  <p>
                    {meeting.startHour || "-"} - {meeting.finishHour || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Created By</p>

                  <p>{meeting.creator?.name || "-"}</p>
                </div>
              </div>

              <div className="mt-5 w-full rounded-sm bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Description</p>

                <p className="mt-1 text-sm">{meeting.description || "-"}</p>
              </div>

              <div className="mt-5 flex w-full gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200">
                  <Edit2 size={16} />
                  Edit
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-3 space-y-4">
          {/* SUMMARY */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
              <div className="flex items-center gap-3">
                <CheckSquare className="text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">Tasks</p>

                  <p className="text-2xl font-bold">
                    {meeting.tasks?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
              <div className="flex items-center gap-3">
                <FileText className="text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">Notes</p>

                  <p className="text-2xl font-bold">
                    {meeting.notes?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
              <div className="flex items-center gap-3">
                <Archive className="text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">Materials</p>

                  <p className="text-2xl font-bold">
                    {meeting.materials?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)]">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-orange-500 text-orange-600"
                      : "text-gray-500 hover:text-orange-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4">
              {/* TASKS */}
              {activeTab === "Tasks" && (
                <div className="space-y-3">
                  {meeting.tasks?.length ? (
                    meeting.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-sm border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{task.name}</h3>

                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {task.description}
                            </p>
                          </div>

                          <span className="rounded-sm bg-green-100 px-2 py-1 text-xs text-green-700">
                            {task.status}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>Max Score: {task.maxScore}</span>

                          <span>
                            Due: {task.dueDate ? formatDate(task.dueDate) : "-"}
                          </span>

                          {task.fileUrl && (
                            <a
                              href={task.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                            >
                              <Download size={14} />
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No tasks found.</p>
                  )}
                </div>
              )}

              {/* NOTES */}
              {activeTab === "Notes" && (
                <div className="space-y-3">
                  {meeting.notes?.length ? (
                    meeting.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-sm border border-gray-200 p-4"
                      >
                        <h3 className="font-semibold">{note.name}</h3>

                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {note.description}
                        </p>

                        {note.fileUrl && (
                          <a
                            href={note.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                          >
                            <Download size={12} />
                            Download
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No notes found.</p>
                  )}
                </div>
              )}

              {/* MATERIALS */}
              {activeTab === "Materials" && (
                <div className="space-y-3">
                  {meeting.materials?.length ? (
                    meeting.materials.map((material) => (
                      <div
                        key={material.id}
                        className="rounded-sm border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{material.name}</h3>

                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {material.description}
                            </p>
                          </div>

                          <span className="rounded-sm bg-orange-100 px-2 py-1 text-xs text-orange-700">
                            {material.type}
                          </span>
                        </div>

                        {material.fileUrl && (
                          <a
                            href={material.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                          >
                            <Download size={12} />
                            Download
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No materials found.</p>
                  )}
                </div>
              )}

              {/* ATTENDANCE */}
              {activeTab === "Attendance" && (
                <p className="text-sm text-gray-500">No materials found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
