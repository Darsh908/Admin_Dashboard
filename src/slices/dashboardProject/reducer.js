import { createSlice } from "@reduxjs/toolkit";
import { getProjectChartsData, getProjectStatusChartsData } from "./thunk";

export const initialState = {
  projectData: [],
  projectStatusData: [],
  selectedProject: JSON.parse(localStorage.getItem("selectedProject")) || null, // Retrieve from local storage
  error: {},
};

const DashboardProjectSlice = createSlice({
  name: "DashboardProject",
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
      localStorage.setItem("selectedProject", JSON.stringify(action.payload)); // Persist to local storage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectChartsData.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
    builder.addCase(getProjectChartsData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export const { setSelectedProject } = DashboardProjectSlice.actions;

export default DashboardProjectSlice.reducer;
