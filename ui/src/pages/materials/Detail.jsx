import { Award, BookOpen, Calendar, Users, Archive } from "lucide-react";

import { Link } from "react-router-dom";

import { can, formatDate } from "@/helpers";

import ActionButton from "@/components/ui/buttons/ActionButton";

const MaterialDetail = ({ material, role, onDelete }) => {
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

            <div className="mt-5 w-full space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Uploaded By</p>

                <p>{material.uploader?.name || "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Type</p>

                <p>{material.type || "-"}</p>
              </div>
            </div>

            <div className="mt-5 flex w-full gap-2">
              {can(role, "material", "update") && (
                <Link to={`/materials/edit/${material.id}`}>
                  <ActionButton action="edit" />
                </Link>
              )}

              {can(role, "material", "delete") && (
                <ActionButton
                  action="delete"
                  onClick={() => onDelete?.(material.id)}
                />
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
              Meeting #{material.Meeting?.meetingNumber || "-"}
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

            <p>{material.createdAt ? formatDate(material.createdAt) : "-"}</p>
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
              <ActionButton action="download" href={material.fileUrl}>
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

export default MaterialDetail;
