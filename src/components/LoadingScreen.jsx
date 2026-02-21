import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete, duration = 2000 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(nextProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }

      setProgress(100);
      onComplete?.();
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      {/* Fondo con efecto de niebla */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80"></div>

      {/* Contenedor central */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo animado */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <img
            src="/images/Logo.png"
            alt="Zona Cero"
            className="w-full h-full object-contain animate-pulse"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          {/* Brillo sutil alrededor del logo */}
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite',
            }}
          ></div>
        </div>

        {/* Texto */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'Cinzel' }}>
            ZONA CERO
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 tracking-[0.3em] mb-2" style={{ fontFamily: 'Cinzel' }}>
            REQUIEM
          </p>
          <p className="text-sm md:text-base text-gray-500" style={{ fontFamily: 'Lora' }}>
            Cargando...
          </p>
        </div>

        {/* Barra de progreso minimalista */}
        <div className="w-52 md:w-72 h-2 bg-zinc-900 rounded-full overflow-hidden mt-4 border border-red-900/50">
          <div
            className="relative h-full bg-gradient-to-r from-red-900 via-red-600 to-red-800"
            style={{
              width: `${progress}%`,
              transition: 'width 90ms linear',
              boxShadow: '0 0 14px rgba(220, 38, 38, 0.65)',
            }}
          >
            <div
              className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(248,113,113,0.95) 0%, rgba(220,38,38,0.15) 70%, transparent 100%)',
                boxShadow: '0 0 14px rgba(248,113,113,0.8)',
              }}
            ></div>
          </div>
        </div>
        <p className="text-xs text-red-500/80 tracking-widest" style={{ fontFamily: 'Lora' }}>
          {Math.round(progress)}%
        </p>

        {/* Líneas de escaneo */}
        <div className="mt-8 w-full max-w-xs">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-3"
              style={{
                animation: `scan ${1.5 + i * 0.2}s ease-in-out infinite`,
                opacity: 0.5 - i * 0.1,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

      `}</style>
    </div>
  );
}
