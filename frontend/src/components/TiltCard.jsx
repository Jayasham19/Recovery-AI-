import React, { useState, useRef } from 'react';

export default function TiltCard({ 
  children, 
  className = "", 
  tiltDegree = 10,
  scale = 1.02,
  glare = true,
  onClick
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltDegree;
    const rotateY = ((x - centerX) / centerX) * tiltDegree;

    setTransform({ rotateX, rotateY, scale });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`,
        transition: 'transform 0.2s cubic-bezier(0.03, 0.98, 0.52, 0.99), border-color 0.3s, background-color 0.3s',
        transformStyle: 'preserve-3d'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 87, 51, ${glarePos.opacity}), transparent 80%)`
          }}
        />
      )}
      {children}
    </div>
  );
}
