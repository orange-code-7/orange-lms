const authService = require("./auth.service");

const userService = require("./user.service");
const profileService = require("./profile.service");

const mentorService = require("./mentor.service");
const menteeService = require("./mentee.service");

const classService = require("./class.service");
const classUserService = require("./classUser.service");

const meetingService = require("./meeting.service");

const taskService = require("./task.service");
const taskSubmissionService = require("./taskSubmission.service");

const noteService = require("./note.service");
const materialService = require("./material.service");

// V3
const attendanceService = require("./attendance.service");
const taskCriteriaService = require("./taskCriteria.service");
const submissionCriteriaScoreService = require("./submissionCriteriaScore.service");
const assesmentResultService = require("./assesmentResult.service");
const historyClassService = require("./historyClass.service");

module.exports = {
  authService,

  userService,
  profileService,

  mentorService,
  menteeService,

  classService,
  classUserService,

  meetingService,

  taskService,
  taskSubmissionService,

  noteService,
  materialService,

  attendanceService,
  taskCriteriaService,
  submissionCriteriaScoreService,
  assesmentResultService,
  historyClassService,
};
