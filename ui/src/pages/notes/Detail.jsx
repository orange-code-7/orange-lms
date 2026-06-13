import { Award, BookOpen, Calendar, FileText, Users } from "lucide-react";

import { Link } from "react-router-dom";

import { can, formatDate } from "@/helpers";

import ActionButton from "@/components/ui/buttons/ActionButton";

const NoteDetail = ({ note, role, onDelete }) => {
  if (!note) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* LEFT */}
      <div className="lg:col-span-1">
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-sm bg-orange-100">
              <Award size={40} className="text-orange-600" />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold">{note.name}</h2>

            <div className="mt-5 w-full space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Created By</p>

                <p>{note.creator?.name || "-"}</p>
              </div>
            </div>

            <div className="mt-5 flex w-full gap-2">
              {can(role, "note", "update") && (
                <Link to={`/notes/edit/${note.id}`}>
                  <ActionButton action="edit" />
                </Link>
              )}

              {can(role, "note", "delete") && (
                <ActionButton
                  action="delete"
                  onClick={() => onDelete?.(note.id)}
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
            {note.description || "-"}
          </p>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-orange-500" />

              <span className="font-medium">Class</span>
            </div>

            <p className="font-semibold">{note.Class?.code || "-"}</p>

            <p className="text-sm text-gray-500">{note.Class?.name || "-"}</p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users size={18} className="text-orange-500" />

              <span className="font-medium">Meeting</span>
            </div>

            <p className="font-semibold">
              Meeting #{note.Meeting?.meetingNumber || "-"}
            </p>

            <p className="text-sm text-gray-500">{note.Meeting?.name || "-"}</p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar size={18} className="text-orange-500" />

              <span className="font-medium">Meeting Date</span>
            </div>

            <p>
              {note.Meeting?.meetingDate
                ? formatDate(note.Meeting.meetingDate)
                : "-"}
            </p>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText size={18} className="text-orange-500" />

              <span className="font-medium">Note Created</span>
            </div>

            <p>{note.createdAt ? formatDate(note.createdAt) : "-"}</p>
          </div>
        </div>

        {/* Attachment */}
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Attachment</h3>

              <p className="mt-1 text-sm text-gray-500">
                Download note attachment if available
              </p>
            </div>

            {note.fileUrl ? (
              <ActionButton action="download" href={note.fileUrl}>
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

export default NoteDetail;
