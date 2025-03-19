import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
/**
 * This file contains the Redux slice for the filters in the todos list.
 * The filters include a category filter, a status filter.
 * Page and amount, used for pagination, are considered filters too for simplicity with json-server.
 */
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
