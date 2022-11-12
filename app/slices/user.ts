import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    avatar: {
      gravatar: {
        hash: "",
      },
      tmdb: {
        avatar_path: "",
      },
    },
    id: 2,
    include_adult: false,
    iso_639_1: "",
    iso_3166_1: "",
    name: "",
    username: "",
  },
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id")!;

      localStorage.setItem("accountId", action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
