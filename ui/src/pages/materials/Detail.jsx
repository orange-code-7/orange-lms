import {
  Download,
  Edit2,
  Trash2,
  Calendar,
  Award,
  BookOpen,
  Users,
  Archive,
  Pencil,
} from "lucide-react";

import { formatDate, can } from "@/helpers";
import { Link } from "react-router-dom";

const MaterialDetail = ({ material, role, onEdit, onDelete }) => {
  if (!material) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* LEFT */}
      <div className="lg:col-span-1">
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-sm bg-orange-100">
              <Award size={40} className="text-orange-600" />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold">
              {material.name}
            </h2>

            <span
              className={`mt-3 rounded-sm px-3 py-1 text-xs font-medium ${
                material.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            ></span>

            <div className="mt-5 w-full space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Created By</p>

                <p>{material.uploader?.name || "-"}</p>
              </div>
            </div>

            <div className="mt-5 flex w-full gap-2">
              {can(role, "material", "update") && (
                <Link
                  to={`/materials/edit/${material.id}`}
                  className="flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
              )}

              {can(role, "material", "delete") && (
                <button
                  onClick={() => handleRemove(material.id)}
                  className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-4 lg:col-span-3">
        {/* Description */}
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <h3 className="mb-3 font-semibold">Description</h3>

          <p className="text-sm leading-6 text-gray-600">
            {material.description || "-"}
          </p>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-orange-500" />

              <span className="font-medium">Class</span>
            </div>

            <p className="font-semibold">{material.Class?.code || "-"}</p>

            <p className="text-sm text-gray-500">
              {material.Class?.name || "-"}
            </p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users size={18} className="text-orange-500" />

              <span className="font-medium">Meeting</span>
            </div>

            <p className="font-semibold">
              Meeting #{material.Meeting?.meetingNumber}
            </p>

            <p className="text-sm text-gray-500">
              {material.Meeting?.name || "-"}
            </p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar size={18} className="text-orange-500" />

              <span className="font-medium">Meeting Date</span>
            </div>

            <p>
              {material.Meeting?.meetingDate
                ? formatDate(material.Meeting.meetingDate)
                : "-"}
            </p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Archive size={18} className="text-orange-500" />

              <span className="font-medium">Material Uploaded</span>
            </div>

            <p>{formatDate(material.createdAt) || "-"}</p>
          </div>
        </div>

        {/* Attachment */}
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Attachment</h3>

              <p className="mt-1 text-sm text-gray-500">
                Download material attachment if available
              </p>
            </div>

            {material.fileUrl ? (
              <a
                href={material.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                <Download size={16} />
                Download File
              </a>
            ) : (
              <span className="text-sm text-gray-500">No attachment</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;
