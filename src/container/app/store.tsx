import { configureStore } from "@reduxjs/toolkit";
import myReducer from "../features/mySlice";
export default configureStore({
  reducer: {
    my: myReducer,
  },
});
