import { createSlice } from "@reduxjs/toolkit";
import { useGetTodosQuery } from "./todoAPI";
const { data: todos } = useGetTodosQuery();

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    page: 0,
    amount: 15,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    nextPage: (state) => {
      if (todos && state.page < Math.ceil(todos.length / state.amount))
        state.page++;
    },
    prevPage: (state) => {
      if (state.page !== 0) state.page--;
    },
  },
});

export const { setPage, nextPage, prevPage } = filterSlice.actions;
export default filterSlice.reducer;
