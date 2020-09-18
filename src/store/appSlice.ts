import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppSlice, FetchDataParams } from "../Interfaces/AppInterfaces";

const initialState: AppSlice = {
  loading: false,
  currentPage: 1,
  hasMoreToLoad: false,
  availableRovers: [
    {
      name: "curiosity",
      cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    },
    {
      name: "opportunity",
      cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
    {
      name: "spirit",
      cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
  ],
  fetchedPhotos: [],
  currentRequest: {
    rover: "",
    camera: "",
    sol: 0,
  },
};

// fetching data thunk. For each sequential request page should increase by 1.
// If request changes, page should be set to 0;

export const fetchData = createAsyncThunk(
  "main/FetchData",
  async (
    { rover, camera, sol, currentPage, intendedError }: FetchDataParams,
    { rejectWithValue }
  ) => {
    const undefinedErrorCheck = intendedError ?? "";
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}${undefinedErrorCheck}/photos?sol=${sol}&page=${currentPage}&camera=${camera}&api_key=ZeLtv9TcggpiivBajvCWrbawQ2oD8dNHTLaFOm2z`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.currentPage = 1;
    },
    clearPhotos: (state) => {
      state.fetchedPhotos = [];
    },
  },
  // extraReducers:
  // for fetch Data thunk
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.loading = false;
      // @ts-ignore
      state.fetchedPhotos.push(...payload.photos);
      state.currentRequest = {
        rover: payload.photos[0]?.rover?.name.toLowerCase(),
        camera: payload.photos[0]?.camera?.name,
        sol: payload.photos[0]?.sol,
      };
      state.hasMoreToLoad = payload.photos.length === 25;
      state.currentPage += 1;
      state.errorMessage = "";
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.currentPage = 1;
      state.hasMoreToLoad = false;
      state.errorMessage = payload.errors;
    });
  },
});
export const { resetPage, clearPhotos } = appSlice.actions;
export default appSlice.reducer;
