"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Penalty, PENALTIES_DATA, DEFAULT_CATEGORIES } from "@/data/penalties";
import Link from "next/link";

export default function PenaltyDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [penalty, setPenalty] = useState<Penalty | null>(null);
  const [categories, setCategories] = useState<Record<string, any>>({});

  useEffect(() => {
    const savedPenalties = localStorage.getItem("respect_penalties");
    const data = savedPenalties ? JSON.parse(savedPenalties) : PENALTIES_DATA;
    const found = data.find((p: Penalty) => p.id === id);
    if (found) {
      setPenalty(found);
    }

    const savedCats = localStorage.getItem("respect_categories");
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    } else {
      setCategories(DEFAULT_CATEGORIES);
    }
  }, [id]);

  if (!penalty) return null;

  const categoryInfo = categories[penalty.category] || { label: "غير مصنف", color: "#666" };

  return (
    <main className="container" style={{ paddingBottom: '5rem' }}>
      <Header />
      
      <Hero 
        title={penalty.title} 
        subtitle="تفاصيل المخالفة والعقوبات المترتبة عليها وكيفية تجنب الوقوع فيها."
        badge={categoryInfo.label}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>وصف المخالفة</h3>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', opacity: 0.9 }}>
            {penalty.description}
          </p>
          
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>الكلمات الدلالية</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {penalty.keywords.map((k, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                  #{k}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>درجات العقوبة</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.25rem' }}>المرة الأولى</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#60a5fa' }}>{penalty.penalties.first}</p>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(250, 204, 21, 0.1)', border: '1px solid rgba(250, 204, 21, 0.2)', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.25rem' }}>المرة الثانية</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#facc15' }}>{penalty.penalties.second}</p>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.25rem' }}>المرة الثالثة</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f87171' }}>{penalty.penalties.third}</p>
              </div>
            </div>
          </div>

          {penalty.wipe && (
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>⚠️ تصفير الحساب</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                هذه المخالفة تعتبر جسيمة جداً، وسيتم حذف جميع أموالك وممتلكاتك في السيرفر عند ارتكابها.
              </p>
            </div>
          )}

          <Link href="/" style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '1rem', fontWeight: 'bold' }}>
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
