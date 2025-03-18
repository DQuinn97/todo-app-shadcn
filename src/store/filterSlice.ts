import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: { categoryFilter: undefined, statusFilter: undefined },
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
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
