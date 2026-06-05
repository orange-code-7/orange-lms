# 🍊 Orange LMS Frontend

Frontend application for Orange LMS built with React, Vite, Tailwind CSS, Redux Toolkit, and React Router.

---

## Overview

Orange LMS Frontend provides a modern Learning Management System interface for:

- Owner
- Admin
- Mentor
- Mentee

The application supports class management, meeting management, learning resources, assessments, and student progress tracking.

---

## Tech Stack

### Core

- React 19
- Vite
- JavaScript (ES6+)

### Styling

- Tailwind CSS v4

### State Management

- Redux Toolkit

### Routing

- React Router DOM

### API

- Axios

### UI

- Lucide React
- React Loading Skeleton

---

## Features

### Dashboard

- Owner Dashboard
- Admin Dashboard
- Mentor Dashboard
- Mentee Dashboard

### User Management

- Mentors
- Mentees

### Learning Management

- Classes
- Meetings
- Tasks
- Notes
- Materials

### Assessment

- Attendance
- Assessment Results
- Progress Tracking

### UI Features

- Success Popup
- Error Popup
- Confirmation Popup
- Reusable Forms
- Reusable Tables
- RBAC UI Permissions

---

## Project Structure

```txt
orange-lms-frontend/
│
├── public/
│
├── src/
│
├── app/
│   ├── App.jsx
│   ├── store.js
│   └── routes.jsx
│
├── components/
│   ├── layouts/
│   ├── sections/
│   └── ui/
│
├── constants/
│
├── features/
│   ├── auth/
│   ├── theme/
│   └── ...
│
├── hooks/
│
├── helpers/
│
├── pages/
│   ├── dashboard/
│   ├── mentors/
│   ├── mentees/
│   ├── classes/
│   ├── meetings/
│   ├── tasks/
│   ├── notes/
│   └── materials/
│
├── schemas/
│
├── services/
│   ├── api/
│   └── modules/
│
├── styles/
│
└── main.jsx
```

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create:

```bash
.env.local
```

Example:

```env
VITE_APP_NAME=Orange LMS

VITE_API_URL=http://localhost:3000/api

VITE_UPLOAD_URL=http://localhost:3000/uploads
```

### 3. Start Development Server

```bash
npm run dev
```

Application:

```txt
http://localhost:5173
```

---

## Development Status

### Core CRUD

```txt
✅ Mentors
✅ Mentees
✅ Classes
✅ Meetings
✅ Tasks
✅ Notes
✅ Materials
```

### Current Progress

```txt
✅ Core CRUD Completed
🚧 Assessment Engine
🚧 Task Submission
🚧 Attendance
🚧 History Classes
```

---

## License

Private Project — Orange LMS
