import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const universityLogos = [
  { name: 'Manav Rachna', sub: 'CENTRE FOR DISTANCE & ONLINE EDUCATION', badge: 'NAAC A' },
  { name: 'UPES ONLINE', sub: 'UNIVERSITY OF TOMORROW', badge: 'NAAC A' },
  { name: 'O.P. Jindal Global University', sub: 'NAAC ACCREDITATION - "A" GRADE', badge: 'IoE' },
  { name: 'D Y PATIL UNIVERSITY', sub: 'ONLINE - NAVI MUMBAI', badge: 'NAAC A++' },
  { name: 'BHARATHIDASAN UNIVERSITY', sub: 'ESTD 1982', badge: 'NAAC A+' },
  { name: 'JAIN ONLINE', sub: 'JGI DEEMED TO BE UNIVERSITY', badge: 'NAAC A++' },
  { name: 'LPU Online', sub: 'SAME DEGREE, NOW ONLINE', badge: 'NAAC A++' },
  { name: 'AMITY UNIVERSITY', sub: 'ONLINE EDUCATION', badge: 'NAAC A+' },
  { name: 'CHANDIGARH UNIVERSITY', sub: 'DISCOVER. LEARN. EMPOWER.', badge: 'NAAC A+' },
  { name: 'PARUL UNIVERSITY', sub: 'ONLINE LEARNING', badge: 'NAAC A++' },
  { name: 'SHARDA ONLINE', sub: 'BEYOND BOUNDARIES', badge: 'NAAC A+' }
];

export default function HeroSection({ onOpenCounselling, onExplorePrograms }) {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        paddingTop: '65px',
        paddingBottom: '20px',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Background Classical Marble Pillars on Left & Right */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '70px',
          backgroundImage: 'url(/images/hero_pillars.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.85,
          pointerEvents: 'none'
        }}
      />

      {/* Blueprint fine grid lines overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '420px',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)'
        }}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        {/* Top Laurel Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#1e293b',
            marginBottom: '20px'
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
          <span>INDIA'S TOP ONLINE PROGRAMS</span>
          <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
        </div>

        {/* Display Headline */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(44px, 6.5vw, 76px)',
            fontWeight: 500,
            color: '#09090b',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '36px'
          }}
        >
          Your career deserves
          <span
            style={{
              display: 'block',
              fontStyle: 'italic',
              fontWeight: 400,
              background: 'linear-gradient(135deg, #111827 0%, #4338ca 50%, #6d28d9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            the unfair advantage
          </span>
        </h1>

        {/* Call to Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '70px'
          }}
        >
          <button
            onClick={onExplorePrograms}
            className="btn-primary"
            style={{
              padding: '14px 34px',
              fontSize: '15px',
              backgroundColor: '#3b0764' // Deep rich purple
            }}
          >
            Explore programs <ArrowRight size={16} />
          </button>

          <button
            onClick={() => onOpenCounselling()}
            className="btn-secondary"
            style={{
              padding: '14px 32px',
              fontSize: '15px',
              backgroundColor: '#ffffff'
            }}
          >
            Talk to counsellor
          </button>
        </div>
      </div>

      {/* University Ribbon Marquee */}
      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          borderBottom: '1px solid #f1f5f9',
          padding: '18px 0',
          backgroundColor: '#fafbfc',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeScroll 35s linear infinite'
          }}
        >
          {[...universityLogos, ...universityLogos].map((univ, index) => (
            <div
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 28px',
                borderRight: '1px solid #e2e8f0',
                gap: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#ede9fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '11px',
                  color: '#5b21b6'
                }}
              >
                {univ.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  {univ.name}
                </div>
                <div style={{ fontSize: '9.5px', color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>
                  {univ.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
