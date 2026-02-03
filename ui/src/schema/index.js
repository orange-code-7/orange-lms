import { User, Mail, Phone, MapPin, FileText } from "lucide-react";

export const mentorSchema = [
  { name: "name", label: "Full Name", type: "text", icon: User },
  { name: "email", label: "Email", type: "email", icon: Mail },
  { name: "avatarUrl", label: "Avatar URL", type: "text" },
  { name: "age", label: "Age", type: "number" },
  { name: "phoneNumber", label: "Phone Number", type: "text", icon: Phone },
  { name: "city", label: "City", type: "text", icon: MapPin },
  {
    name: "background",
    label: "Background",
    type: "textarea",
    icon: FileText,
  },
];

export const menteeSchema = [
  { name: "name", label: "Full Name", type: "text", icon: User },
  { name: "email", label: "Email", type: "email", icon: Mail },
  { name: "avatarUrl", label: "Avatar URL", type: "text" },
  { name: "age", label: "Age", type: "number" },
  { name: "phoneNumber", label: "Phone Number", type: "text", icon: Phone },
  { name: "city", label: "City", type: "text", icon: MapPin },
  {
    name: "background",
    label: "Background",
    type: "textarea",
    icon: FileText,
  },
];
// schema/class.schema.js
export const classSchema = [
  { name: "code", label: "Class Code", type: "text" },
  { name: "name", label: "Class Name", type: "text" },
  { name: "category", label: "Category", type: "text" },
  {
    name: "level",
    label: "Level",
    type: "select",
    options: [
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advanced", value: "Advanced" },
    ],
  },

  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },

  {
    name: "mentorId",
    label: "Mentor",
    type: "select",
    options: [], // <- akan diisi dari API
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },

  { name: "imageUrl", label: "Image URL", type: "text" },
];

export const meetingSchema = [
  { name: "name", label: "Meeting Name", type: "text" },
  { name: "meetingNumber", label: "Meeting Number", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "meetingDate", label: "Meeting Date", type: "date" },
  { name: "startHour", label: "Start Hour", type: "time" },
  { name: "finishHour", label: "Finish Hour", type: "time" },
  {
    name: "classId",
    label: "Class Code",
    type: "select",
    options: [],
  },
  {
    name: "imageUrl",
    label: "Image URL",
    type: "text",
  },
];

export const noteSchema = [
  { name: "name", label: "Note Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "classId",
    label: "Class",
    type: "select",
    options: [],
  },
  {
    name: "meetingId",
    label: "Meeting",
    type: "select",
    options: [],
  },

  { name: "fileUrl", label: "File URL", type: "text" },
];

export const taskSchema = [
  { name: "name", label: "Task Title", type: "text" },
  { name: "maxScore", label: "Max Score", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "dueDate", label: "Due Date", type: "date" },
  {
    name: "classId",
    label: "Class",
    type: "select",
    options: [],
  },
  {
    name: "meetingId",
    label: "Meeting",
    type: "select",
    options: [],
  },

  { name: "fileUrl", label: "File URL", type: "text" },
];

export const materialSchema = [
  { name: "name", label: "Material Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "classId",
    label: "Class",
    type: "select",
    options: [],
  },
  {
    name: "meetingId",
    label: "Meeting",
    type: "select",
    options: [],
  },

  { name: "fileUrl", label: "File URL", type: "text" },
];
