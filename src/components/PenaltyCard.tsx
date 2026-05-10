import { Penalty } from "@/data/penalties";
import Link from "next/link";
import { showToast } from "./Toast";
import Reveal from "./Reveal";
import { useEffect, useState } from "react";

interface PenaltyCardProps {
  penalty: Penalty;
}

export default function PenaltyCard({ penalty }: PenaltyCardProps) {
  const [categories, setCategories] = useState<Record<string, any>>({});

  useEffect(() => {
    const saved = localStorage.getItem("respect_categories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  const categoryInfo = categories[penalty.category] || { label: "غير مصنف", color: "#666" };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/penalty/${penalty.id}`;
    navigator.clipboard.writeText(url);
    showToast("تم نسخ رابط المخالفة بنجاح!");
  };

  return (
    <Link href={`/penalty/${penalty.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Reveal className="glass-panel animate-fade-in" style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        cursor: 'pointer',
        height: '100%',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{penalty.title}</h3>
          <button 
            onClick={handleCopy}
            title="نسخ الرابط"
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: 'none', 
              padding: '0.4rem', 
              borderRadius: '0.5rem',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            🔗
          </button>
        </div>
        
        <span style={{ 
          backgroundColor: `${categoryInfo.color}20`, 
          color: categoryInfo.color, 
          padding: '0.25rem 0.75rem', 
          borderRadius: '2rem', 
          fontSize: '0.7rem',
          border: `1px solid ${categoryInfo.color}40`,
          alignSelf: 'flex-start'
        }}>
          {categoryInfo.label}
        </span>
        
        <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {penalty.description}
        </p>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div className="penalty-step">
              <label style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block', marginBottom: '0.25rem' }}>الأولى</label>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#60a5fa', textAlign: 'center' }}>
                {penalty.penalties.first}
              </div>
            </div>
            <div className="penalty-step">
              <label style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block', marginBottom: '0.25rem' }}>الثانية</label>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#facc15', textAlign: 'center' }}>
                {penalty.penalties.second}
              </div>
            </div>
            <div className="penalty-step">
              <label style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block', marginBottom: '0.25rem' }}>الثالثة</label>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#f87171', textAlign: 'center' }}>
                {penalty.penalties.third}
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'left', marginTop: '1rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>
            عرض التفاصيل ←
          </div>
        </div>
      </Reveal>
    </Link>
  );
}
