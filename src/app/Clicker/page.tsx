"use client";

import Link from "next/link";
import { useState } from "react";

export default function AAAClicker() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-6">AAA Clicker</h1>
      <button
        onClick={handleClick}
        className="w-36 h-36 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-2xl font-bold flex items-center justify-center transition-transform active:scale-90"
      >
        Click!
      </button>
      <div className="mt-6 text-3xl">{score}</div>
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  );
}
