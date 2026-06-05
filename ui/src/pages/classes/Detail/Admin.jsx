// src/pages/classes/Detail.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TabTable from "@/components/ui/tables/TabTable";
import useBreadcrumbs from "@/hooks/useBreadcrumbs";
import PopUp from "@/components/ui/popup/PopUp";
import ClassService from "@/services/modules/class.service";
import MenteeService from "@/services/modules/mentee.service";

import {
  Trash2,
  Edit2,
  Eye,
  Download,
  Calendar,
  Users,
  CheckSquare,
  FileText,
  Archive,
} from "lucide-react";
import { formatDate } from "@/helpers";

const tabs = ["Meetings", "Mentees", "Tasks", "Notes", "Materials"];

const Detail = () => {
  const { id } = useParams();
  const breadcrumbs = useBreadcrumbs([{ label: "Classes", to: "/classes" }]);

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Meetings");

  // Select Mentee
  const [openEnrollPopup, setOpenEnrollPopup] = useState(false);
  const [availableMentees, setAvailableMentees] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState("");

  // Select Bulk Mentees
  const [openEnrollPopupBulk, setOpenEnrollPopupBulk] = useState(false);
  const [availableBulkMentees, setAvailableBulkMentees] = useState([]);
  const [selectedBulkMentees, setSelectedBulkMentees] = useState([]);

  const handleOpenEnrollPopup = async () => {
    try {
      const res = await MenteeService.getAll();

      const enrolledIds = classData.mentees?.map((m) => m.id) || [];

      const available = res.data.filter((m) => !enrolledIds.includes(m.id));

      setAvailableMentees(available);

      setOpenEnrollPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Select Bulk Mentees
  const handleOpenEnrollPopupBulk = async () => {
    try {
      const res = await MenteeService.getAll();

      const enrolledIds = classData?.mentees?.map((m) => m.id) || [];

      const available = res.data.filter((m) => !enrolledIds.includes(m.id));

      setAvailableBulkMentees(available);

      setOpenEnrollPopupBulk(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleMentee = (id) => {
    setSelectedBulkMentees((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  const handleAssignMentees = async () => {
    try {
      if (!selectedBulkMentees.length) return;

      await ClassService.enrollMentees(classData.id, {
        UserIds: selectedBulkMentees,
      });

      const res = await ClassService.getById(classData.id);

      setClassData(res.data);

      setSelectedBulkMentees([]);
      setOpenEnrollPopup(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveMentee = async (mentee) => {
    try {
      await ClassService.removeMentee(classData.id, mentee.id);

      const res = await ClassService.getById(classData.id);

      setClassData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // ======

  const handleEnrollMentee = async () => {
    try {
      await ClassService.enrollMentee(classData.id, {
        UserId: Number(selectedMentee),
      });

      const res = await ClassService.getById(classData.id);

      setClassData(res.data);

      setSelectedMentee("");
      setOpenEnrollPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await ClassService.getById(+id);
        setClassData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading class...</div>;
  }

  if (!classData) {
    return <div className="p-4 text-red-500">Class not found</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        {breadcrumbs.map((b) => (
          <span key={b.to}>{b.label} / </span>
        ))}
        <span className="font-medium">{classData.code}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* LEFT */}
        <div className="lg:col-span-1 rounded-sm border border-gray-200 bg-white p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
              {classData.code}
            </span>

            <span
              className={`rounded-sm px-2 py-1 text-xs font-medium ${
                classData.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {classData.status}
            </span>

            <span className="rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              {classData.category}
            </span>

            <span className="rounded-sm bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
              {classData.level}
            </span>
          </div>

          <h1 className="text-2xl font-bold">{classData.name}</h1>

          <p className="mt-3 text-sm text-gray-600">
            {classData.description || "-"}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Mentor</p>
              <p className="font-medium">{classData.mentor?.name || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Created By</p>
              <p className="font-medium">{classData.creator?.name || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Start Date</p>
              <p>
                {classData.startDate ? formatDate(classData.startDate) : "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">End Date</p>
              <p>{classData.endDate ? formatDate(classData.endDate) : "-"}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200">
              <Edit2 size={16} />
              Edit
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
          <div className="my-2">
            <h3 className="text-lg mb-4 font-semibold">Statistics</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Meetings</span>
                <span className="font-bold">
                  {classData.meetings?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Mentees</span>
                <span className="font-bold">
                  {classData.students?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Tasks</span>
                <span className="font-bold">
                  {classData.tasks?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Notes</span>
                <span className="font-bold">
                  {classData.notes?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Materials</span>
                <span className="font-bold">
                  {classData.materials?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 rounded-sm border border-gray-200 bg-white p-5">
          <div className="mt-4 rounded-sm border border-gray-200 bg-white px-5">
            <div className="flex flex-wrap gap-6">
              {tabs.map((tab) => {
                const icons = {
                  Meetings: Calendar,
                  Mentees: Users,
                  Tasks: CheckSquare,
                  Notes: FileText,
                  Materials: Archive,
                };

                const Icon = icons[tab];

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 py-4 text-sm font-medium transition ${
                      activeTab === tab
                        ? "border-b-2 border-orange-500 text-orange-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meetings */}
          {activeTab === "Meetings" && (
            <TabTable
              data={classData.meetings || []}
              columns={[
                {
                  key: "meetingNumber",
                  label: "#",
                },
                {
                  key: "name",
                  label: "Meeting",
                },
                {
                  key: "description",
                  label: "Description",
                },
                {
                  key: "meetingDate",
                  label: "Date",
                  render: (row) =>
                    row.meetingDate ? formatDate(row.meetingDate) : "-",
                },
                {
                  key: "actions",
                  label: "Actions",
                  render: (row) => (
                    <Link
                      to={`/meetings/${row.id}`}
                      className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                    >
                      <Eye size={14} />
                      View
                    </Link>
                  ),
                },
              ]}
            />
          )}

          {/* Mentees */}
          {activeTab === "Mentees" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={handleOpenEnrollPopupBulk}
                  className="rounded-sm bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Add Mentee
                </button>
              </div>

              <TabTable
                data={classData.mentees || []}
                columns={[
                  {
                    key: "id",
                    label: "ID",
                  },
                  {
                    key: "name",
                    label: "Name",
                  },
                  {
                    key: "email",
                    label: "Email",
                  },
                  {
                    key: "actions",
                    label: "Actions",
                    render: (row) => (
                      <div className="flex gap-2">
                        <Link
                          to={`/mentees/${row.id}`}
                          className="flex items-center gap-1 rounded-sm bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
                        >
                          <Eye size={14} />
                          Details
                        </Link>

                        <button
                          onClick={() => handleRemoveMentee(row)}
                          className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
          {/* Notes */}
          {activeTab === "Notes" && (
            <TabTable
              data={classData.notes || []}
              columns={[
                {
                  key: "id",
                  label: "ID",
                },
                {
                  key: "name",
                  label: "Name",
                },
                {
                  key: "description",
                  label: "Description",
                },
                {
                  key: "fileUrl",
                  label: "Attachment",
                  render: (row) =>
                    row.fileUrl ? (
                      <a
                        href={row.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                      >
                        <Download size={12} />
                        Download
                      </a>
                    ) : (
                      "-"
                    ),
                },
              ]}
            />
          )}

          {/* Tasks */}
          {activeTab === "Tasks" && (
            <TabTable
              data={classData.tasks || []}
              columns={[
                {
                  key: "id",
                  label: "ID",
                },
                {
                  key: "name",
                  label: "Name",
                },
                {
                  key: "description",
                  label: "Description",
                },
                {
                  key: "maxScore",
                  label: "Max Score",
                },
                {
                  key: "dueDate",
                  label: "Due Date",
                  render: (row) =>
                    row.dueDate ? formatDate(row.dueDate) : "-",
                },
              ]}
            />
          )}

          {/* Materials */}
          {activeTab === "Materials" && (
            <TabTable
              data={classData.materials || []}
              columns={[
                {
                  key: "id",
                  label: "ID",
                },
                {
                  key: "name",
                  label: "Name",
                },
                {
                  key: "type",
                  label: "Type",
                },
                {
                  key: "description",
                  label: "Description",
                },
                {
                  key: "fileUrl",
                  label: "Attachment",
                  render: (row) =>
                    row.fileUrl ? (
                      <a
                        href={row.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                      >
                        <Download size={12} />
                        Download
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

      <PopUp
        open={openEnrollPopup}
        onClose={() => setOpenEnrollPopup(false)}
        title="Add Mentee"
        width="max-w-lg"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Select Mentee
            </label>

            <select
              value={selectedMentee}
              onChange={(e) => setSelectedMentee(e.target.value)}
              className="w-full rounded-sm border border-gray-200 px-3 py-2"
            >
              <option value="">Choose Mentee</option>

              {availableMentees.map((mentee) => (
                <option key={mentee.id} value={mentee.id}>
                  {mentee.name} ({mentee.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpenEnrollPopup(false)}
              className="rounded-sm border border-gray-200 px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleEnrollMentee}
              className="rounded-sm bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Add Mentee
            </button>
          </div>
        </div>
      </PopUp>
      {/* Select Bulk Mentee */}
      <PopUp
        open={openEnrollPopupBulk}
        onClose={() => setOpenEnrollPopupBulk(false)}
        title="Assign Mentees"
        width="max-w-xl"
      >
        <div className="space-y-3">
          {availableBulkMentees.map((mentee) => (
            <label
              key={mentee.id}
              className="flex items-center gap-3 rounded-sm border border-gray-200 p-3"
            >
              <input
                type="checkbox"
                checked={selectedBulkMentees.includes(mentee.id)}
                onChange={() => handleToggleMentee(mentee.id)}
              />

              <div>
                <p className="font-medium">{mentee.name}</p>
                <p className="text-sm text-gray-500">{mentee.email}</p>
              </div>
            </label>
          ))}

          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-gray-500">
              Selected: {selectedBulkMentees.length}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setOpenEnrollPopupBulk(false)}
                className="rounded-sm border border-gray-200 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleAssignMentees}
                className="rounded-sm bg-orange-500 px-4 py-2 text-white"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default Detail;
