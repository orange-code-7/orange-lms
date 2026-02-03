// services/index.js

const userService = require("./user.service");
const profileService = require("./profile.service");

const classService = require("./class.service");
const classUserService = require("./classUser.service");

const meetingService = require("./meeting.service");

const taskService = require("./task.service");
const taskSubmissionService = require("./taskSubmission.service.js");

const noteService = require("./note.service");
const materialService = require("./material.service");

const mentorService = require("./mentor.service.js");
const menteeService = require("./mentee.service.js");

module.exports = {
  // User
  userService,
  profileService,
  mentorService,
  menteeService,
  // Class
  classService,
  classUserService,

  // Learning Flow
  meetingService,
  taskService,
  taskSubmissionService,
  noteService,
  materialService,
};
