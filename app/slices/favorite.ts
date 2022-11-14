import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../auth";
import { Favorite } from "../..";
import { RootState } from "../../rootReducer";

const initialState: Favorite = {
  favorite: {},
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    markAsFavorite: (state, action) => {
      const accountId = localStorage.getItem("accountId");
      const sessionId = localStorage.getItem("sessionId");
      state.favorite = axios
        .post(
          `https://api.themoviedb.org/3/account/14664238/favorite?api_key=918ac020185cb84503489642e0a33bbe&session_id=cd3734b46bb0e86a6634dbb3b0b0426d6d24279a`,
          {
            media_type: "movie",
            media_id: 550,
            favorite: true,
          }
        )
        .then((res) => console.log(res));
    },
  },
});

export const { markAsFavorite } = favoriteSlice.actions;

// export const select = (state: RootState) => state.favorite.favorite

export default favoriteSlice.reducer;
