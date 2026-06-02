// src/pages/classes/Detail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabTable from "@/components/ui/tables/TabTable";
import useBreadcrumbs from "@/hooks/useBreadcrumbs";
import ClassService from "@/services/modules/class.service";
import { Trash2, Edit2, Eye } from "lucide-react";
import { formatDate } from "@/helpers";

const tabs = ["Meetings", "Mentees", "Notes", "Tasks", "Materials"];

const Detail = () => {
  const { id } = useParams();
  const breadcrumbs = useBreadcrumbs([{ label: "Classes", to: "/classes" }]);

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Meetings");

  // Fetch class by ID
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await ClassService.getById(+id);
        setClassData(res[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [id]);

  if (loading) return <div className="p-4 text-gray-500">Loading class...</div>;
  if (!classData)
    return <div className="p-4 text-red-500">Class not found</div>;

  return (
    <div className="p-4 space-y-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500">
        {breadcrumbs.map((b, i) => (
          <span key={b.to}>{b.label} - </span>
        ))}
        <span className="font-medium">{classData.code}</span>
      </div>

      {/* Class Overview */}
      <div className="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-2">{classData.name}</h2>
          <p className="text-gray-600 mb-2">{classData.description}</p>
          <p className="text-gray-500 text-sm mb-2">
            {formatDate(classData.startDate)} | {classData.startHour} -{" "}
            {classData.finishHour}
          </p>
          <p className="text-gray-500 text-sm font-semibold">
            Mentor: {classData.mentor?.name ?? "-"} | Mentees:
            {classData.mentee?.length ?? "-"}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-green-600 hover:text-green-800">
            <Edit2 size={20} /> Edit
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={20} /> Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b max-w-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Meetings" && (
          <TabTable
            data={classData.meeting || []}
            columns={[
              { key: "name", label: "Meeting Name" },
              { key: "description", label: " Description" },
              { key: "startHour", label: "Start Date" },
              { key: "finishHour", label: "Finish Date" },
              { key: "link", label: "Link" },
            ]}
          />
        )}
        {activeTab === "Notes" && (
          <TabTable
            data={classData.note || []}
            columns={[
              { key: "name", label: "Name" },
              { key: "description", label: "Description" },
              { key: "dueDate", label: "Due Date" },
              { key: "fileUrl", label: "File" },
            ]}
          />
        )}
        {activeTab === "Tasks" && (
          <TabTable
            data={classData.task || []}
            columns={[
              { key: "name", label: "Name" },
              { key: "description", label: "Description" },
              { key: "dueDate", label: "Due Date" },
              { key: "maxScore", label: "Max Score" },
              {
                key: "actions",
                label: "Actions",
                render: (row) => (
                  <button
                    onClick={() => alert(`Download task ${row.title}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Download
                  </button>
                ),
              },
            ]}
          />
        )}
        {activeTab === "Materials" && (
          <TabTable
            data={classData.material || []}
            columns={[
              { key: "name", label: "Name" },
              { key: "description", label: "Description" },
              { key: "fileUrl", label: "File" },
            ]}
          />
        )}
        {activeTab === "Mentees" && (
          <TabTable
            data={classData.Users || []}
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Detail;
