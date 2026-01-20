"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Card = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍋", "🍍", "🥝"];

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const doubled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({
        id: i,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(doubled);
  }, []);

  const handleFlip = (id: number) => {
    if (disabled) return;
    const newCards = [...cards];
    const flippedCard = newCards.find((c) => c.id === id);
    if (!flippedCard || flippedCard.flipped || flippedCard.matched) return;

    flippedCard.flipped = true;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setCards(newCards);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setTimeout(() => checkMatch(newFlipped), 800);
    }
  };

  const checkMatch = ([first, second]: number[]) => {
    const newCards = [...cards];
    if (newCards[first].emoji === newCards[second].emoji) {
      newCards[first].matched = true;
      newCards[second].matched = true;
    } else {
      newCards[first].flipped = false;
      newCards[second].flipped = false;
    }
    setCards(newCards);
    setFlipped([]);
    setDisabled(false);
  };

  const reset = () => {
    const reshuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({
        id: i,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(reshuffled);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🧠 Memory Match</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`w-16 h-16 flex items-center justify-center text-3xl rounded-xl font-bold transition-all duration-300 ${
              card.flipped || card.matched
                ? "bg-green-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-6 px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-500"
      >
        Restart
      </button>
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  );
}
