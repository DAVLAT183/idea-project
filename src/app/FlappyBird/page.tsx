"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FlappyBird() {
  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([{ x: 400, height: 120 }]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const gravity = 0.6;
    const interval = setInterval(() => {
      setBirdY((y) => Math.max(0, y + velocity));
      setVelocity((v) => v + gravity);

      setPipes((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x - 3 }))
          .filter((p) => p.x > -60)
      );

      if (pipes[0]?.x === 120) {
        setPipes((prev) => [
          ...prev,
          { x: 400, height: 80 + Math.random() * 150 },
        ]);
      }

      // collision
      if (
        pipes.some(
          (p) =>
            p.x < 100 &&
            p.x + 60 > 60 &&
            (birdY < p.height || birdY > p.height + 100)
        ) ||
        birdY > 380
      ) {
        setIsRunning(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isRunning, pipes, velocity, birdY]);

  const handleJump = () => {
    if (!isRunning) {
      setPipes([{ x: 400, height: 120 }]);
      setBirdY(200);
      setVelocity(0);
      setScore(0);
      setIsRunning(true);
      return;
    }
    setVelocity(-8);
  };

  return (
    <main
      onClick={handleJump}
      className="select-none bg-sky-400 flex items-center justify-center min-h-screen relative overflow-hidden"
    >
      <div className="w-[400px] h-[400px] bg-sky-300 overflow-hidden relative border-4 border-gray-800">
        <div
          className="absolute w-10 h-10 bg-yellow-400 rounded-full"
          style={{ top: birdY, left: 60 }}
        />
        {pipes.map((p, i) => (
          <div key={i}>
            <div
              className="absolute bg-green-600"
              style={{ left: p.x, top: 0, width: 60, height: p.height }}
            />
            <div
              className="absolute bg-green-600"
              style={{
                left: p.x,
                top: p.height + 100,
                width: 60,
                height: 400 - (p.height + 100),
              }}
            />
          </div>
        ))}
        <div className="absolute top-2 left-2 text-xl font-bold text-white">
          {score}
        </div>
      </div>

      {!isRunning && (
        <div className="absolute bottom-6 flex flex-col items-center">
          <button
            onClick={handleJump}
            className="bg-yellow-500 px-6 py-2 rounded-lg font-bold text-black shadow-lg"
          >
            Играть
          </button>
          <Link href="/" className="text-white mt-4 underline">
            ⬅ Назад в меню
          </Link>
        </div>
      )}
    </main>
  );
}
