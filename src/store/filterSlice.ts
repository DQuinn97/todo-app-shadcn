import { createSlice } from "@reduxjs/toolkit";
import { useGetTodoStatsQuery } from "./todoAPI";
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
  },
});

export const { setCategoryFilter, setStatusFilter, setPage, setAmount } =
  filterSlice.actions;
export default filterSlice.reducer;
export const getFilters = (state: RootState) => state.filterSlice.filters;
