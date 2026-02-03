import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ClassService from "@/services/class.service";
import MeetingService from "@/services/meetings.service";
import TaskService from "@/services/tasks.service";
import NoteService from "@/services/notes.service";
import MaterialService from "@/services/materials.service";

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL DASHBOARD DATA
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [classesRes, meetingsRes, tasksRes, notesRes, materialsRes] =
          await Promise.all([
            ClassService.getAll(),
            MeetingService.getAll(),
            TaskService.getAll(),
            NoteService.getAll(),
            MaterialService.getAll(),
          ]);

        setClasses(classesRes);
        setMeetings(meetingsRes);
        setTasks(tasksRes);
        setNotes(notesRes);
        setMaterials(materialsRes);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  // SUMMARY
  const summaryData = [
    {
      title: "Classes",
      count: classes.length,
      color: "border-r-8 border-blue-700",
    },
    {
      title: "Meetings",
      count: meetings.length,
      color: "border-r-8 border-green-700",
    },
    {
      title: "Notes",
      count: notes.length,
      color: "border-r-8 border-yellow-700",
    },
    {
      title: "Tasks",
      count: tasks.length,
      color: "border-r-8 border-stone-700",
    },
    {
      title: "Materials",
      count: materials.length,
      color: "border-r-8 border-pink-700",
    },
  ];

  // ACTIVE & UPCOMING CLASSES
  const today = new Date();

  const activeClasses = classes.filter(
    (cls) => new Date(cls.startDate) <= today && new Date(cls.endDate) >= today,
  );

  const upcomingClasses = classes.filter(
    (cls) => new Date(cls.startDate) > today,
  );

  // CHART DATA (progress)
  const chartData = classes.map((cls) => {
    const heldMeetings = cls.meeting?.length || 0;
    const progress = (heldMeetings / cls.meeting.length) * 100;

    return {
      name: cls.code,
      progress: Math.round(progress),
    };
  });

  return (
    <div className="p-6 space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {summaryData.map((item) => (
          <Card className={item.color} key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Class Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ACTIVE / UPCOMING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {activeClasses.map((cls) => (
                <li key={cls.id} className="flex justify-between">
                  <span className="">{cls.title}</span>
                  <span className="text-sm text-gray-500">
                    Meetings: {cls.meeting?.length || 0}/{cls.meeting.length}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingClasses.map((cls) => (
                <li key={cls.id} className="flex justify-between">
                  <span>{cls.title}</span>
                  <span className="text-sm text-gray-500">
                    Starts: {cls.startDate}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
