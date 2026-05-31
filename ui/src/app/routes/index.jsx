import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";

// Auth
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

// Dashboard
import Dashboard from "../../pages/dashboard/Dashboard";

// Pages by feature
import ClassesList from "../../pages/classes/List";
import ClassesCreate from "../../pages/classes/Create";
import ClassesUpdate from "../../pages/classes/Update";
import ClassesDetail from "../../pages/classes/Detail";

import MeetingsList from "../../pages/meetings/List";
import MeetingsCreate from "../../pages/meetings/Create";
import MeetingsUpdate from "../../pages/meetings/Update";
import MeetingsDetail from "../../pages/meetings/Detail";

import NotesList from "../../pages/notes/List";
import NotesCreate from "../../pages/notes/Create";
import NotesUpdate from "../../pages/notes/Update";
import NotesDetail from "../../pages/notes/Detail";

import TasksList from "../../pages/tasks/List";
import TasksCreate from "../../pages/tasks/Create";
import TasksUpdate from "../../pages/tasks/Update";
import TasksDetail from "../../pages/tasks/Detail";

import MaterialsList from "../../pages/materials/List";
import MaterialsCreate from "../../pages/materials/Create";
import MaterialsUpdate from "../../pages/materials/Update";
import MaterialsDetail from "../../pages/materials/Detail";

// Admin / Owner Only
import MentorsList from "../../pages/mentors/List";
import MentorsCreate from "../../pages/mentors/Create";
import MentorsUpdate from "../../pages/mentors/Update";
import MentorsDetail from "../../pages/mentors/Detail";

import MenteesList from "../../pages/mentees/List";
import MenteesCreate from "../../pages/mentees/Create";
import MenteesUpdate from "../../pages/mentees/Update";
import MenteesDetail from "../../pages/mentees/Detail";

// Profile & Setting
import Profile from "../../pages/profile/Profile";
import Setting from "../../pages/setting/Setting";

// Not Found
import NotFound from "../../pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "", element: <Navigate to="login" replace /> },
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
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },

      // Classes
      {
        path: "classes",
        children: [
          { index: true, element: <ClassesList /> },
          { path: "create", element: <ClassesCreate /> },
          { path: ":id", element: <ClassesDetail /> },
          { path: "update/:id", element: <ClassesUpdate /> },
        ],
      },

      // Meetings
      {
        path: "meetings",
        children: [
          { index: true, element: <MeetingsList /> },
          { path: "create", element: <MeetingsCreate /> },
          { path: ":id", element: <MeetingsDetail /> },
          { path: "update/:id", element: <MeetingsUpdate /> },
        ],
      },

      // Notes
      {
        path: "notes",
        children: [
          { index: true, element: <NotesList /> },
          { path: "create", element: <NotesCreate /> },
          { path: ":id", element: <NotesDetail /> },
          { path: "update/:id", element: <NotesUpdate /> },
        ],
      },

      // Tasks
      {
        path: "tasks",
        children: [
          { index: true, element: <TasksList /> },
          { path: "create", element: <TasksCreate /> },
          { path: ":id", element: <TasksDetail /> },
          { path: "update/:id", element: <TasksUpdate /> },
        ],
      },

      // Materials
      {
        path: "materials",
        children: [
          { index: true, element: <MaterialsList /> },
          { path: "create", element: <MaterialsCreate /> },
          { path: ":id", element: <MaterialsDetail /> },
          { path: "update/:id", element: <MaterialsUpdate /> },
        ],
      },

      // Admin & Owner Only
      {
        path: "mentors",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MentorsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentors/create",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MentorsCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentors/:id",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MentorsDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentors/update/:id",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MentorsUpdate />
          </ProtectedRoute>
        ),
      },

      {
        path: "mentees",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MenteesList />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentees/create",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MenteesCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentees/:id",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MenteesDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentees/update/:id",
        element: (
          <ProtectedRoute roles={["Admin", "Owner"]}>
            <MenteesUpdate />
          </ProtectedRoute>
        ),
      },

      // Profile & Setting (all roles)
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // Catch all
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
