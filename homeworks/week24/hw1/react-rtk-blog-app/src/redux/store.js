import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import userReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    postState: postReducer,
    userState: userReducer,
  },
});
