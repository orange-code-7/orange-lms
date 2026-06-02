import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {
    setTasks: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },

    setTasksLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTasksError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTasks, setTasksLoading, setTasksError } = taskSlice.actions;

export default taskSlice.reducer;
