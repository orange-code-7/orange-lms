import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";

// Auth
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";

// Dashboard
import Dashboard from "../../pages/dashboard";

// Pages by feature
import ClassesList from "../../pages/classes";
import ClassesCreate from "../../pages/classes/create";
import ClassesUpdate from "../../pages/classes/edit";
import ClassesDetail from "../../pages/classes/detail";

import MeetingsList from "../../pages/meetings";
import MeetingsCreate from "../../pages/meetings/create";
import MeetingsUpdate from "../../pages/meetings/edit";
import MeetingsDetail from "../../pages/meetings/detail";

import NotesList from "../../pages/notes";
import NotesCreate from "../../pages/notes/create";
import NotesUpdate from "../../pages/notes/edit";
import NotesDetail from "../../pages/notes/detail";

import TasksList from "../../pages/tasks";
import TasksCreate from "../../pages/tasks/create";
import TasksUpdate from "../../pages/tasks/edit";
import TasksDetail from "../../pages/tasks/detail";

import MaterialsList from "../../pages/materials";
import MaterialsCreate from "../../pages/materials/create";
import MaterialsUpdate from "../../pages/materials/edit";
import MaterialsDetail from "../../pages/materials/detail";

// Admin / Owner Only
import MentorsList from "../../pages/mentors";
import MentorsCreate from "../../pages/mentors/create";
import MentorsUpdate from "../../pages/mentors/edit";
import MentorsDetail from "../../pages/mentors/detail";

import MenteesList from "../../pages/mentees";
import MenteesCreate from "../../pages/mentees/create";
import MenteesUpdate from "../../pages/mentees/edit";
import MenteesDetail from "../../pages/mentees/detail";

// Profile & Setting
import Profile from "../../pages/profile/edit";
import Setting from "../../pages/setting";

// Not Found
import NotFound from "../../pages/NotFound";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
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
