import { createSlice } from "@reduxjs/toolkit";
import { useGetTodoCountQuery } from "./todoAPI";
import { RootState } from ".";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filters: {
      categoryFilter: undefined,
      statusFilter: undefined,
      page: 1,
      amount: 10,
    },
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.categoryFilter =
        action.payload === "All" ? undefined : action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.statusFilter =
        action.payload === "All" ? undefined : action.payload;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setAmount: (state, action) => {
      state.filters.amount = action.payload;
      state.filters.page = 1;
    },
    nextPage: (state) => {
      const { data: todos } = useGetTodoCountQuery();
      if (todos && state.filters.page < Math.ceil(todos / state.filters.amount))
        state.filters.page++;
    },
    prevPage: (state) => {
      if (state.filters.page !== 1) state.filters.page--;
    },
  },
});

export const {
  setCategoryFilter,
  setStatusFilter,
  setPage,
  setAmount,
  nextPage,
  prevPage,
} = filterSlice.actions;
export default filterSlice.reducer;
export const getFilters = (state: RootState) => state.filterSlice.filters;
