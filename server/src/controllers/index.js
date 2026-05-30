const AuthController = require("./AuthController");
const UserController = require("./UserController");
const ProfileController = require("./ProfileController");

const ClassController = require("./ClassController");
const MeetingController = require("./MeetingController");

const TaskController = require("./TaskController");
const TaskSubmissionController = require("./TaskSubmissionController");

const NoteController = require("./NoteController");
const MaterialController = require("./MaterialController");

const MentorController = require("./MentorController");
const MenteeController = require("./MenteeController");

module.exports = {
  AuthController,
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
