"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = 800;
    const height = canvas.height = 400;

    const paddleWidth = 10;
    const paddleHeight = 100;
    let playerY = height / 2 - paddleHeight / 2;
    let computerY = height / 2 - paddleHeight / 2;
    const paddleSpeed = 5;

    let ballX = width / 2;
    let ballY = height / 2;
    let ballRadius = 10;
    let ballSpeedX = 5;
    let ballSpeedY = 3;

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "white";
      ctx.fillRect(10, playerY, paddleWidth, paddleHeight);
      ctx.fillRect(width - 20, computerY, paddleWidth, paddleHeight);

      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "20px Arial";
      ctx.fillText(`Player: ${score.player}`, 20, 30);
      ctx.fillText(`Computer: ${score.computer}`, width - 150, 30);
    };

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY - ballRadius < 0 || ballY + ballRadius > height) {
        ballSpeedY = -ballSpeedY;
      }

      if (
        ballX - ballRadius < 20 &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
      ) {
        ballSpeedX = -ballSpeedX;
      }

      if (
        ballX + ballRadius > width - 20 &&
        ballY > computerY &&
        ballY < computerY + paddleHeight
      ) {
        ballSpeedX = -ballSpeedX;
      }

      if (ballX - ballRadius < 0) {
        setScore((s) => ({ ...s, computer: s.computer + 1 }));
        resetBall();
      } else if (ballX + ballRadius > width) {
        setScore((s) => ({ ...s, player: s.player + 1 }));
        resetBall();
      }

      if (computerY + paddleHeight / 2 < ballY) {
        computerY += paddleSpeed;
      } else {
        computerY -= paddleSpeed;
      }
    };

    const resetBall = () => {
      ballX = width / 2;
      ballY = height / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = 3;
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerY = e.clientY - rect.top - paddleHeight / 2;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    loop();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [score]);

  return (
    <div className="flex justify-center mt-[100px]">
      <div className="flex items-center flex-col">
      <canvas ref={canvasRef} style={{ border: "2px solid white" }} />
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
      </div>
    </div>
  );
};

export default PongGame;
