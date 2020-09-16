import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./appSlice";

export default configureStore({
  reducer: {
    testingSomething: testSlice,
  },
});
