import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import chatReducer from "./Slices/chatSlice";
import messageReducer from "./Slices/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    messages: messageReducer,
  },
});

export default store;
