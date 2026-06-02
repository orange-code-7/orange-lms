# Orange LMS Frontend

Orange LMS Frontend is a modern Learning Management System (LMS) web application built with React, Vite, Tailwind CSS, and React Router.

The frontend provides role-based dashboards and learning management features for Owners, Admins, Mentors, and Mentees.

---

# Table of Contents

- Overview
- Features
- User Roles
- Technology Stack
- Architecture
- Folder Structure
- Pages
- Features
- Installation
- Environment Variables
- Running the Application
- Current Status
- Roadmap

---

# Overview

Orange LMS Frontend is designed to provide a modern, responsive, and scalable user interface for managing online learning activities.

The application follows a modular feature-based architecture to ensure maintainability and scalability as the project grows.

---

# Features

## Authentication

- Login
- Logout
- Protected Routes
- Role-Based Navigation
- Persistent Authentication

---

## Dashboard

Different dashboards for:

- Owner
- Admin
- Mentor
- Mentee

Dashboard statistics:

- Total Classes
- Active Classes
- Total Mentors
- Total Mentees
- Tasks Overview
- Attendance Overview

---

## User Management

### Mentors

- Mentor List
- Mentor Detail
- Mentor Create
- Mentor Update
- Mentor Delete

### Mentees

- Mentee List
- Mentee Detail
- Mentee Create
- Mentee Update
- Mentee Delete

---

## Class Management

### Classes

- Class List
- Class Detail
- Create Class
- Update Class
- Archive Class

---

## Meeting Management

### Meetings

- Meeting List
- Meeting Detail
- Create Meeting
- Update Meeting
- Delete Meeting

---

## Learning Resources

### Tasks

- Task List
- Task Detail
- Create Task
- Submit Task
- Grade Task

### Notes

- Notes List
- Notes Detail

### Materials

- Material List
- Material Detail

---

## Assessment System

### Attendance

- Attendance List
- Attendance Tracking
- Attendance Status

### Task Criteria

- Create Criteria
- Update Criteria
- Delete Criteria

### Assessment Results

- Submission Assessment
- Final Score
- Mentor Feedback

### Submission Criteria Scores

- Detailed Rubric Scoring

---

## History Classes

- Archive History
- Participant History
- Class Completion Records

---

# User Roles

---

## Owner

Permissions:

- Full System Access
- Manage Users
- Manage Classes
- Manage Assessments
- Manage Archives

---

## Admin

Permissions:

- Manage Users
- Manage Classes
- Manage Meetings
- Manage Assessments

---

## Mentor

Permissions:

- Manage Learning Resources
- Create Tasks
- Grade Assignments
- Manage Attendance

---

## Mentee

Permissions:

- View Classes
- Access Materials
- Submit Tasks
- View Grades

---

# Technology Stack

## Core

- React 19
- Vite

## Styling

- Tailwind CSS v4
- DaisyUI

## Routing

- React Router DOM v7

## State Management

- Redux Toolkit

## HTTP Client

- Axios

## Forms

- React Hook Form

## Icons

- Lucide React

## Animation

- Framer Motion

---

# Architecture

The application follows a modular architecture:

```txt
Pages
↓
Features
↓
Services
↓
API
```

---

# Folder Structure

```txt
orange-lms-frontend/
│
├── public/
│
├── src/
│
├── app/
│
│   ├── router/
│   ├── store/
│   └── providers/
│
├── pages/
│
│   ├── auth/
│   │   └── LoginPage.jsx
│   │
│   ├── dashboard/
│   │   └── DashboardPage.jsx
│   │
│   ├── mentors/
│   ├── mentees/
│   ├── classes/
│   ├── meetings/
│   ├── tasks/
│   ├── notes/
│   ├── materials/
│   ├── attendances/
│   ├── assessments/
│   └── history-classes/
│
├── features/
│
│   ├── auth/
│   ├── users/
│   ├── mentors/
│   ├── mentees/
│   ├── classes/
│   ├── meetings/
│   ├── tasks/
│   ├── notes/
│   ├── materials/
│   ├── attendance/
│   ├── assessment/
│   └── historyClass/
│
├── services/
│
│   ├── api.js
│   ├── auth.service.js
│   ├── user.service.js
│   ├── class.service.js
│   ├── meeting.service.js
│   ├── task.service.js
│   └── ...
│
├── layouts/
│
│   ├── MainLayout.jsx
│   ├── DashboardLayout.jsx
│   └── AuthLayout.jsx
│
├── components/
│
│   ├── ui/
│   ├── layouts/
│   ├── sections/
│   └── shared/
│
├── hooks/
│
├── constants/
│
├── utils/
│
├── assets/
│
├── routes/
│
├── App.jsx
│
└── main.jsx
```

---

# Main Pages

---

## Authentication

```txt
/login
```

---

## Dashboard

```txt
/
```

---

## Mentors

```txt
/mentors
/mentors/create
/mentors/:id
/mentors/:id/edit
```

---

## Mentees

```txt
/mentees
/mentees/create
/mentees/:id
/mentees/:id/edit
```

---

## Classes

```txt
/classes
/classes/create
/classes/:id
/classes/:id/edit
```

---

## Meetings

```txt
/classes/:classId/meetings
/classes/:classId/meetings/create
```

---

## Tasks

```txt
/tasks
/tasks/:id
```

---

## Notes

```txt
/notes
/notes/:id
```

---

## Materials

```txt
/materials
/materials/:id
```

---

## Assessment

```txt
/attendance
/task-criteria
/assessment-results
/submission-scores
```

---

## History Classes

```txt
/history-classes
```

---

# Environment Variables

Create a `.env` file:

```env
VITE_APP_NAME=Orange LMS

VITE_APP_ENV=development

VITE_API_URL=http://localhost:3000/api

VITE_UPLOAD_URL=http://localhost:3000/uploads
```

---

# Installation

Install dependencies:

```bash
npm install
```

---

# Run Development Server

```bash
npm run dev
```

Application URL:

```txt
http://localhost:5173
```

---

# Current Status

Frontend Version:

```txt
v1.0
```

Frontend Scope:

- Authentication
- Dashboard
- Mentor Management
- Mentee Management
- Class Management
- Meeting Management
- Task Management
- Notes Management
- Materials Management
- Assessment Management
- History Classes

Backend Compatibility:

```txt
Orange LMS Backend v3-server_phase2
```

---

# Roadmap

## Frontend V2

- Search
- Pagination
- Filtering
- Data Tables
- Advanced Forms

---

## Frontend V3

- Analytics Dashboard
- Attendance Charts
- Grade Charts
- Performance Reports

---

## Frontend V4

- Notifications
- Real-Time Updates
- Certificate Viewer
- Activity Timeline

---

# Project Status

```txt
Frontend Architecture Finalized
Ready for Feature Development
Backend Integration Ready
```

---

# License

Internal Project – Orange LMS

Copyright © Orange LMS
