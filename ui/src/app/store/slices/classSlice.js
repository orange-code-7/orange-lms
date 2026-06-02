import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
  name: "classes",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setClasses: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    resetClasses: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setClasses, setError, resetClasses } =
  classSlice.actions;

export default classSlice.reducer;
