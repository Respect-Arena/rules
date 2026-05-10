"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Penalty, DEFAULT_CATEGORIES, Category } from "@/data/penalties";
import { showToast } from "@/components/Toast";

type AdminTab = "penalties" | "categories" | "rules" | "reports";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("penalties");
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  
  // Data State
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [rules, setRules] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  // Form States
  const [newPenalty, setNewPenalty] = useState<Partial<Penalty>>({
    category: "",
    penalties: { first: "", second: "", third: "" },
    wipe: false,
    keywords: []
  });
  const [newCategory, setNewCategory] = useState({ key: "", label: "", color: "#7c3aed" });
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    // Auth
    if (localStorage.getItem("admin_auth") === "true") setIsLogged(true);

    // Load Categories
    const savedCats = localStorage.getItem("respect_categories");
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem("respect_categories", JSON.stringify(DEFAULT_CATEGORIES));
    }

    // Load Penalties
    const savedPenalties = localStorage.getItem("respect_penalties");
    if (savedPenalties) setPenalties(JSON.parse(savedPenalties));

    // Load Rules
    const savedRules = localStorage.getItem("respect_site_rules");
    if (savedRules) setRules(JSON.parse(savedRules));

    // Load Reports
    const savedReports = localStorage.getItem("respect_reports");
    if (savedReports) setReports(JSON.parse(savedReports));
  }, []);

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLogged(true);
      localStorage.setItem("admin_auth", "true");
      showToast("تم تسجيل الدخول بنجاح", "success");
    } else showToast("كلمة مرور خاطئة!", "info");
  };

  // --- Category Actions ---
  const handleAddCategory = () => {
    if (!newCategory.key || !newCategory.label) return;
    const updated = { ...categories, [newCategory.key]: { label: newCategory.label, color: newCategory.color } };
    setCategories(updated);
    localStorage.setItem("respect_categories", JSON.stringify(updated));
    setNewCategory({ key: "", label: "", color: "#7c3aed" });
    showToast("تم إضافة التصنيف بنجاح");
  };

  const handleDeleteCategory = (key: string) => {
    const updated = { ...categories };
    delete updated[key];
    setCategories(updated);
    localStorage.setItem("respect_categories", JSON.stringify(updated));
    showToast("تم حذف التصنيف", "info");
  };

  // --- Penalty Actions ---
  const handleAddPenalty = () => {
    if (!newPenalty.title || !newPenalty.category) {
      showToast("يرجى ملء البيانات الأساسية واختيار تصنيف", "info");
      return;
    }
    const penalty: Penalty = {
      ...(newPenalty as Penalty),
      id: Date.now().toString(),
      keywords: keywordInput.split(",").map(k => k.trim())
    };
    const updated = [penalty, ...penalties];
    setPenalties(updated);
    localStorage.setItem("respect_penalties", JSON.stringify(updated));
    showToast("تم إضافة المخالفة");
    setNewPenalty({ category: "", penalties: { first: "", second: "", third: "" }, wipe: false, keywords: [] });
    setKeywordInput("");
  };

  const handleDeletePenalty = (id: string) => {
    const updated = penalties.filter(p => p.id !== id);
    setPenalties(updated);
    localStorage.setItem("respect_penalties", JSON.stringify(updated));
    showToast("تم حذف المخالفة", "info");
  };

  // --- Rules Actions ---
  const handleUpdateRule = (catIndex: number, ruleIndex: number, newValue: string) => {
    const updated = [...rules];
    updated[catIndex].rules[ruleIndex] = newValue;
    setRules(updated);
    localStorage.setItem("respect_site_rules", JSON.stringify(updated));
  };

  const handleAddRuleLine = (catIndex: number) => {
    const updated = [...rules];
    updated[catIndex].rules.push("قانون جديد...");
    setRules(updated);
    localStorage.setItem("respect_site_rules", JSON.stringify(updated));
  };

  const handleDeleteRuleLine = (catIndex: number, ruleIndex: number) => {
    const updated = [...rules];
    updated[catIndex].rules.splice(ruleIndex, 1);
    setRules(updated);
    localStorage.setItem("respect_site_rules", JSON.stringify(updated));
  };

  if (!isLogged) {
    return (
      <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '2rem' }}>Staff Portal Login</h2>
          <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
          <button onClick={handleLogin} style={{ width: '100%', background: 'var(--primary)' }}>دخول</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingBottom: '5rem' }}>
      <Header />
      <Hero title="لوحة التحكم الكاملة" subtitle="إدارة القوانين، العقوبات، التصنيفات، والبلاغات من مكان واحد." badge="Staff Control Center" />

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0', flexWrap: 'wrap' }}>
        {(['penalties', 'categories', 'rules', 'reports'] as AdminTab[]).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              backgroundColor: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              padding: '0.8rem 1.5rem'
            }}
          >
            {tab === 'penalties' && '📜 العقوبات'}
            {tab === 'categories' && '📁 التصنيفات'}
            {tab === 'rules' && '⚖️ القوانين'}
            {tab === 'reports' && '🚩 البلاغات'}
          </button>
        ))}
        <button onClick={() => { localStorage.removeItem("admin_auth"); setIsLogged(false); }} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', marginRight: 'auto' }}>تسجيل الخروج</button>
      </div>

      {/* Categories Management */}
      {activeTab === 'categories' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>إدارة تصنيفات العقوبات</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <input placeholder="المعرف (e.g. roleplay)" value={newCategory.key} onChange={e => setNewCategory({...newCategory, key: e.target.value})} style={{ flex: 1 }} />
            <input placeholder="اسم التصنيف" value={newCategory.label} onChange={e => setNewCategory({...newCategory, label: e.target.value})} style={{ flex: 1 }} />
            <input type="color" value={newCategory.color} onChange={e => setNewCategory({...newCategory, color: e.target.value})} style={{ width: '50px', padding: 0 }} />
            <button onClick={handleAddCategory} style={{ background: 'var(--success)' }}>إضافة</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {Object.entries(categories).map(([key, cat]) => (
              <div key={key} style={{ padding: '1rem', border: `1px solid ${cat.color}40`, borderRadius: '0.5rem', background: `${cat.color}10`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: cat.color, fontWeight: 'bold' }}>{cat.label}</span>
                <button onClick={() => handleDeleteCategory(key)} style={{ padding: '0.3rem', background: 'none', color: 'var(--danger)' }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules Management */}
      {activeTab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {rules.map((cat, ci) => (
            <div key={ci} className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{cat.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cat.rules.map((rule: string, ri: number) => (
                  <div key={ri} style={{ display: 'flex', gap: '1rem' }}>
                    <input 
                      value={rule} 
                      onChange={e => handleUpdateRule(ci, ri, e.target.value)} 
                      style={{ flex: 1, background: 'rgba(255,255,255,0.03)' }} 
                    />
                    <button onClick={() => handleDeleteRuleLine(ci, ri)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>حذف</button>
                  </div>
                ))}
                <button onClick={() => handleAddRuleLine(ci)} style={{ background: 'rgba(255,255,255,0.05)', marginTop: '1rem' }}>+ إضافة سطر جديد</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Penalties Management */}
      {activeTab === 'penalties' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>إضافة مخالفة</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input placeholder="العنوان" value={newPenalty.title || ""} onChange={e => setNewPenalty({...newPenalty, title: e.target.value})} />
              <textarea 
                placeholder="الوصف" 
                value={newPenalty.description || ""} 
                onChange={e => setNewPenalty({...newPenalty, description: e.target.value})} 
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', borderRadius: '0.5rem', padding: '1rem', color: 'white', minHeight: '100px' }}
              />
              <select 
                value={newPenalty.category} 
                onChange={e => setNewPenalty({...newPenalty, category: e.target.value})}
                style={{ background: '#1e293b', color: 'white', padding: '1rem', borderRadius: '0.5rem' }}
              >
                <option value="">اختر التصنيف...</option>
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.label}</option>
                ))}
              </select>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                <input placeholder="العقوبة الأولى" value={newPenalty.penalties?.first} onChange={e => setNewPenalty({...newPenalty, penalties: {...newPenalty.penalties!, first: e.target.value}})} />
                <input placeholder="العقوبة الثانية" value={newPenalty.penalties?.second} onChange={e => setNewPenalty({...newPenalty, penalties: {...newPenalty.penalties!, second: e.target.value}})} />
                <input placeholder="العقوبة الثالثة" value={newPenalty.penalties?.third} onChange={e => setNewPenalty({...newPenalty, penalties: {...newPenalty.penalties!, third: e.target.value}})} />
              </div>
              <input placeholder="كلمات دلالية (مفصلة بفاصلة)" value={keywordInput} onChange={e => setKeywordInput(e.target.value)} />
              <button onClick={handleAddPenalty} style={{ background: 'var(--success)', marginTop: '1rem' }}>إضافة</button>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>المخالفات الحالية ({penalties.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {penalties.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{p.title}</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5, marginRight: '1rem', color: categories[p.category]?.color }}>{categories[p.category]?.label}</span>
                  </div>
                  <button onClick={() => handleDeletePenalty(p.id)} style={{ padding: '0.4rem', color: 'var(--danger)', background: 'none' }}>حذف</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>بلاغات اللاعبين ({reports.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reports.map(r => (
              <div key={r.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>{r.subject}</span>
                  <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{r.date}</span>
                </div>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{r.description}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--primary)' }}>
                  <span>👤 {r.discordTag}</span>
                  <a href={r.proofUrl} target="_blank" style={{ color: 'var(--accent)' }}>📎 الدليل</a>
                </div>
              </div>
            ))}
            {reports.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5 }}>لا توجد بلاغات حالياً.</p>}
          </div>
        </div>
      )}
    </main>
  );
}
