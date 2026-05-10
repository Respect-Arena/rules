"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CATEGORIES, Category } from "@/data/penalties";

interface SearchFilterProps {
  search: string;
  setSearch: (val: string) => void;
  activeCategory: string | null;
  setActiveCategory: (val: string | null) => void;
}

export default function SearchFilter({ search, setSearch, activeCategory, setActiveCategory }: SearchFilterProps) {
  const [categories, setCategories] = useState<Record<string, Category>>({});

  useEffect(() => {
    const saved = localStorage.getItem("respect_categories");
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      setCategories(DEFAULT_CATEGORIES);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="ابحث عن مخالفة (مثال: دهس، قتل، ثغرة...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '1.2rem 1.5rem', 
            fontSize: '1.1rem', 
            borderRadius: '1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <div style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
          🔍
        </div>
      </div>

      {!search && (
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', opacity: 0.6, fontSize: '0.85rem', marginTop: '-0.5rem' }}>
          <span>🔥 بحث شائع:</span>
          {['RDM', 'VDM', 'Meta', 'Combat', 'Green'].map(tag => (
            <button 
              key={tag}
              onClick={() => setSearch(tag)}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '0.3rem 0.8rem', 
                borderRadius: '0.5rem', 
                color: 'white', 
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            backgroundColor: activeCategory === null ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
            color: activeCategory === null ? 'white' : 'rgba(255,255,255,0.6)',
            padding: '0.5rem 1.25rem',
            borderRadius: '2rem',
            fontSize: '0.9rem',
            border: activeCategory === null ? 'none' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          الكل
        </button>
        {Object.entries(categories).map(([key, info]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            style={{
              backgroundColor: activeCategory === key ? info.color : 'rgba(255,255,255,0.05)',
              color: activeCategory === key ? 'white' : 'rgba(255,255,255,0.6)',
              padding: '0.5rem 1.25rem',
              borderRadius: '2rem',
              fontSize: '0.9rem',
              border: activeCategory === key ? 'none' : `1px solid ${info.color}20`
            }}
          >
            {info.label}
          </button>
        ))}
      </div>
    </div>
  );
}
