import React from "react";
import { useEffect, useRef } from "react";

export type AudioPulseProps = {
  active: boolean;
  volume: number;
  hover?: boolean;
};

export default function AudioPulse({ active, volume, hover }: AudioPulseProps) {
  const lines = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let timeout: number | null = null;
    const update = () => {
      lines.current.forEach(
        (line, i) => {
          const baseHeight = 4;
          const maxHeight = 24;
          const multiplier = i === 1 ? 400 : 60;
          
          line.style.height = `${Math.min(
            maxHeight,
            baseHeight + volume * multiplier
          )}px`;
          
          // Add dynamic opacity and scale based on volume
          line.style.opacity = active ? `${0.6 + volume * 0.4}` : "0.2";
          line.style.transform = `scaleY(${active ? 1 + volume * 0.2 : 1})`;
        }
      );
      timeout = window.setTimeout(update, 100);
    };

    update();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [volume, active]);

  return (
    <div className="flex items-center justify-center space-x-1.5 h-6">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) {
                lines.current[i] = el;
              }
            }}
            className={`
              w-1 
              bg-gradient-to-b 
              ${hover ? 'from-blue-500 to-purple-500' : 'from-gray-400 to-gray-600'}
              rounded-full 
              transition-all 
              duration-200 
              ease-in-out
              ${active ? 'animate-pulse' : ''}
            `}
            style={{ 
              animationDelay: `${i * 133}ms`,
              height: '4px',
              minHeight: '4px',
              maxHeight: '24px'
            }}
          />
        ))}
    </div>
  );
}