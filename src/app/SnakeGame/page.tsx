"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const cellSize = 20;
const width = 20;
const height = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState([[8, 8]]);
  const [food, setFood] = useState([5, 5]);
  const [dir, setDir] = useState("TOP");
  const [speed] = useState(150);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp" && dir !== "DOWN") setDir("UP");
    if (e.key === "ArrowDown" && dir !== "UP") setDir("DOWN");
    if (e.key === "ArrowLeft" && dir !== "RIGHT") setDir("LEFT");
    if (e.key === "ArrowRight" && dir !== "LEFT") setDir("RIGHT");
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    if (dir === "UP") head[1] -= 1;
    if (dir === "DOWN") head[1] += 1;
    if (dir === "LEFT") head[0] -= 1;
    if (dir === "RIGHT") head[0] += 1;

    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= width ||
      head[1] >= height ||
      newSnake.some(([x, y]) => x === head[0] && y === head[1])
    ) {
      setGameOver(true);
      return;
    }

    newSnake.push(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(score + 1);
      setFood([
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
      ]);
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, speed);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const resetGame = () => {
    setSnake([[8, 8]]);
    setFood([5, 5]);
    setDir("RIGHT");
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-indigo-400">🐍 Snake Game</h1>
      <div
        className="relative bg-gray-800 border-2 border-indigo-500"
        style={{
          width: width * cellSize,
          height: height * cellSize,
        }}
      >
        <div
          className="absolute bg-red-500 rounded-sm"
          style={{
            left: food[0] * cellSize,
            top: food[1] * cellSize,
            width: cellSize,
            height: cellSize,
          }}
        />
        {snake.map(([x, y], i) => (
          <div
            key={i}
            className="absolute bg-green-400 rounded-sm"
            style={{
              left: x * cellSize,
              top: y * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          />
        ))}
      </div>

      <p className="mt-4 text-lg">Очки: {score}</p>

      {gameOver && (
        <div className="mt-6 text-center">
          <p className="text-red-400 font-semibold text-xl">Игра окончена!</p>
          <button
            onClick={resetGame}
            className="mt-3 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg transition"
          >
            Играть снова
          </button>
        </div>
      )}
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  );
}
