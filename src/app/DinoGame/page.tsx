"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DinoGame() {
  const [dinoBottom, setDinoBottom] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(500);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 2;
  const jumpHeight = 100;
  const groundHeight = 20;
  const gameWidth = 600;

  const jump = () => {
    if (isJumping || gameOver) return;
    setIsJumping(true);
    let upInterval: NodeJS.Timeout;
    let downInterval: NodeJS.Timeout;

    let position = 0;
    upInterval = setInterval(() => {
      if (position >= jumpHeight) {
        clearInterval(upInterval);
        downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            setIsJumping(false);
          } else {
            position -= gravity;
            setDinoBottom(position);
          }
        }, 20);
      } else {
        position += gravity * 2;
        setDinoBottom(position);
      }
    }, 20);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code==="Space") jump();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isJumping, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const obstacleInterval = setInterval(() => {
      setObstacleLeft((prev) => {
        if (prev <= -20) {
          setScore((s) => s + 1);
          return gameWidth;
        }
        return prev - 10;
      });
    }, 60);
    return () => clearInterval(obstacleInterval);
  }, [gameOver]);

  useEffect(() => {
    if (obstacleLeft < 50 && obstacleLeft > 0 && dinoBottom < 20) {
      setGameOver(true);
    }
  }, [obstacleLeft, dinoBottom]);

  const restart = () => {
    setGameOver(false);
    setScore(0);
    setObstacleLeft(500);
    setDinoBottom(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white select-none">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400"> Dino Run</h1>

      <div
        className="relative overflow-hidden border-2 border-indigo-500 bg-gray-800 rounded-lg"
        style={{ width: gameWidth, height: 200 }}
      >
        <div
          className="absolute bottom-0 left-0 w-full bg-green-600"
          style={{ height: groundHeight }}
        ></div>

        <div
          className="absolute left-10 bg-indigo-400 rounded-sm"
          style={{
            bottom: dinoBottom + groundHeight,
            width: 40,
            height: 40,
          }}
        ></div>

        <div
          className="absolute bg-green-400 rounded-sm"
          style={{
            bottom: groundHeight,
            left: obstacleLeft,
            width: 20,
            height: 40,
          }}
        ></div>

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-center">
            <div>
              <p className="text-red-400 text-2xl font-semibold mb-2">
                Игра окончена!
              </p>
              <button
                onClick={restart}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg transition"
              >
                Играть снова
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-lg">Очки: {score}</p>
      <p className="text-sm text-gray-400 mt-1">
        Нажимай <kbd className="bg-gray-700 px-2 rounded">Space</kbd> чтобы прыгать
      </p>
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  );
}
