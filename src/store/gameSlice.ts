import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type GameStatus = "start" | "playing" | "over";

interface GameState {
  score: number;
  level: number;
  status: GameStatus;
  timeLeft: number;
}

export const GetRecord = createAsyncThunk(
  "game/getRecord",
  async () => {
    let { data } = await axios.get("https://687e3cfcc07d1a878c31dcc2.mockapi.io/p")
    return data.data
  }
)
export const PostRecord = createAsyncThunk(
  "game/PostRecord",
  async (record) => {
    console.log("DAvlat");
    
    let { data } = await axios.post("https://687e3cfcc07d1a878c31dcc2.mockapi.io/p", record)
    return data.data
  }
)

const initialState: GameState = {
  score: 0,
  level: 1,
  status: "start",
  timeLeft: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = "playing";
      state.score = 0;
      state.level = 1;
      state.timeLeft = 5;
    },
    endGame: (state) => {
      state.status = "over"
      state.score = 0
      state.level = 1
    },
    increaseScore: (state) => {
      state.score += 1;
      if (state.score % 5 === 0) {
        state.level += 1;
      }
    },
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    resetGame: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetRecord.pending, (state) => {
    });
    builder.addCase(GetRecord.fulfilled, (state, action: PayloadAction<any>) => {
     state.level = action.payload
    });
    builder.addCase(GetRecord.rejected, (state, action) => {
      console.error("Ошибка при получении записей:", action.error.message);
    });
  }
});

export const { startGame, endGame, increaseScore, setTimeLeft, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
