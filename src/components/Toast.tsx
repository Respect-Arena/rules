"use client";

import { useState, useEffect } from "react";

export default function Toast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 3000);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  if (!toast) return null;

  return (
    <div className="glass-panel animate-fade-in" style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      padding: '1rem 2rem',
      backgroundColor: toast.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.2)',
      borderColor: toast.type === 'success' ? 'var(--success)' : 'var(--primary)',
      color: 'white',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      border: '1px solid'
    }}>
      <span style={{ fontSize: '1.2rem' }}>{toast.type === 'success' ? '✅' : 'ℹ️'}</span>
      <span>{toast.message}</span>
    </div>
  );
}

export const showToast = (message: string, type: 'success' | 'info' = 'success') => {
  const event = new CustomEvent('show-toast', { detail: { message, type } });
  window.dispatchEvent(event);
};
