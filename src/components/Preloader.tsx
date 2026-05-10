"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#0f172a',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 1s cubic-bezier(0.7, 0, 0.3, 1)',
      opacity: loading ? 1 : 0,
      visibility: loading ? 'visible' : 'hidden',
      transform: loading ? 'scale(1)' : 'scale(1.2)',
    }}>
      <div className="animate-float" style={{ marginBottom: '2rem' }}>
        <Image src="/fav.png" alt="Respect Arena Logo" width={150} height={150} priority />
      </div>
      
      <div style={{ width: '250px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'linear-gradient(to right, var(--primary), var(--accent))', 
          transition: 'width 0.1s ease',
          boxShadow: '0 0 15px var(--primary)'
        }} />
      </div>
      
      <p style={{ marginTop: '1.5rem', opacity: 0.5, fontSize: '0.9rem', letterSpacing: '2px' }} className="gradient-text">
        LOADING {progress}%
      </p>
    </div>
  );
}
