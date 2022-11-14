import { combineReducers } from "redux";
import userReducer from "./app/slices/user";
import searchReducer from "./app/slices/search";
import favoriteReducer from "./app/slices/favorite";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  favorite: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
