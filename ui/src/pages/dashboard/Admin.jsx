import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ClassService from "@/services/modules/class.service";
import MeetingService from "@/services/modules/meeting.service";
import TaskService from "@/services/modules/task.service";
import NoteService from "@/services/modules/note.service";
import MaterialService from "@/services/modules/material.service";
import MentorService from "@/services/modules/mentor.service";
import MenteeService from "@/services/modules/mentee.service";

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          classesRes,
          meetingsRes,
          tasksRes,
          notesRes,
          materialsRes,
          mentorsRes,
          menteesRes,
        ] = await Promise.all([
          ClassService.getAll(),
          MeetingService.getAll(),
          TaskService.getAll(),
          NoteService.getAll(),
          MaterialService.getAll(),
          MentorService.getAll(),
          MenteeService.getAll(),
        ]);

        setClasses(classesRes.data || []);
        setMeetings(meetingsRes.data || []);
        setTasks(tasksRes.data || []);
        setNotes(notesRes.data || []);
        setMaterials(materialsRes.data || []);
        setMentors(mentorsRes.data || []);
        setMentees(menteesRes.data || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-[var(--color-text-muted)]">
        Loading dashboard...
      </div>
    );
  }

  const summaryData = [
    {
      title: "Classes",
      count: classes.length,
      color: "orange-500",
    },
    {
      title: "Meetings",
      count: meetings.length,
      color: "blue-500",
    },
    {
      title: "Tasks",
      count: tasks.length,
      color: "green-500",
    },
    {
      title: "Materials",
      count: materials.length,
      color: "purple-500",
    },
    {
      title: "Mentors",
      count: mentors.length,
      color: "cyan-500",
    },
    {
      title: "Mentees",
      count: mentees.length,
      color: "pink-500",
    },
  ];

  const today = new Date();

  const activeClasses = classes.filter(
    (cls) => new Date(cls.startDate) <= today && new Date(cls.endDate) >= today,
  );

  const upcomingClasses = classes.filter(
    (cls) => new Date(cls.startDate) > today,
  );

  const chartData = classes.map((cls) => ({
    name: cls.code,
    progress: cls.Meetings?.length || 0,
  }));

  return (
    <div className="p-3 space-y-6 bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Dashboard
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Orange LMS analytics and learning activity overview
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-6 gap-2">
        {summaryData.map((item) => (
          <div
            key={item.title}
            className={` bg-[var(--color-surface)] border border-gray-200 rounded-sm p-5 shadow-sm"`}
          >
            <p className="text-sm text-[var(--color-text-muted)]">
              {item.title}
            </p>

            <h2 className={`text-3xl font-bold mt-3 text-${item.color}`}>
              {item.count}
            </h2>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[var(--color-surface)] border border-gray-200 rounded-md p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-5 text-[var(--color-text)]">
          Class Progress Overview
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#ff6b00" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Active & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active */}
        {/* <div className="bg-[var(--color-surface)] border border-gray-200 rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Active Classes</h2>

          <div className="space-y-4">
            {activeClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex justify-between border-b border-gray-200 pb-3"
              >
                <span>{cls.name}</span>

                <span className="text-sm text-[var(--color-text-muted)]">
                  {cls.Meetings?.length || 0} Meetings
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Upcoming */}
        {/* <div className="bg-[var(--color-surface)] border border-gray-200 rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Upcoming Classes</h2>

          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex justify-between border-b border-gray-200 pb-3"
              >
                <span>{cls.name}</span>

                <span className="text-sm text-[var(--color-text-muted)]">
                  {cls.startDate}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
