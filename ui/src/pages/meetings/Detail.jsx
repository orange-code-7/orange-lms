import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBreadcrumbs from "@/hooks/useBreadcrumbs";
import MeetingService from "@/services/meetings.service";
import { CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";
import TabTable from "@/components/ui/TabTable";
import { formatDate } from "@/helpers/index";

const tabs = ["Attendance", "Notes", "Tasks", "Materials"];

const Details = () => {
  const { id } = useParams();
  const breadcrumbs = useBreadcrumbs([{ label: "Meetings", to: "/meetings" }]);

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Attendance");

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await MeetingService.getById(+id);
        setMeeting(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [id]);

  if (loading)
    return <div className="p-4 text-gray-500">Loading meeting...</div>;
  if (!meeting)
    return <div className="p-4 text-red-500">Meeting not found</div>;

  return (
    <div className="p-4 space-y-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500">
        {breadcrumbs.map((b) => (
          <span key={b.to}>{b.label} / </span>
        ))}
        <span className="font-medium">{meeting.meetingNumber}</span>
      </div>

      {/* Meeting Overview */}
      <div className="bg-white p-4 rounded shadow flex justify-between">
        <div>
          <h2 className="text-xl font-bold">{meeting.name}</h2>
          <p className="text-gray-600">{meeting.description}</p>
          <p className="text-gray-500 text-sm">
            {formatDate(meeting.meetingDate)} | {meeting.startHour} -{" "}
            {meeting.finishHour}
          </p>
          <p className="text-gray-500 text-sm">
            Mentor: {meeting.mentor?.name ?? "-"}
          </p>

          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
              meeting.status === "Done"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {meeting.status === "Done" ? "Done" : "Progress"}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="text-green-600 hover:text-green-800">
            <Edit2 size={20} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-4">
        {activeTab === "Attendance" && (
          <TabTable
            data={meeting.mentees || []}
            columns={[
              { key: "name", label: "Name" },
              {
                key: "present",
                label: "Status",
                render: (row) =>
                  row.present ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={16} /> Present
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle size={16} /> Absent
                    </span>
                  ),
              },
            ]}
          />
        )}

        {activeTab === "Notes" && (
          <TabTable
            data={meeting.Notes || []}
            columns={[
              { key: "id", label: "Id" },
              { key: "name", label: "Name" },
              { key: "description", label: "Description" },
              { key: "dueDate", label: "Due Date" },
              {
                key: "fileUrl",
                label: "Download",
                render: (row) =>
                  row.fileUrl ? (
                    <a
                      href={row.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
                    >
                      ⬇️ Download
                    </a>
                  ) : (
                    "-"
                  ),
              },
            ]}
          />
        )}

        {activeTab === "Tasks" && (
          <TabTable
            data={meeting.Tasks || []}
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "description", label: "Description" },
              { key: "dueDate", label: "Due Date" },
              { key: "maxScore", label: "Max Score" },
              {
                key: "fileUrl",
                label: "Download",
                render: (row) =>
                  row.fileUrl ? (
                    <a
                      href={row.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
                    >
                      ⬇️ Download
                    </a>
                  ) : (
                    "-"
                  ),
              },
            ]}
          />
        )}

        {activeTab === "Materials" && (
          <TabTable
            data={meeting.Materials || []}
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "description", label: "Description" },
              {
                key: "materials",
                label: "Uploaded By",
                render: (row) => row.MaterialUploadedBy?.name,
              },
              {
                key: "fileUrl",
                label: "Download",
                render: (row) =>
                  row.fileUrl ? (
                    <a
                      href={row.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
                    >
                      ⬇️ Download
                    </a>
                  ) : (
                    "-"
                  ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Details;
