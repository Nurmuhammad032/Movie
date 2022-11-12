import { combineReducers } from "redux";
import userReducer from "./app/slices/user";
import searchReducer from "./app/slices/search";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer