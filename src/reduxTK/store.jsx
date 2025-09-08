import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "./features/community/communitySlice";

const store = configureStore({
  reducer: {
    communities: communityReducer,
  },
});

export default store;