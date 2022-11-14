import { createSlice } from "@reduxjs/toolkit";
import { Search } from "../..";

const initialState = {
  page: 1,
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQueryFunc: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    fetchSearchData: (state, action) => {

    }
  },
});

export const { setQueryFunc, setPage } = searchSlice.actions;

export default searchSlice.reducer;
