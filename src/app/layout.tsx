import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Toast from "@/components/Toast";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "قاعدة بيانات العقوبات | Respect Arena",
  description: "المرجع الرسمي لقوانين وعقوبات سيرفر Respect Arena. ابحث عن العقوبات والقوانين بسهولة.",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <div className="spotlight" id="spotlight" />
        <Preloader />
        <Toast />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="site-wrapper">
          <div className="bg-dots" />
          {children}
          <footer className="container" style={{ 
            marginTop: '8rem', 
            padding: '4rem 0', 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center',
            opacity: 0.5,
            fontSize: '0.9rem'
          }}>
            <p>© {new Date().getFullYear()} Respect Arena. جميع الحقوق محفوظة.</p>
            <p style={{ marginTop: '0.5rem' }}>صنع بكل حب لخدمة مجتمع الرول بلي العربي ❤️</p>
          </footer>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', () => {
            const spotlight = document.getElementById('spotlight');
            if (spotlight) {
              window.addEventListener('mousemove', e => {
                spotlight.style.setProperty('--x', e.clientX + 'px');
                spotlight.style.setProperty('--y', e.clientY + 'px');
              });
            }
          });
        `}} />
      </body>
    </html>
  );
}
