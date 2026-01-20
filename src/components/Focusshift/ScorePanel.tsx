"use client";

export default function ScorePanel({
  score,
  level,
  timeLeft,
}: {
  score: number;
  level: number;
  timeLeft: number;
}) {
  return (
    <div className="flex gap-6 text-lg font-semibold">
      <span>Очки: {score}</span>
      <span>Уровень: {level}</span>
      <span>⏱ {timeLeft}s</span>
    </div>
  );
}
