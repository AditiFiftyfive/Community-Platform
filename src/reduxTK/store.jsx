import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "./features/community/communitySlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    communities: communityReducer,
    auth: authReducer,
  },
});

export default store;
