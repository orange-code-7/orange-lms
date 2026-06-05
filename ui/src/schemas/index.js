// USER

export const userSchema = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
  },

  {
    name: "email",
    label: "Email",
    type: "email",
  },

  {
    name: "password",
    label: "Password",
    type: "text",
  },

  {
    name: "avatarUrl",
    label: "Avatar URL",
    type: "text",
  },

  {
    name: "age",
    label: "Age",
    type: "number",
  },

  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
  },

  {
    name: "city",
    label: "City",
    type: "text",
  },

  {
    name: "background",
    label: "Professional Background",
    type: "textarea",
  },
];

// CLASS

export const classSchema = [
  {
    name: "code",
    label: "Class Code",
    type: "text",
  },

  {
    name: "name",
    label: "Class Name",
    type: "text",
  },

  {
    name: "description",
    label: "Description",
    type: "textarea",
  },

  {
    name: "category",
    label: "Category",
    type: "text",
  },

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

  {
    name: "startDate",
    label: "Start Date",
    type: "date",
  },

  {
    name: "endDate",
    label: "End Date",
    type: "date",
  },

  {
    name: "MentorId",
    label: "Mentor",
    type: "select",
    options: [],
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Active", value: "Active" },
      { label: "Archived", value: "Archived" },
    ],
  },

  {
    name: "imageUrl",
    label: "Image URL",
    type: "text",
  },
];

// MEETING

export const meetingSchema = [
  {
    name: "meetingNumber",
    label: "Meeting Number",
    type: "number",
  },

  {
    name: "name",
    label: "Meeting Name",
    type: "text",
  },

  {
    name: "description",
    label: "Description",
    type: "textarea",
  },

  {
    name: "meetingDate",
    label: "Meeting Date",
    type: "date",
  },

  {
    name: "startHour",
    label: "Start Hour",
    type: "time",
  },

  {
    name: "finishHour",
    label: "Finish Hour",
    type: "time",
  },

  {
    name: "ClassId",
    label: "Class",
    type: "select",
    options: [],
  },

  {
    name: "imageUrl",
    label: "Image URL",
    type: "text",
  },
];

// TASK

export const taskSchema = [
  {
    name: "name",
    label: "Task Title",
    type: "text",
  },

  {
    name: "description",
    label: "Description",
    type: "textarea",
  },

  {
    name: "maxScore",
    label: "Max Score",
    type: "number",
  },

  {
    name: "dueDate",
    label: "Due Date",
    type: "date",
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Published", value: "Published" },
      { label: "Archived", value: "Archived" },
    ],
  },

  {
    name: "ClassId",
    label: "Class",
    type: "select",
    options: [],
  },

  {
    name: "MeetingId",
    label: "Meeting",
    type: "select",
    options: [],
  },

  {
    name: "fileUrl",
    label: "File URL",
    type: "text",
  },
];

// NOTE

export const noteSchema = [
  {
    name: "name",
    label: "Note Title",
    type: "text",
  },

  {
    name: "description",
    label: "Description",
    type: "textarea",
  },

  {
    name: "ClassId",
    label: "Class",
    type: "select",
    options: [],
  },

  {
    name: "MeetingId",
    label: "Meeting",
    type: "select",
    options: [],
  },

  {
    name: "fileUrl",
    label: "File URL",
    type: "text",
  },
];

// MATERIAL

export const materialSchema = [
  {
    name: "name",
    label: "Material Title",
    type: "text",
  },

  {
    name: "description",
    label: "Description",
    type: "textarea",
  },

  {
    name: "type",
    label: "Material Type",
    type: "select",
    options: [
      { label: "PDF", value: "PDF" },
      { label: "Video", value: "Video" },
      { label: "URL", value: "URL" },
      { label: "Document", value: "Document" },
    ],
  },

  {
    name: "ClassId",
    label: "Class",
    type: "select",
    options: [],
  },

  {
    name: "MeetingId",
    label: "Meeting",
    type: "select",
    options: [],
  },

  {
    name: "fileUrl",
    label: "File URL",
    type: "text",
  },
];

// PROFILE

export const profileSchema = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    disabled: true,
  },

  {
    name: "email",
    label: "Email",
    type: "email",
    disabled: true,
  },

  {
    name: "role",
    label: "Role",
    type: "text",
    disabled: true,
  },

  {
    name: "isActive",
    label: "Status",
    type: "text",
    disabled: true,
  },

  {
    name: "age",
    label: "Age",
    type: "number",
    disabled: true,
  },

  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    disabled: true,
  },

  {
    name: "city",
    label: "City",
    type: "text",
    disabled: true,
  },

  {
    name: "country",
    label: "Country",
    type: "text",
    disabled: true,
  },

  {
    name: "address",
    label: "Address",
    type: "textarea",
    disabled: true,
  },

  {
    name: "background",
    label: "Professional Background",
    type: "textarea",
    disabled: true,
  },
];
