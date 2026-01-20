"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { PostRecord, resetGame, startGame } from "../../store/gameSlice";

export default function GameOverModal() {
    const dispatch = useDispatch<AppDispatch>();
    const { score, level } = useSelector((state: RootState) => state.game);

    const Post = () => {
        console.log("mvmcvcm");
        
        const record = {
            score: localStorage.getItem("score"),
            level: localStorage.getItem("level"),
        };
        dispatch(PostRecord(record));
    };

    return (
        <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-4xl font-bold text-red-400">Игра окончена 😢</h1>
            <p className="text-lg">Твой счёт: {localStorage.getItem("score")}</p>
            <p className="text-gray-400">Уровень: {localStorage.getItem("level")}</p>

            <button
                onClick={() => {
                    Post();
                    dispatch(startGame());
                }}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold"
            >
                Сыграть снова
            </button>

            <button
                onClick={() => {    Post();dispatch(resetGame())}}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl text-white"
            >
                В меню
            </button>
        </div>
    );
}
