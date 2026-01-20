"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SpaceInvaders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 600;
    canvas.height = 400;

    let running = true;

    // Игрок
    const player = { x: 280, y: 350, w: 40, h: 20, speed: 6 };
    const bullets: { x: number; y: number; w: number; h: number }[] = [];
    const enemies: { x: number; y: number; w: number; h: number; dir: number }[] = [];

    // Враги
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        enemies.push({
          x: 60 + c * 60,
          y: 40 + r * 40,
          w: 30,
          h: 20,
          dir: 1,
        });
      }
    }

    const keys: Record<string, boolean> = {};

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Игрок
      if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
      if (keys["ArrowRight"] && player.x + player.w < canvas.width)
        player.x += player.speed;

      ctx.fillStyle = "cyan";
      ctx.fillRect(player.x, player.y, player.w, player.h);

      // Пули
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 8;
        if (bullets[i].y < 0) bullets.splice(i, 1);
      }

      ctx.fillStyle = "yellow";
      bullets.forEach((b) => ctx.fillRect(b.x, b.y, b.w, b.h));

      // Враги
      let edge = false;
      enemies.forEach((e) => {
        e.x += e.dir * 2;
        if (e.x + e.w > canvas.width || e.x < 0) edge = true;
      });

      if (edge) enemies.forEach((e) => ((e.dir *= -1), (e.y += 15)));

      ctx.fillStyle = "lime";
      enemies.forEach((e) => ctx.fillRect(e.x, e.y, e.w, e.h));

      // Проверка попаданий
      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
          const b = bullets[i];
          const e = enemies[j];
          if (
            b.x < e.x + e.w &&
            b.x + b.w > e.x &&
            b.y < e.y + e.h &&
            b.y + b.h > e.y
          ) {
            enemies.splice(j, 1);
            bullets.splice(i, 1);
            break;
          }
        }
      }

      // Проверка поражения
      for (const e of enemies) {
        if (e.y + e.h >= player.y) {
          setGameOver(true);
          running = false;
          drawText("GAME OVER", "red");
          return;
        }
      }

      // Победа
      if (enemies.length === 0) {
        setWin(true);
        running = false;
        drawText("YOU WIN!", "lime");
        return;
      }

      requestAnimationFrame(loop);
    };

    const drawText = (text: string, color: string) => {
      ctx.fillStyle = color;
      ctx.font = "40px Arial";
      ctx.fillText(text, 180, 200);
    };

    const shoot = () => {
      bullets.push({
        x: player.x + player.w / 1 - 1,
        y: player.y,
        w: 10,
        h: 10,
      });
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.type === "keydown") {
        keys[e.key] = true;
        if (e.key === " ") shoot();
      } else {
        keys[e.key] = false;
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);

    loop();

    return () => {
      running = false;
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
    };
  }, [restartKey]);

  const restart = () => {
    setGameOver(false);
    setWin(false);
    setRestartKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
      <h1 className="text-3xl font-bold mb-4">👾 Space Invaders</h1>
      <canvas ref={canvasRef} className="border border-gray-700 rounded-xl" />
      <p className="mt-3 text-sm text-gray-400">← → move | Space = shoot</p>

      {(gameOver || win) && (
        <button
          onClick={restart}
          className="absolute bottom-16 px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 text-white font-bold"
        >
          🔁 Restart
        </button>
      )}
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  );
}
