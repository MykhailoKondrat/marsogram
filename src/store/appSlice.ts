import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../Interfaces/AppInterfaces";

const testState = {
  value: 0,
};

const initialState: AppState = {
  loading: false,
  currentPage: 0,
  availableRovers: {
    curiosity: {
      name: "curiosity",
      cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    },
    opportunity: {
      name: "opportunity",
      cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
    spirit: {
      name: "spirit",
      cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
  },
  fetchedPhotos: [],
};
// fetching data thunk. For each sequential request page should increase by 1.
// If request changes, page should be set to 0;

export const appSlice = createSlice({
  name: "testSlice",
  initialState: testState,
  reducers: {
    // this reducer takes links to images and dates from request.
    // this could be also done in extra reducers.
    testClick: (state) => {
      state.value += 1;
    },
  },
  // extraReducers:
  // for fetch Data thunk
});
export const { testClick } = appSlice.actions;
export default appSlice.reducer;
