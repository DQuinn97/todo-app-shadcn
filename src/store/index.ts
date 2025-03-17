import { configureStore } from "@reduxjs/toolkit";
import todosAPI from "./todoAPI";

const myStore = configureStore({
  reducer: { [todosAPI.reducerPath]: todosAPI.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosAPI.middleware),
});

export default myStore;
export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
