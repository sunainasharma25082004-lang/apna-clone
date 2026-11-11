import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, BarChart2, Briefcase, Landmark, Calculator, Code2 } from 'lucide-react';

export default function PreferredDegrees({ onSelectDegree }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const degrees = [
    {
      num: 1,
      code: 'BBA',
      name: 'Bachelor of Business Administration',
      icon: (
        <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* 3D Bar chart on podium */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', zIndex: 2, marginBottom: '6px' }}>
            <div style={{ width: '14px', height: '32px', backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
            <div style={{ width: '14px', height: '48px', backgroundColor: '#cbd5e1', borderRadius: '4px' }} />
            <div style={{ width: '14px', height: '62px', backgroundColor: '#94a3b8', borderRadius: '4px' }} />
          </div>
          {/* Circular podium base */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '84px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
            }}
          />
        </div>
      )
    },
    {
      num: 2,
      code: 'BA',
      name: 'Bachelor of Arts',
      icon: (
        <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* Classical 3D Greek Pillar */}
          <div style={{ zIndex: 2, marginBottom: '8px', color: '#94a3b8' }}>
            <Landmark size={48} strokeWidth={1.5} />
          </div>
          {/* Circular podium base */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '84px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
            }}
          />
        </div>
      )
    },
    {
      num: 3,
      code: 'MBA',
      name: 'Master of Business Administration',
      icon: (
        <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* 3D Briefcase */}
          <div style={{ zIndex: 2, marginBottom: '10px', color: '#94a3b8' }}>
            <Briefcase size={46} strokeWidth={1.5} />
          </div>
          {/* Circular podium base */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '84px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
            }}
          />
        </div>
      )
    },
    {
      num: 4,
      code: 'BCA',
      name: 'Bachelor of Computer Application',
      icon: (
        <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* 3D Calculator / Device */}
          <div style={{ zIndex: 2, marginBottom: '10px', color: '#94a3b8' }}>
            <Calculator size={46} strokeWidth={1.5} />
          </div>
          {/* Circular podium base */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '84px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
            }}
          />
        </div>
      )
    },
    {
      num: 5,
      code: 'MCA',
      name: 'Master of Computer Application',
      icon: (
        <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* 3D Code Screen */}
          <div style={{ zIndex: 2, marginBottom: '10px', color: '#94a3b8' }}>
            <Code2 size={46} strokeWidth={1.5} />
          </div>
          {/* Circular podium base */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '84px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
            }}
          />
        </div>
      )
    }
  ];

  return (
    <section
      style={{
        padding: '75px 0',
        backgroundColor: '#fbfbfd',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '34px',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              Online degrees preferred by recruiters
            </h2>
            <p
              style={{
                fontSize: '15.5px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 500
              }}
            >
              Browse industry-relevant programs
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scroll('left')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#e2e8f0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} color="#334155" />
            </button>
            <button
              onClick={() => scroll('right')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#64748b',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} color="#ffffff" />
            </button>
          </div>
        </div>

        {/* 5 Podium Cards */}
        <div
          ref={scrollRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(220px, 1fr))',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'none'
          }}
        >
          {degrees.map((item) => (
            <div
              key={item.num}
              onClick={() => onSelectDegree(item.code)}
              className="hover-lift"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '36px 20px 24px 20px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                minHeight: '340px'
              }}
            >
              {/* Giant Faded Watermark Number in Background Bottom-Left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  left: '10px',
                  fontSize: '140px',
                  fontWeight: 900,
                  color: 'rgba(0, 0, 0, 0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                {item.num}
              </div>

              {/* Laurel Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#1e293b',
                  marginBottom: '14px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <span style={{ color: '#94a3b8' }}>⛓</span>
                <span>{item.code}</span>
                <span style={{ color: '#94a3b8' }}>⛓</span>
              </div>

              {/* Full Degree Name */}
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#0f172a',
                  lineHeight: 1.35,
                  minHeight: '44px',
                  marginBottom: '36px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {item.name}
              </h3>

              {/* 3D Podium Icon Element */}
              <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
