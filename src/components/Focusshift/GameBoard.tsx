"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    startGame,
    endGame,
    increaseScore,
    setTimeLeft,
} from "../../store/gameSlice";
import { RootState } from "../../store/store";
import GameCell from "./GameCell";
import StartScreen from "./StartScreen";
import GameOverModal from "./GameOverModal";
import ScorePanel from "./ScorePanel";

export default function GameBoard() {
    const dispatch = useDispatch();
    const { status, score, level, timeLeft } = useSelector(
        (state: RootState) => state.game
    );

    const [grid, setGrid] = useState<string[][]>([]);
    const [changedCell, setChangedCell] = useState<[number, number] | null>(null);

    const gridSize = Math.min(2 + level, 6);

    const generateGrid = () => {
        const colors = ["#FF5252", "#40C4FF", "#FFEB3B", "#69F0AE"];
        return Array.from({ length: gridSize }, () =>
            Array.from(
                { length: gridSize },
                () => colors[Math.floor(Math.random() * colors.length)]
            )
        );
    };

    const startRound = () => {
        const newGrid = generateGrid();
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        const changed = [...newGrid.map((r) => [...r])];
        changed[row][col] = "#9C27B0"; // поменяли одну клетку
        setGrid(newGrid);
        setChangedCell([row, col]);
        setTimeout(() => setGrid(changed), 800);
    };

    // таймер
    useEffect(() => {
        if (status !== "playing") return;

        const interval = setInterval(() => {
            dispatch(setTimeLeft(timeLeft - 1));
        }, 1000);

        if (timeLeft <= 0) {
            dispatch(endGame());
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timeLeft, status, dispatch]);

    // старт новой игры
    useEffect(() => {
        if (status === "playing") {
            dispatch(setTimeLeft(5));
            startRound();
        }
    }, [status, level]);

    const handleClick = (row: number, col: number) => {
        if (!changedCell) return;
        const isCorrect = changedCell[0] === row && changedCell[1] === col;

        if (isCorrect) {
            dispatch(increaseScore());
            dispatch(setTimeLeft(timeLeft + 5))
            startRound()

            localStorage.setItem("score", String(score + 1))
            localStorage.setItem("level", String(level))

        } else {
            dispatch(endGame());
        }
    };

    if (status === "start") return <StartScreen />;
    if (status === "over") return <GameOverModal />;

    return (
        <div className="flex flex-col items-center gap-6">
            <ScorePanel score={score} level={level} timeLeft={timeLeft} />

            <div
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 80px)`,
                }}
            >
                {grid.map((row, i) =>
                    row.map((color, j) => (
                        <GameCell
                            key={`${i}-${j}`}
                            color={color}
                            onClick={() => handleClick(i, j)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
