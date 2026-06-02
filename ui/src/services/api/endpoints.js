const ENDPOINTS = {
  /**
   * Auth
   */
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },

  /**
   * User Management
   */
  USERS: "/users",
  MENTORS: "/mentors",
  MENTEES: "/mentees",

  /**
   * Classes
   */
  CLASSES: "/classes",

  /**
   * Nested Meetings
   */
  CLASS_MEETINGS: (classId) => `/classes/${classId}/meetings`,

  /**
   * Flat Meetings
   */
  MEETINGS: "/meetings",

  /**
   * Nested Learning Resources
   */
  MEETING_TASKS: (meetingId) => `/meetings/${meetingId}/tasks`,
  MEETING_NOTES: (meetingId) => `/meetings/${meetingId}/notes`,
  MEETING_MATERIALS: (meetingId) => `/meetings/${meetingId}/materials`,

  /**
   * Flat Learning Resources
   */
  TASKS: "/tasks",
  NOTES: "/notes",
  MATERIALS: "/materials",

  /**
   * V3 Assessment Engine
   */
  ATTENDANCES: "/attendances",
  TASK_CRITERIA: "/task-criteria",
  ASSESSMENT_RESULTS: "/assessment-results",
  SUBMISSION_SCORES: "/submission-scores",
  HISTORY_CLASSES: "/history-classes",
};

export default ENDPOINTS;
