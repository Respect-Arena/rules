"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="glass-panel" style={{ 
      margin: '1rem 0', 
      padding: '1rem 2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'sticky',
      top: '1rem',
      zIndex: 100
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Image src="/fav.png" alt="Respect Arena Logo" width={55} height={55} style={{ objectFit: 'contain' }} priority />
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }} className="gradient-text">
          Respect Arena <span style={{ color: 'white', fontWeight: '400', fontSize: '1rem', marginRight: '0.5rem' }}>| قاعدة بيانات العقوبات</span>
        </h1>
      </Link>
      <nav className="nav-links">
        <Link href="/" className={pathname === "/" ? "active" : ""}>🏠 الرئيسية</Link>
        <Link href="/rules" className={pathname === "/rules" ? "active" : ""}>📜 القوانين</Link>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""} style={{ color: pathname === "/admin" ? 'white' : 'var(--accent)', fontWeight: 'bold' }}>👤 الإدارة</Link>
      </nav>
    </header>
  );
}
