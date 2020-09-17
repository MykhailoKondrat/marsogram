import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

export default configureStore({
  reducer: {
    appSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["main/FetchData/fulfilled"],
    },
  }),
  devTools: true,
});
