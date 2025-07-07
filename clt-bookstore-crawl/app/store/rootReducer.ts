import { combineReducers } from "@reduxjs/toolkit";
import bookstoreReducer from "./slices/bookstoreData";

const rootReducer = combineReducers({
  bookstores: bookstoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
