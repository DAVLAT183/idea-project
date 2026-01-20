"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Platformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 800;
    canvas.height = 400;

    let player = { x: 100, y: 300, w: 30, h: 30, dy: 0, grounded: false };
    const gravity = 0.8;
    const jumpPower = -12;

    const platforms = [
      { x: 0, y: 350, w: 800, h: 50 },
      { x: 150, y: 280, w: 120, h: 15 },
      { x: 400, y: 240, w: 120, h: 15 },
      { x: 650, y: 300, w: 100, h: 15 },
    ];

    const keys: Record<string, boolean> = {};

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      player.dy += gravity;
      player.y += player.dy;

      player.grounded = false;
      for (const p of platforms) {
        if (
          player.x < p.x + p.w &&
          player.x + player.w > p.x &&
          player.y + player.h <= p.y + player.dy &&
          player.y + player.h + player.dy >= p.y
        ) {
          player.y = p.y - player.h;
          player.dy = 0;
          player.grounded = true;
        }
      }

      if (keys["ArrowUp"] && player.grounded) player.dy = jumpPower;
      if (keys["ArrowLeft"]) player.x -= 5;
      if (keys["ArrowRight"]) player.x += 5;

      ctx.fillStyle = "yellow";
      ctx.fillRect(player.x, player.y, player.w, player.h);

      ctx.fillStyle = "lime";
      for (const p of platforms) ctx.fillRect(p.x, p.y, p.w, p.h);

      requestAnimationFrame(loop);
    };

    const handleKey = (e: KeyboardEvent) => {
      keys[e.key] = e.type === "keydown";
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    loop();

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
      setRunning(false);
    };
  }, [running]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">🦸 Platformer</h1>
      <canvas ref={canvasRef} className="border border-gray-500 rounded-xl" />
      <p className="mt-2 text-sm text-gray-400">Use Arrow keys to move & jump</p>
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  );
}
