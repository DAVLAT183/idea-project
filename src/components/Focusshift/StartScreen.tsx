"use client";

import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../store/gameSlice";
import { GetRecord } from "../../store/gameSlice";
import { useEffect } from "react";
import { RootState } from "@reduxjs/toolkit/query";

export default function StartScreen() {
  const { status, score, level, timeLeft } = useSelector(
         (state: RootState) => state.game
     );
  const dispatch = useDispatch();
 
   useEffect(()=>{
    dispatch(GetRecord())
   },[])
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h1 className="text-4xl font-bold">🧠 FocusShift</h1>
      <p className="text-gray-300">
        Тренируй внимание: найди, что изменилось на экране!
      </p>
      <p>Ваш рекорд score : {localStorage.getItem("score")} , level : {localStorage.getItem("level")}</p>

      <button
        onClick={() => dispatch(startGame())}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all"
      >
        Начать игру
      </button>
    </div>
  );
}