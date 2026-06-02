import { combineReducers } from "@reduxjs/toolkit";

import {
  authReducer,
  classReducer,
  meetingReducer,
  materialReducer,
  menteeReducer,
  mentorReducer,
  noteReducer,
  taskReducer,
} from "./slices";

const rootReducer = combineReducers({
  auth: authReducer,
  classes: classReducer,
  meetings: meetingReducer,
  materials: materialReducer,
  mentees: menteeReducer,
  mentors: mentorReducer,
  notes: noteReducer,
  tasks: taskReducer,
});

export default rootReducer;
