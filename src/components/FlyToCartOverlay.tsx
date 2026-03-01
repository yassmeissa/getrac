import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FlyToCartOverlayProps {
  img: string;
  from: { x: number; y: number; width: number; height: number };
  to: { x: number; y: number };
  onEnd: () => void;
}

export const FlyToCartOverlay = ({ img, from, to, onEnd }: FlyToCartOverlayProps) => {
  useEffect(() => {
    // On déclenche un mini-délai pour forcer le navigateur à appliquer les styles initiaux
    // avant de lancer l'animation CSS
    const frame = requestAnimationFrame(() => {});
    
    // La durée de l'animation CSS est de 0.7s (700ms)
    const timeout = setTimeout(onEnd, 700);
    
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [onEnd]);

  // Calcul dynamique de la distance à parcourir
  const translateX = to.x - from.x;
  const translateY = to.y - from.y;

  return createPortal(
    <img
      src={img}
      alt="flying product"
      className="fly-to-cart" // On applique la classe CSS ici
      style={{
        position: 'fixed',
        left: from.x, // Point de départ exact de l'image
        top: from.y,
        width: from.width,
        height: from.height,
        pointerEvents: 'none',
        zIndex: 9999,
        // On passe les variables dynamiques au CSS pour qu'il sache où aller
        '--dest-x': `${translateX}px`,
        '--dest-y': `${translateY}px`,
      } as React.CSSProperties}
    />,
    document.body
  );
};