"use client";

export default function GameCell({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) {
  return (
    <div>
      <div
        onClick={onClick}
        className="w-20 h-20 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: color }}
      ></div>  
    </div>
  );
}
