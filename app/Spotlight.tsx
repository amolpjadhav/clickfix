'use client';
import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      divRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.08), transparent 40%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
    />
  );
}