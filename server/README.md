# 🍊 Orange LMS Backend

Backend API for Orange LMS built with Node.js, Express.js, PostgreSQL, and Sequelize ORM.

---

## Overview

Orange LMS Backend provides authentication, authorization, class management, learning resources, assessments, submissions, and user management for the Orange Learning Management System.

The system supports multiple user roles:

- Owner
- Admin
- Mentor
- Mentee

---

## Core Features

### Authentication & Authorization

- JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes
- Permission-Based Access

### User Management

- Manage Users
- Manage Mentors
- Manage Mentees
- User Profiles

### Learning Management

- Classes
- Meetings
- Tasks
- Notes
- Materials

### Assessment Engine

- Attendance
- Task Criteria
- Assessment Results
- Submission Scores
- History Classes

### Learning Workflow

- Class Enrollment
- Mentor Assignment
- Task Submission
- Assessment Tracking
- Learning Progress

---

# Table of Contents

- Overview
- Features
- System Roles
- Technology Stack
- Architecture
- Database Modules
- API Workflow
- Project Structure
- Installation
- Environment Variables
- Database Migration
- Database Seeder
- Running the Application
- Current Status
- Roadmap

---

# Overview

Orange LMS is designed to help educational institutions, bootcamps, training centers, and online learning platforms manage their learning activities efficiently.

The backend follows a layered architecture:

```txt
Routes
→ Controllers
→ Services
→ Models
```

This architecture separates concerns and improves maintainability, scalability, and testability.

---

# Features

## Authentication & Authorization

- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access Control (RBAC)
- Protected API Routes
- Permission-Based Resource Access

---

## User Management

### Users

- Create User
- Update User
- Delete User
- Get User Details

### Profiles

- User Profile Information
- Personal Information
- Contact Information
- Background Information

### Mentor Management

- Create Mentor
- Update Mentor
- Delete Mentor
- View Mentor Details

### Mentee Management

- Create Mentee
- Update Mentee
- Delete Mentee
- View Mentee Details

---

## Learning Management

### Classes

- Create Class
- Update Class
- Delete Class
- Assign Mentor
- Manage Class Status

### Class Participants

Manage relationships between:

```txt
Classes ↔ Users
```

Including:

- Mentor Assignment
- Mentee Enrollment
- Role Tracking

---

### Meetings

Manage learning sessions:

- Create Meeting
- Update Meeting
- Delete Meeting
- View Meeting Details

---

### Learning Resources

#### Tasks

- Create Task
- Update Task
- Delete Task
- Publish Task

#### Notes

- Create Note
- Update Note
- Delete Note

#### Materials

- Upload Learning Materials
- Store Resource Information
- Organize Learning Assets

---

## Submission Management

### Task Submission

Mentees can:

- Submit Assignments
- Update Submission
- Track Submission Status

Mentors can:

- Review Submissions
- Assess Performance

---

# Assessment Engine (V3)

---

## Attendance

Track participant attendance:

- Present
- Absent
- Late
- Excused

Features:

- Attendance History
- Attendance Tracking
- Attendance Statistics Ready

---

## Task Criteria

Create assessment rubrics:

Examples:

- Code Quality
- Logic
- Architecture
- Performance
- UI/UX

Each criterion contains:

- Title
- Percentage
- Description

---

## Assessment Result

Store final assessment results:

- Final Score
- Mentor Feedback
- Graded By
- Graded At

---

## Submission Criteria Score

Store detailed scoring for each criterion:

Example:

```txt
Code Quality      → 38.5
Architecture      → 25
Logic             → 29
```

---

## History Class

Archive completed classes.

Features:

- Archive Class
- Restore Class
- Preserve Participant History
- Preserve Mentor History
- Preserve Mentee History
- Preserve Role In Class

Archive process automatically reads participants from ClassUsers.

---

# System Roles

Orange LMS supports four roles:

## Owner

Highest level permission.

Can:

- Manage all resources
- Delete sensitive data
- Restore archived resources

---

## Admin

Can:

- Manage classes
- Manage meetings
- Manage users
- Manage assessments

---

## Mentor

Can:

- Manage learning resources
- Create tasks
- Grade submissions
- Create assessment criteria
- Track attendance

---

## Mentee

Can:

- Join classes
- View learning resources
- Submit assignments
- View grades

---

# Technology Stack

## Backend

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

## ORM

- Sequelize ORM

### Security

- JWT
- Bcrypt

### Documentation

- Swagger/OpenAPI

---

## Project Structure

```txt
orange-lms-backend/
│
├── package.json
├── server.js
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
│
├── src/
│
├── config/
│   └── config.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── mentor.controller.js
│   ├── mentee.controller.js
│   ├── class.controller.js
│   ├── meeting.controller.js
│   ├── task.controller.js
│   ├── note.controller.js
│   ├── material.controller.js
│   └── ...
│
├── routes/
│   ├── auth.js
│   ├── user.js
│   ├── mentor.js
│   ├── mentee.js
│   ├── class.js
│   ├── meeting.js
│   ├── task.js
│   ├── note.js
│   ├── material.js
│   └── ...
│
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── mentor.service.js
│   ├── mentee.service.js
│   ├── class.service.js
│   ├── meeting.service.js
│   ├── task.service.js
│   ├── note.service.js
│   ├── material.service.js
│   └── ...
│
├── middlewares/
│   ├── authentication.js
│   ├── authorization.js
│   ├── errorHandler.js
│   └── ...
│
├── helpers/
│   ├── bcrypt.js
│   ├── jwt.js
│   └── ...
│
├── models/
├── migrations/
└── seeders/
```

---

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd orange-lms-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create:

```bash
.env
```

Example:

```env
PORT=3000

DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=orange_lms_dev
DB_HOST=127.0.0.1

JWT_SECRET=orange_lms_secret
```

### 4. Run Migration

```bash
npx sequelize db:migrate
```

### 5. Run Seeder

```bash
npx sequelize db:seed:all
```

### 6. Start Development Server

```bash
npm run dev
```

Server:

```txt
http://localhost:3000
```

---

## API Routes

### Authentication

```txt
POST   /auth/register
POST   /auth/login
```

### Users

```txt
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

### Classes

```txt
GET    /classes
POST   /classes
GET    /classes/:id
PUT    /classes/:id
DELETE /classes/:id
```

### Meetings

```txt
GET    /meetings
POST   /classes/:classId/meetings
GET    /meetings/:id
PUT    /meetings/:id
DELETE /meetings/:id
```

### Learning Resources

```txt
POST /meetings/:meetingId/tasks
POST /meetings/:meetingId/notes
POST /meetings/:meetingId/materials
```

---

## Development Status

### Core CRUD

- Users
- Mentors
- Mentees
- Classes
- Meetings
- Tasks
- Notes
- Materials

Status:

```txt
✅ Completed
```

### Assessment Engine

- Attendance
- Assessment Results
- Submission Scores
- History Classes

Status:

```txt
🚧 In Progress
```

---

## License

Private Project — Orange LMS
