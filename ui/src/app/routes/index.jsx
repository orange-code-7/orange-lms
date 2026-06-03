import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";
import RoleGuard from "./guards/RoleGuard";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Auth
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

// Dashboard
import Dashboard from "@/pages/dashboard";

// Classes
import ClassesList from "@/pages/classes";
import ClassesCreate from "@/pages/classes/Create";
import ClassesUpdate from "@/pages/classes/Edit";
import ClassesDetail from "@/pages/classes/Detail";

// Meetings
import MeetingsList from "@/pages/meetings";
import MeetingsCreate from "@/pages/meetings/Create";
import MeetingsUpdate from "@/pages/meetings/Edit";
import MeetingsDetail from "@/pages/meetings/Detail";

// Notes
import NotesList from "@/pages/notes";
import NotesCreate from "@/pages/notes/Create";
import NotesUpdate from "@/pages/notes/Edit";
import NotesDetail from "@/pages/notes/Detail";

// Tasks
import TasksList from "@/pages/tasks";
import TasksCreate from "@/pages/tasks/Create";
import TasksUpdate from "@/pages/tasks/Edit";
import TasksDetail from "@/pages/tasks/Detail";

// Materials
import MaterialsList from "@/pages/materials";
import MaterialsCreate from "@/pages/materials/Create";
import MaterialsUpdate from "@/pages/materials/Edit";
import MaterialsDetail from "@/pages/materials/Detail";

// Mentors
import MentorsList from "@/pages/mentors";
import MentorsCreate from "@/pages/mentors/Create";
import MentorsUpdate from "@/pages/mentors/Edit";
import MentorsDetail from "@/pages/mentors/Detail";

// Mentees
import MenteesList from "@/pages/mentees";
import MenteesCreate from "@/pages/mentees/Create";
import MenteesUpdate from "@/pages/mentees/Edit";
import MenteesDetail from "@/pages/mentees/Detail";

// Profile & Settings
import Profile from "@/pages/profile/Edit";
import Settings from "@/pages/settings";

// Not Found
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // ========================================
      // CLASSES
      // ========================================
      {
        path: "classes",
        children: [
          { index: true, element: <ClassesList /> },
          { path: "create", element: <ClassesCreate /> },
          { path: ":id", element: <ClassesDetail /> },
          { path: "update/:id", element: <ClassesUpdate /> },
        ],
      },

      // ========================================
      // MEETINGS
      // ========================================
      {
        path: "meetings",
        children: [
          { index: true, element: <MeetingsList /> },
          { path: "create", element: <MeetingsCreate /> },
          { path: ":id", element: <MeetingsDetail /> },
          { path: "update/:id", element: <MeetingsUpdate /> },
        ],
      },

      // ========================================
      // NOTES
      // ========================================
      {
        path: "notes",
        children: [
          { index: true, element: <NotesList /> },
          { path: "create", element: <NotesCreate /> },
          { path: ":id", element: <NotesDetail /> },
          { path: "update/:id", element: <NotesUpdate /> },
        ],
      },

      // ========================================
      // TASKS
      // ========================================
      {
        path: "tasks",
        children: [
          { index: true, element: <TasksList /> },
          { path: "create", element: <TasksCreate /> },
          { path: ":id", element: <TasksDetail /> },
          { path: "update/:id", element: <TasksUpdate /> },
        ],
      },

      // ========================================
      // MATERIALS
      // ========================================
      {
        path: "materials",
        children: [
          { index: true, element: <MaterialsList /> },
          { path: "create", element: <MaterialsCreate /> },
          { path: ":id", element: <MaterialsDetail /> },
          { path: "update/:id", element: <MaterialsUpdate /> },
        ],
      },

      // ========================================
      // MENTORS (OWNER & ADMIN)
      // ========================================
      {
        path: "mentors",
        element: (
          <RoleGuard roles={["Owner", "Admin"]}>
            <MentorsList />
          </RoleGuard>
        ),
      },
      {
        path: "mentors/create",
        element: (
          <RoleGuard roles={["Owner", "Admin"]}>
            <MentorsCreate />
          </RoleGuard>
        ),
      },
      {
        path: "mentors/:id",
        element: (
          <RoleGuard roles={["Owner", "Admin"]}>
            <MentorsDetail />
          </RoleGuard>
        ),
      },
      {
        path: "mentors/update/:id",
        element: (
          <RoleGuard roles={["Owner", "Admin"]}>
            <MentorsUpdate />
          </RoleGuard>
        ),
      },

      // ========================================
      // MENTEES (OWNER, ADMIN, MENTOR)
      // ========================================
      {
        path: "mentees",
        element: (
          <RoleGuard roles={["Owner", "Admin", "Mentor"]}>
            <MenteesList />
          </RoleGuard>
        ),
      },
      {
        path: "mentees/create",
        element: (
          <RoleGuard roles={["Owner", "Admin"]}>
            <MenteesCreate />
          </RoleGuard>
        ),
      },
      {
        path: "mentees/:id",
        element: (
          <RoleGuard roles={["Owner", "Admin", "Mentor"]}>
            <MenteesDetail />
          </RoleGuard>
        ),
      },
      {
        path: "mentees/update/:id",
        element: (
          <RoleGuard roles={["Owner", "Admin"]}>
            <MenteesUpdate />
          </RoleGuard>
        ),
      },

      // ========================================
      // PROFILE & SETTINGS
      // ========================================
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
