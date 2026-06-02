import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {
    setNotes: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },

    setNotesLoading: (state, action) => {
      state.loading = action.payload;
    },

    setNotesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setNotes, setNotesLoading, setNotesError } = noteSlice.actions;

export default noteSlice.reducer;
