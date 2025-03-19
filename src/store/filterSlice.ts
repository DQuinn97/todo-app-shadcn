import { createSlice } from "@reduxjs/toolkit";
import { useGetTodoCountQuery } from "./todoAPI";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filters: {
      categoryFilter: undefined,
      statusFilter: undefined,
      page: 0,
      amount: 15,
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
    nextPage: (state) => {
      const { data: todos } = useGetTodoCountQuery();
      if (todos && state.filters.page < Math.ceil(todos / state.filters.amount))
        state.filters.page++;
    },
    prevPage: (state) => {
      if (state.filters.page !== 0) state.filters.page--;
    },
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
export const getFilters = (state: any) => state.filterSlice.filters;
