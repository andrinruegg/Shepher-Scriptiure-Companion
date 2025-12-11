
import React, { useEffect, useMemo } from 'react';
import { Heart } from 'lucide-react';

interface PrincessOverlayProps {
    showHearts?: boolean;
    showGlitter?: boolean;
    showVignette?: boolean;
}

const PrincessOverlay: React.FC<PrincessOverlayProps> = ({
    showHearts = true,
    showGlitter = true,
    showVignette = true
}) => {
  // Generate random hearts
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  // Generate Fairy Dust (Glitter particles)
  // These are small, slow-moving golden/pink dots that twinkle
  const dustParticles = useMemo(() => {
      return Array.from({ length: 40 }).map((_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 4, // Twinkle speed
          size: 2 + Math.random() * 4,
          opacity: 0.2 + Math.random() * 0.5
      }));
  }, []);

  useEffect(() => {
      // Add class to body to trigger CSS overrides
      document.body.classList.add('princess-mode');
      return () => {
          document.body.classList.remove('princess-mode');
      };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      
      {/* 1. Pink Vignette (Background Tint) */}
      {showVignette && (
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 via-transparent to-rose-500/10 dark:from-rose-900/10 dark:to-rose-950/40 pointer-events-none mix-blend-normal"></div>
      )}

      {/* 2. Floating Hearts */}
      {showHearts && hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] animate-float-up text-rose-300 dark:text-rose-500/40"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        >
          <Heart fill="currentColor" size={heart.size} />
        </div>
      ))}
      
      {/* 3. Fairy Dust (Replaces Stars) */}
      {showGlitter && dustParticles.map((dust) => (
          <div 
            key={dust.id}
            className="absolute rounded-full bg-amber-200 dark:bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            style={{
                left: `${dust.left}%`,
                top: `${dust.top}%`,
                width: `${dust.size}px`,
                height: `${dust.size}px`,
                opacity: dust.opacity,
                animationDuration: `${dust.duration}s`,
                animationDelay: `${dust.delay}s`
            }}
          />
      ))}

    </div>
  );
};

export default PrincessOverlay;
