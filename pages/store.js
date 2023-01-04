import { configureStore } from "@reduxjs/toolkit";

import selectMatchSlice from "./slices/match/selectedMatchSlice";

const store = configureStore({
  reducer: {
    selectedMatchReducer: selectMatchSlice,
  },
});

export default store;
