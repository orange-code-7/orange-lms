import {
  Award,
  BookOpen,
  Calendar,
  CheckSquare,
  Download,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import { formatDate, can } from "@/helpers";

import ActionButton from "@/components/ui/buttons/ActionButton";

const Detail = ({ task, role, onDelete }) => {
  if (!task) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-sm bg-orange-100">
              <Award size={40} className="text-orange-600" />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold">{task.name}</h2>

            <span
              className={`mt-3 rounded-sm px-3 py-1 text-xs font-medium ${
                task.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status || "-"}
            </span>

            <div className="mt-5 w-full space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Due Date</p>

                <p>{task.dueDate ? formatDate(task.dueDate) : "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Max Score</p>

                <p>{task.maxScore ?? "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Created By</p>

                <p>{task.creator?.name || "-"}</p>
              </div>
            </div>

            <div className="mt-5 flex w-full gap-2">
              {can(role, "task", "update") && (
                <Link to={`/tasks/edit/${task.id}`}>
                  <ActionButton action="edit" />
                </Link>
              )}

              {can(role, "task", "delete") && (
                <ActionButton
                  action="delete"
                  onClick={() => onDelete?.(task.id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 lg:col-span-3">
        {/* Description */}
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <h3 className="mb-3 font-semibold">Description</h3>

          <p className="text-sm leading-6 text-gray-600">
            {task.description || "-"}
          </p>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-orange-500" />

              <span className="font-medium">Class</span>
            </div>

            <p className="font-semibold">{task.Class?.code || "-"}</p>

            <p className="text-sm text-gray-500">{task.Class?.name || "-"}</p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users size={18} className="text-orange-500" />

              <span className="font-medium">Meeting</span>
            </div>

            <p className="font-semibold">
              Meeting #{task.Meeting?.meetingNumber || "-"}
            </p>

            <p className="text-sm text-gray-500">{task.Meeting?.name || "-"}</p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar size={18} className="text-orange-500" />

              <span className="font-medium">Meeting Date</span>
            </div>

            <p>
              {task.Meeting?.meetingDate
                ? formatDate(task.Meeting.meetingDate)
                : "-"}
            </p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <CheckSquare size={18} className="text-orange-500" />

              <span className="font-medium">Task Created</span>
            </div>

            <p>{task.createdAt ? formatDate(task.createdAt) : "-"}</p>
          </div>
        </div>

        {/* Attachment */}
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Attachment</h3>

              <p className="mt-1 text-sm text-gray-500">
                Download task attachment if available
              </p>
            </div>

            {task.fileUrl ? (
              <ActionButton action="download" href={task.fileUrl}>
                Download File
              </ActionButton>
            ) : (
              <span className="text-sm text-gray-500">No attachment</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
