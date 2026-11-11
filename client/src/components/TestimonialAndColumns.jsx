import React from 'react';
import { Play, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function TestimonialAndColumns({ onOpenCounselling, onOpenVideo, onSelectCollege }) {
  const categoryColumns = [
    {
      id: 'students-top-choice',
      title: "STUDENTS' TOP CHOICE",
      glowColor: 'linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(168, 85, 247, 0.45) 100%)',
      accentColor: '#9333ea',
      universities: [
        { name: 'Lovely Professional University', programs: 'MBA, MA, BA +5', slug: 'lovely-professional-university', initial: 'LPU' },
        { name: 'Amity University', programs: 'MBA, MA, BA +6', slug: 'amity-university', initial: 'AMITY' },
        { name: 'Parul University', programs: 'MBA, MA, BCA +4', slug: 'parul-university', initial: 'PARUL' },
        { name: 'Paris School of Business', programs: 'MBA', slug: 'paris-school-of-business', initial: 'PSB' }
      ]
    },
    {
      id: 'top-nirf-ranked',
      title: 'TOP NIRF RANKED',
      glowColor: 'linear-gradient(180deg, rgba(20, 184, 166, 0.05) 0%, rgba(20, 184, 166, 0.45) 100%)',
      accentColor: '#0d9488',
      universities: [
        { name: 'Chandigarh University', programs: 'MBA, MA, BA +4', slug: 'chandigarh-university', initial: 'CU' },
        { name: 'Lovely Professional University', programs: 'MBA, MA, BA +5', slug: 'lovely-professional-university', initial: 'LPU' },
        { name: 'Amity University', programs: 'MBA, MA, BA +6', slug: 'amity-university', initial: 'AMITY' },
        { name: 'Bharathidasan University', programs: 'MBA, MA, BA +1', slug: 'bharathidasan-university', initial: 'BDU' }
      ]
    },
    {
      id: 'assured-programs',
      title: 'ASSURED PROGRAMS',
      glowColor: 'linear-gradient(180deg, rgba(234, 179, 8, 0.05) 0%, rgba(234, 179, 8, 0.45) 100%)',
      accentColor: '#ca8a04',
      universities: [
        { name: 'Jain University', programs: 'MBA, MA, B.Com +4', slug: 'jain-university', initial: 'JAIN' },
        { name: 'Amity University', programs: 'MBA, MA, BA +6', slug: 'amity-university', initial: 'AMITY' },
        { name: 'Lovely Professional University', programs: 'MBA, MA, BA +5', slug: 'lovely-professional-university', initial: 'LPU' },
        { name: 'Chandigarh University', programs: 'MBA, MA, BA +4', slug: 'chandigarh-university', initial: 'CU' }
      ]
    },
    {
      id: 'best-budget',
      title: 'BEST BUDGET',
      glowColor: 'linear-gradient(180deg, rgba(244, 63, 94, 0.05) 0%, rgba(244, 63, 94, 0.45) 100%)',
      accentColor: '#e11d48',
      universities: [
        { name: 'Yenepoya University Online', programs: 'MBA, B.Com, BCA +2', slug: 'yenepoya-university-online', initial: 'YNU' },
        { name: 'Vignan University', programs: 'MBA, BCA, BBA +1', slug: 'vignan-university', initial: 'VU' },
        { name: 'Bharathidasan University', programs: 'MBA, MA, BA +1', slug: 'bharathidasan-university', initial: 'BDU' },
        { name: 'MIT Pune Online', programs: 'MBA, PGDM Project Management, PGD...', slug: 'mit-pune-online', initial: 'MIT' }
      ]
    }
  ];

  return (
    <section style={{ backgroundColor: '#fafafa', paddingBottom: '70px' }}>
      {/* Dark Cyber Testimonial Hero Banner */}
      <div
        style={{
          backgroundColor: '#0c0517',
          position: 'relative',
          overflow: 'hidden',
          padding: '70px 0 60px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Cyber Grid Lines */}
        <div className="cyber-grid" />

        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '40px'
          }}
        >
          {/* Left Text & Stats */}
          <div style={{ flex: '1 1 540px' }}>
            <p
              style={{
                fontSize: 'clamp(22px, 3.2vw, 34px)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: '36px',
                letterSpacing: '-0.02em'
              }}
            >
              “Apna Advantage wasn’t just a milestone - it became the foundation of my career”
            </p>

            {/* 3 Metrics */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginBottom: '36px',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  24/7
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', marginTop: '4px' }}>
                  STUDENT SUPPORT
                </div>
              </div>

              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  1:1
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', marginTop: '4px' }}>
                  MENTOR GUIDANCE
                </div>
              </div>

              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  100%
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', marginTop: '4px' }}>
                  ONLINE PROCESS
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenCounselling()}
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: 'none',
                padding: '13px 32px',
                borderRadius: '9999px',
                fontSize: '14.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(255, 255, 255, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Get started today <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Video Card */}
          <div
            onClick={onOpenVideo}
            className="hover-lift"
            style={{
              flex: '0 1 440px',
              height: '240px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(0,0,0,0.45)'
            }}
          >
            {/* Top Apna Advantage Badge in Video */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#facc15' }}>apna</span>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#ffffff' }}>advantage</span>
            </div>

            {/* Play Button Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.35)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Play size={26} color="#0f172a" fill="#0f172a" style={{ marginLeft: '4px' }} />
              </div>
            </div>

            {/* Student Name Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>
                Sankaash Bharadwaj
              </div>
              <div style={{ fontSize: '9.5px', color: '#fbbf24', fontWeight: 600 }}>
                Student - Apna Advantage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Category Cards Below the Dark Banner */}
      <div style={{ maxWidth: '1360px', margin: '-40px auto 0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {categoryColumns.map((col) => (
            <div
              key={col.id}
              className="hover-lift"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {/* Card Body with College list */}
              <div style={{ padding: '24px 20px 20px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.universities.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectCollege(item.slug)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 10px',
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#f1f5f9';
                      }}
                    >
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          backgroundColor: '#e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 800,
                          color: '#334155',
                          flexShrink: 0
                        }}
                      >
                        {item.initial}
                      </div>

                      <div style={{ overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: '#0f172a',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                          🎓 {item.programs}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Gradient Glow Strip with Title and Arrow */}
              <div
                onClick={() => onOpenCounselling(null, col.title)}
                style={{
                  background: col.glowColor,
                  padding: '24px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    color: '#0f172a'
                  }}
                >
                  {col.title}
                </div>

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0
                  }}
                >
                  <ArrowRight size={16} color="#0f172a" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
