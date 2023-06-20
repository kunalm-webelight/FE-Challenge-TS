import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./mySlice";
export default configureStore({
  reducer: {
    my: myReducer,
  },
});
