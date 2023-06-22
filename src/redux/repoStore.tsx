import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./repo/repoReducer";

const store = configureStore({
  reducer: repoReducer
});

export default store;
export type AppDispatch = typeof store.dispatch;
