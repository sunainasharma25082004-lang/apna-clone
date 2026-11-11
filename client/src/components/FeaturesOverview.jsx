import React, { useRef } from 'react';
import { GraduationCap, UserCheck, Scale, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturesOverview({ onOpenCounselling, onOpenCompare, onOpenEligibility, onExplorePrograms }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const cards = [
    {
      id: 1,
      title: 'EXPLORE TOP ONLINE DEGREES',
      actionText: 'EXPLORE',
      onClick: onExplorePrograms,
      icon: (
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #c084fc 0%, #7e22ce 60%, #3b0764 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(126, 34, 206, 0.35)',
            border: '3px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          <GraduationCap size={44} color="#ffffff" strokeWidth={1.8} />
        </div>
      )
    },
    {
      id: 2,
      title: 'MEET YOUR CAREER COUNSELLOR',
      actionText: 'GET STARTED',
      onClick: () => onOpenCounselling(),
      icon: (
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #a855f7 0%, #6b21a8 70%, #2e1065 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(107, 33, 168, 0.35)',
            border: '3px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          <UserCheck size={42} color="#ffffff" strokeWidth={1.8} />
        </div>
      )
    },
    {
      id: 3,
      title: 'COMPARE TOP COLLEGES',
      actionText: 'COMPARE',
      onClick: onOpenCompare,
      icon: (
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #60a5fa 0%, #2563eb 60%, #1e1b4b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.35)',
            border: '3px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          <div style={{ position: 'absolute', fontSize: '11px', fontWeight: 900, background: '#ffffff', color: '#1e293b', padding: '2px 6px', borderRadius: '4px', top: '12px' }}>
            VS
          </div>
          <Scale size={40} color="#ffffff" strokeWidth={1.8} style={{ marginTop: '10px' }} />
        </div>
      )
    },
    {
      id: 4,
      title: 'KNOW YOUR EARNING POTENTIAL',
      actionText: 'CHECK NOW',
      onClick: onOpenEligibility,
      icon: (
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #34d399 0%, #059669 60%, #064e3b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(5, 150, 105, 0.35)',
            border: '3px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          <TrendingUp size={42} color="#ffffff" strokeWidth={1.8} />
        </div>
      )
    }
  ];

  return (
    <section
      style={{
        padding: '70px 0 80px 0',
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header with Title and Nav arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              More than just education
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 500
              }}
            >
              Discover, compare, and plan with expert guidance
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => scroll('left')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#e2e8f0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#cbd5e1'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} color="#334155" />
            </button>
            <button
              onClick={() => scroll('right')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#64748b',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#475569'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#64748b'}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} color="#ffffff" />
            </button>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '10px',
            scrollbarWidth: 'none'
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="hover-lift"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '28px',
                padding: '48px 24px 36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle grid pattern background inside card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none'
                }}
              />

              {/* Icon Container */}
              <div style={{ marginBottom: '32px', position: 'relative', zIndex: 2 }}>
                {card.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#0f172a',
                  lineHeight: 1.35,
                  minHeight: '46px',
                  marginBottom: '28px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {card.title}
              </h3>

              {/* Action Button */}
              <button
                onClick={card.onClick}
                style={{
                  padding: '10px 32px',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: '#4e12bb',
                  border: '2px solid #5b14c7',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5b14c7';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#4e12bb';
                }}
              >
                {card.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
