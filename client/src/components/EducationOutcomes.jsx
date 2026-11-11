import React from 'react';

export default function EducationOutcomes({ onOpenCounselling, onOpenEligibility }) {
  const cards = [
    {
      id: 1,
      title: 'FIND YOUR\nDREAM COLLEGE',
      description: 'Our experts recommend the best-fit universities based on your profile.',
      btnText: 'TALK TO COUNSELLOR',
      onClick: () => onOpenCounselling()
    },
    {
      id: 2,
      title: 'ENROLL &\nGET STARTED',
      description: 'Easy application, quick approvals, zero hassle with end-to-end guidance.',
      btnText: 'START ENROLLMENT',
      onClick: () => onOpenCounselling(null, null, false, null, 'Enrollment Guidance')
    },
    {
      id: 3,
      title: 'UNLOCK APNA\nADVANTAGE BENEFITS',
      description: 'Unlock direct HR connects, 1:1 career coaching, and exclusive career support.',
      btnText: 'CLAIM YOUR BENEFITS',
      onClick: onOpenEligibility
    }
  ];

  return (
    <section
      style={{
        padding: '90px 0 100px 0',
        backgroundColor: '#ffffff',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Pillars Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(124, 58, 237, 0.05) 0%, transparent 60%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        {/* Laurel Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13.5px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#1e293b',
            marginBottom: '16px'
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
          <span>FIND YOUR CAREER PATH</span>
          <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
        </div>

        {/* Display Headline */}
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(40px, 5.5vw, 68px)',
            fontWeight: 500,
            color: '#09090b',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '60px'
          }}
        >
          Education that drives outcomes
        </h2>

        {/* 3 Outcome Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="hover-lift"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '32px',
                padding: '50px 32px 42px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1.5px solid rgba(0, 0, 0, 0.07)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                minHeight: '340px'
              }}
            >
              {/* Subtle top-right dotted/grid texture */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '160px',
                  height: '160px',
                  backgroundImage: `
                    radial-gradient(circle, #7c3aed 1px, transparent 1px)
                  `,
                  backgroundSize: '16px 16px',
                  opacity: 0.15,
                  pointerEvents: 'none'
                }}
              />

              {/* Title & Description */}
              <div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#0f172a',
                    lineHeight: 1.35,
                    whiteSpace: 'pre-line',
                    marginBottom: '20px'
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#475569',
                    maxWidth: '300px',
                    margin: '0 auto'
                  }}
                >
                  {card.description}
                </p>
              </div>

              {/* Action Button at bottom */}
              <div style={{ marginTop: '36px' }}>
                <button
                  onClick={card.onClick}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    backgroundColor: 'transparent',
                    border: '1.5px solid #6d28d9',
                    color: '#6d28d9',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 2px 8px rgba(109, 40, 217, 0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6d28d9';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(109, 40, 217, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6d28d9';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(109, 40, 217, 0.08)';
                  }}
                >
                  {card.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
