"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { makeMove, resetGame } from "@/store/tictactoeSlice";

export default function TicTacToeBoard() {
  const { board, currentPlayer, winner } = useSelector(
    (state: RootState) => state.tictactoe
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Крестики-нолики</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => dispatch(makeMove(i))}
            className="w-20 h-20 text-3xl font-bold border-2 border-gray-600 rounded-md flex items-center justify-center"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner ? (
        <p className="text-green-500 text-xl">Победил: {winner} 🎉</p>
      ) : (
        <p>Ходит: {currentPlayer}</p>
      )}

      <button
        onClick={() => dispatch(resetGame())}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Сбросить
      </button>
    </div>
  );
}
