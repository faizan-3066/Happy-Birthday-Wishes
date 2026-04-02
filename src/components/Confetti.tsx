import { useEffect, useState, useCallback } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const colors = ['#ff6b9d', '#ffd700', '#ff85a1', '#c77dff', '#ff006e', '#ffb703', '#00f5d4', '#fff'];

export default function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const createConfetti = useCallback(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        size: 5 + Math.random() * 10,
        rotation: Math.random() * 360
      });
    }
    setPieces(newPieces);
  }, []);

  useEffect(() => {
    if (active) {
      createConfetti();
      const interval = setInterval(createConfetti, 3000);
      return () => clearInterval(interval);
    }
  }, [active, createConfetti]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${piece.duration}s linear forwards`,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            boxShadow: `0 0 10px ${piece.color}`
          }}
        />
      ))}
    </div>
  );
}
