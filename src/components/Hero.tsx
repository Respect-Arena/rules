interface HeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  image?: string;
}

export default function Hero({ title, subtitle, badge, image }: HeroProps) {
  return (
    <section className="hero-banner animate-fade-in" style={{ 
      backgroundImage: image ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(${image})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: image ? '400px' : 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {badge && (
          <span className="badge-glow" style={{ 
            backgroundColor: 'rgba(139, 92, 246, 0.1)', 
            color: 'var(--primary)', 
            padding: '0.5rem 1.5rem', 
            borderRadius: '2rem', 
            fontSize: '0.8rem',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            marginBottom: '1.5rem',
            display: 'inline-block'
          }}>
            {badge}
          </span>
        )}
        <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.2', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          {title.split(' ').map((word, i) => (
            <span key={i} className={i === title.split(' ').length - 1 ? 'gradient-text' : ''}>
              {word}{' '}
            </span>
          ))}
        </h2>
        <p style={{ opacity: 0.9, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
