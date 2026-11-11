import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CandidateBanner({ onOpenEligibility }) {
  return (
    <section
      style={{
        width: '100%',
        padding: '24px',
        backgroundColor: '#fafafa'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          height: '420px',
          borderRadius: '32px',
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: 'url(/images/meadow_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '50px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Soft dark vignette gradient at bottom so text and button pop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Text and Button */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.45)'
            }}
          >
            Built for the top 1% candidates
          </h2>

          <button
            onClick={onOpenEligibility}
            style={{
              backgroundColor: 'rgba(25, 25, 25, 0.72)',
              color: '#ffffff',
              border: '1.2px solid rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '13px 32px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.25s ease',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 15, 15, 0.9)';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(25, 25, 25, 0.72)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Check eligibility <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
