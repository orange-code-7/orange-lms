// controllers/index.js

const UserController = require("./UserController");
const ProfileController = require("./ProfileController.js");

const ClassController = require("./ClassController");
const MeetingController = require("./MeetingController");

const TaskController = require("./TaskController");
const TaskSubmissionController = require("./TaskSubmissionController");

const NoteController = require("./NoteController");
const MaterialController = require("./MaterialController");

const MentorController = require("./MentorController.js");
const MenteeController = require("./MenteeController.js");

module.exports = {
  UserController,
  ProfileController,
  MentorController,
  MenteeController,
  ClassController,
  MeetingController,
  TaskController,
  TaskSubmissionController,
  NoteController,
  MaterialController,
};
