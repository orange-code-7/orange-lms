import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {
    setMeetingsLoading: (state, action) => {
      state.loading = action.payload;
    },

    setMeetings: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    setMeetingsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    resetMeetings: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setMeetingsLoading,
  setMeetings,
  setMeetingsError,
  resetMeetings,
} = meetingSlice.actions;

export default meetingSlice.reducer;
