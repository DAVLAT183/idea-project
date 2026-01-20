"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SIZE = 4;

export default function Game2048() {
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newGrid = Array(SIZE)
      .fill(0)
      .map(() => Array(SIZE).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid([...newGrid]);
  };

  const addRandomTile = (grid: number[][]) => {
    const empty = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++) if (grid[r][c] === 0) empty.push([r, c]);
    if (empty.length === 0) return;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  };

  const handleKey = (e: KeyboardEvent) => {
    let moved = false;
    const clone = grid.map((r) => [...r]);

    const slide = (row: number[]) => {
      const arr = row.filter((n) => n);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          arr[i + 1] = 0;
        }
      }
      const res = arr.filter((n) => n);
      while (res.length < SIZE) res.push(0);
      return res;
    };

    let newGrid = [...clone];
    if (e.key === "ArrowLeft") {
      newGrid = newGrid.map(slide);
      moved = true;
    } else if (e.key === "ArrowRight") {
      newGrid = newGrid.map((r) => slide(r.reverse()).reverse());
      moved = true;
    } else if (e.key === "ArrowUp") {
      newGrid = rotateLeft(newGrid);
      newGrid = newGrid.map(slide);
      newGrid = rotateRight(newGrid);
      moved = true;
    } else if (e.key === "ArrowDown") {
      newGrid = rotateRight(newGrid);
      newGrid = newGrid.map(slide);
      newGrid = rotateLeft(newGrid);
      moved = true;
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid([...newGrid]);
    }
  };

  const rotateLeft = (matrix: number[][]) =>
    matrix[0].map((_, i) => matrix.map((row) => row[row.length - 1 - i]));
  const rotateRight = (matrix: number[][]) =>
    matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKey(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-6 font-bold">2048</h1>
      <div className="grid grid-cols-4 gap-2 bg-gray-800 p-4 rounded-lg">
        {grid.flat().map((num, i) => (
          <div
            key={i}
            className={`w-16 h-16 flex items-center justify-center font-bold text-2xl rounded ${
              num ? "bg-yellow-400 text-black" : "bg-gray-700"
            }`}
          >
            {num || ""}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 bg-yellow-500 px-6 py-2 rounded-lg text-black font-bold"
      >
        🔁 Сброс
      </button>
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </main>
  );
}
