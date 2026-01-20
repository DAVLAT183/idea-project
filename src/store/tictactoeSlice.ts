import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TicTacToeState {
  board: string[];
  currentPlayer: "X" | "O";
  winner: string | null;
}

const initialState: TicTacToeState = {
  board: Array(9).fill(""),
  currentPlayer: "X",
  winner: null,
};

const checkWinner = (board: string[]): string | null => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
};

const tictactoeSlice = createSlice({
  name: "tictactoe",
  initialState, 
  reducers: {
    makeMove(state, action: PayloadAction<number>) {
      const i = action.payload;
      if (state.board[i] || state.winner) return;
      state.board[i] = state.currentPlayer;
      state.winner = checkWinner(state.board);
      state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
    },
    resetGame(state) {
      state.board = Array(9).fill("");
      state.currentPlayer = "X";
      state.winner = null;
    },
  },
});

export const { makeMove, resetGame } = tictactoeSlice.actions;
export default tictactoeSlice.reducer;
