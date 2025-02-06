import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./coursesSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
