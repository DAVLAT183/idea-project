"use client";

import Link from "next/link";

const categories = [
  {
    title: " Аркады",
    games: [
      { name: "Змейка", path: "/SnakeGame" },
      { name: "Динозаврик", path: "/DinoGame" },
      { name: "Flappy Bird", path: "/FlappyBird" },
      { name: "Space Invaders", path: "/SpaceInvaders" },
    ],
  },
  {
    title: " Логические",
    games: [
      { name: "2048", path: "/Game2048" },
      { name: "Memory Game", path: "/MemoryGame" },
    ],
  },
  {
    title: " На двоих",
    games: [
      { name: "Крестики-нолики", path: "/TicTacToe2" },
      { name: "Pong", path: "/Pong" },
    ],
  },
  {
    title: " RPG / Кликеры / Реакция",
    games: [
      { name: "Clicker", path: "/Clicker" },
      { name: "Focus Shift", path: "/FocusShift" },
    ],
  },
];

export default function GameHub() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-10 text-center">
         Davlat Game Hub
      </h1>
      <p className="text-gray-300 text-center mb-12 max-w-xl">
        Добро пожаловать в игровой портал! Выбирай любую игру — от аркад до логических и 3D.
      </p>
      <h1>Hello World!!</h1>

      <div className="w-full max-w-5xl space-y-12">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cat.games.map((game) => (
                <Link
                  key={game.path}
                  href={game.path}
                  className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 shadow-lg text-center"
                >
                  <h3 className="text-xl font-bold">{game.name}</h3>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
