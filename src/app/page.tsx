"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import PenaltyCard from "@/components/PenaltyCard";
import Hero from "@/components/Hero";
import { PENALTIES_DATA, Penalty } from "@/data/penalties";

import Reveal from "@/components/Reveal";

export default function Home() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("respect_penalties");
    if (saved) {
      setPenalties(JSON.parse(saved));
    } else {
      setPenalties(PENALTIES_DATA);
    }
  }, []);

  const filteredPenalties = useMemo(() => {
    return penalties.filter((penalty) => {
      // Category filter
      if (activeCategory && penalty.category !== activeCategory) return false;

      // Search filter (Title, Description, Keywords)
      if (search) {
        const query = search.toLowerCase();
        const inTitle = penalty.title.toLowerCase().includes(query);
        const inDesc = penalty.description.toLowerCase().includes(query);
        const inKeywords = penalty.keywords.some(k => k.toLowerCase().includes(query));
        
        return inTitle || inDesc || inKeywords;
      }

      return true;
    });
  }, [search, activeCategory, penalties]);

  return (
    <main className="container" style={{ paddingBottom: '5rem' }}>
      <Header />
      
      <Hero 
        title="نظام العقوبات الموحد" 
        subtitle="دليلك الشامل لجميع قوانين وعقوبات سيرفر Respect Arena لضمان تجربة رول بلي احترافية وعادلة للجميع."
        badge="Respect Arena Official"
      />

      <Reveal>
        <SearchFilter 
          search={search} 
          setSearch={setSearch} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </Reveal>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filteredPenalties.length > 0 ? (
          filteredPenalties.map((penalty) => (
            <PenaltyCard key={penalty.id} penalty={penalty} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
            <p style={{ fontSize: '1.5rem' }}>لم يتم العثور على نتائج للبحث: "{search}"</p>
          </div>
        )}
      </div>

      <section className="glass-panel" style={{ marginTop: '5rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📅 سجل التحديثات (Changelog)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ borderLeft: '2px solid var(--primary)', paddingRight: '1rem' }}>
            <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>9 مايو 2026</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>إطلاق قاعدة بيانات العقوبات الجديدة بتصميم متطور ونظام بحث ذكي.</p>
          </div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingRight: '1rem' }}>
            <p style={{ fontWeight: 'bold', opacity: 0.5 }}>7 مايو 2026</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>تعديل مدة سجن الـ RDM من 30 دقيقة إلى 60 دقيقة.</p>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '8rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ opacity: 0.5 }}>&copy; 2026 Respect Arena. جميع الحقوق محفوظة.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <Link href="/rules" style={{ color: 'var(--primary)' }}>قوانين السيرفر</Link>
          <span style={{ opacity: 0.3 }}>|</span>
          <Link href="/support" style={{ color: 'var(--primary)' }}>الدعم الفني</Link>
          <span style={{ opacity: 0.3 }}>|</span>
          <a href="#" style={{ color: 'var(--primary)' }}>Discord</a>
        </div>
      </footer>
    </main>
  );
}
