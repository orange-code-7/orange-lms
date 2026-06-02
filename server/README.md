# Orange LMS Backend

Orange LMS Backend is a Learning Management System (LMS) backend application built using Node.js, Express.js, PostgreSQL, and Sequelize ORM.

The system provides complete learning management functionality including authentication, class management, meetings, assignments, submissions, attendance tracking, grading, assessment rubrics, and class history archiving.

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

- Node.js
- Express.js

## Database

- PostgreSQL

## ORM

- Sequelize ORM

## Security

- JWT
- bcrypt

## Development Tools

- Nodemon
- Sequelize CLI
- dotenv

---

# Architecture

```txt
Client
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
PostgreSQL
```

---

# Database Modules

## Core Modules

### Users

### Profiles

### Classes

### ClassUsers

### Meetings

### Tasks

### TaskSubmissions

### Notes

### Materials

---

## Assessment Modules

### Attendances

### TaskCriterias

### AssessmentResults

### SubmissionCriteriaScores

### HistoryClasses

---

# API Workflow

```txt
Login
↓
Create Class
↓
Assign Mentor
↓
Enroll Mentees
↓
Create Meetings
↓
Upload Materials
↓
Create Tasks
↓
Mentee Submit Task
↓
Mentor Review Submission
↓
Create Assessment Result
↓
Create Criteria Scores
↓
Track Attendance
↓
Archive Class
↓
Store History
```

---

# Project Structure

```txt
orange-lms-backend/
│
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── .sequelizerc
│
├── src/
│
├── config/
│   └── config.js
│
├── models/
│   ├── index.js
│   ├── user.js
│   ├── profile.js
│   ├── class.js
│   ├── classUser.js
│   ├── meeting.js
│   ├── task.js
│   ├── taskSubmission.js
│   ├── note.js
│   ├── material.js
│   ├── attendance.js
│   ├── taskCriteria.js
│   ├── assessmentResult.js
│   ├── submissionCriteriaScore.js
│   └── historyClass.js
│
├── migrations/
│
├── seeders/
│
├── controllers/
│
├── services/
│
├── routes/
│
├── middlewares/
│
├── helpers/
│
├── constants/
│
├── permissions/
│
├── validations/
│
├── app.js
│
└── server.js
```

---

# Installation

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=3000

DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=orange_lms_dev
DB_HOST=127.0.0.1

JWT_SECRET=your_secret_key
```

---

# Database Migration

Run migrations:

```bash
npx sequelize-cli db:migrate
```

---

# Database Seeder

Run seeders:

```bash
npx sequelize-cli db:seed:all
```

---

# Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server URL:

```txt
http://localhost:3000
```

---

# Current Status

## Branch

```txt
v3-server_phase2
```

## Completed

### V1 — Foundation

- Authentication
- Authorization
- Users
- Profiles

### V2 — Learning Management

- Mentors
- Mentees
- Classes
- ClassUsers
- Meetings
- Tasks
- Task Submissions
- Notes
- Materials

### V3 — Assessment Engine

- Attendance
- Task Criteria
- Assessment Results
- Submission Criteria Scores
- History Classes

---

## Testing

Integration Testing:

```txt
15 / 15 Tests Passed
```

---

## Project Status

```txt
Backend MVP Completed
Production-Structured Architecture
Ready for Frontend Integration
```

---

# Roadmap

## V4

- Pagination
- Filtering
- Search
- Validation Schema
- Swagger Documentation Improvements

---

## V5

- Notification System
- Deadline Reminder System
- Dashboard Analytics
- Certificate Generator
- Export Reports

---

# License

Internal Project – Orange LMS

Copyright © Orange LMS
