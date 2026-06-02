import { createSlice } from "@reduxjs/toolkit";

const materialSlice = createSlice({
  name: "materials",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {
    setMaterialsLoading: (state, action) => {
      state.loading = action.payload;
    },

    setMaterials: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },

    setMaterialsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    resetMaterials: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setMaterialsLoading,
  setMaterials,
  setMaterialsError,
  resetMaterials,
} = materialSlice.actions;

export default materialSlice.reducer;
