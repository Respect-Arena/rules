"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";

type RuleCategory = {
  title: string;
  rules: string[];
};

export default function RulesPage() {
  const [categories, setCategories] = useState<RuleCategory[]>([]);

  useEffect(() => {
    const savedRules = localStorage.getItem("respect_site_rules");
    if (savedRules) {
      setCategories(JSON.parse(savedRules));
    } else {
      const defaultRules = [
        {
          title: "قوانين الرقابة",
          rules: [
            "يمنع منعاً باتاً استغلال الثغرات البرمجية بأي شكل من الأشكال.",
            "يجب الالتزام بالزي الرسمي في المناطق المخصصة.",
            "يمنع التدخل في شؤون الآخرين دون سبب إداري."
          ]
        },
        {
          title: "قوانين الإدارة",
          rules: [
            "يجب احترام طاقم العمل والالتزام بالتعليمات الصادرة.",
            "يمنع الخروج عن النص في التعاملات الرسمية.",
            "يجب توثيق جميع الإجراءات الإدارية بالدليل القطعي."
          ]
        }
      ];
      setCategories(defaultRules);
      localStorage.setItem("respect_site_rules", JSON.stringify(defaultRules));
    }
  }, []);

  return (
    <main className="container" style={{ paddingBottom: '5rem' }}>
      <Header />
      
      <Hero 
        title="دستور Respect Arena" 
        subtitle="القواعد الأساسية التي تضمن تجربة ممتعة وعادلة للجميع. يرجى قراءة القوانين بعناية لتجنب العقوبات."
        badge="Server Constitution"
        image="/rules-banner.png"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {categories.map((cat, i) => (
          <Reveal key={i} className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              {cat.title}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cat.rules.map((rule, j) => (
                <li key={j} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                  <span style={{ opacity: 0.8, lineHeight: '1.6' }}>{rule}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
