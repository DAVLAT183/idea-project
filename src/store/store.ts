import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import tictactoeReducer from "./tictactoeSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    tictactoe: tictactoeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
