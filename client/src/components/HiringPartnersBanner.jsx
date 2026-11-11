import React from 'react';
import { ArrowRight } from 'lucide-react';

// Floating bubbles positions matching Image 8 layout
const bubbleLogos = [
  // Left side bubbles
  { name: 'Kotak Life', top: '28%', left: '8%', size: '36px', initial: 'KL', color: '#ED1C24' },
  { name: 'Google', top: '35%', left: '12%', size: '54px', initial: 'G', color: '#EA4335' },
  { name: 'Aditya Birla', top: '44%', left: '5%', size: '60px', initial: 'AB', color: '#881337' },
  { name: 'Paytm', top: '43%', left: '19%', size: '60px', initial: 'Paytm', color: '#00B9F5' },
  { name: 'HDFC Bank', top: '65%', left: '10%', size: '48px', initial: 'HDFC', color: '#004C8F' },
  { name: 'Amazon', top: '61%', left: '17%', size: '60px', initial: 'amazon', color: '#FF9900' },
  { name: 'D-Mart', top: '80%', left: '6%', size: '48px', initial: 'D-Mart', color: '#059669' },
  { name: 'Zepto', top: '78%', left: '15%', size: '58px', initial: 'zepto', color: '#7c3aed' },
  { name: 'Jio', top: '77%', left: '23%', size: '40px', initial: 'Jio', color: '#0284c7' },
  { name: 'TATA', top: '63%', left: '25%', size: '54px', initial: 'TATA', color: '#0f172a' },
  { name: 'TCS', top: '79%', left: '28%', size: '60px', initial: 'TCS', color: '#1e3a8a' },

  // Right side bubbles
  { name: 'Meesho', top: '32%', right: '9%', size: '36px', initial: 'meesho', color: '#db2777' },
  { name: 'Zomato', top: '46%', right: '23%', size: '60px', initial: 'zomato', color: '#e11d48' },
  { name: 'Infosys', top: '44%', right: '15%', size: '54px', initial: 'Infosys', color: '#0284c7' },
  { name: 'Reliance', top: '53%', right: '9%', size: '60px', initial: 'Reliance', color: '#1e3a8a' },
  { name: 'Flipkart', top: '62%', right: '21%', size: '58px', initial: 'f', color: '#facc15' },
  { name: 'Cisco', top: '69%', right: '28%', size: '52px', initial: 'cisco', color: '#0284c7' },
  { name: 'Hero', top: '68%', right: '13%', size: '48px', initial: 'Hero', color: '#dc2626' },
  { name: 'Zee', top: '77%', right: '8%', size: '50px', initial: 'ZEE', color: '#581c87' },
  { name: 'Airtel', top: '86%', right: '30%', size: '58px', initial: 'airtel', color: '#dc2626' },
  { name: 'Wipro', top: '82%', right: '18%', size: '58px', initial: 'wipro', color: '#ea580c' },
  { name: 'Kotak Life', top: '80%', right: '25%', size: '36px', initial: 'KL', color: '#ED1C24' }
];

export default function HiringPartnersBanner({ onOpenCounselling, onExplorePrograms }) {
  return (
    <section
      style={{
        width: '100%',
        position: 'relative',
        height: '620px',
        overflow: 'hidden',
        backgroundImage: 'url(/images/hiring_landscape.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}
    >
      {/* Light gradient overlay for center readability while retaining landscape beauty */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Center Content */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: '850px' }}>
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
            color: '#0f172a',
            marginBottom: '16px'
          }}
        >
          <span style={{ fontSize: '18px', color: '#475569' }}>⛓</span>
          <span>7 LAKHS+ HIRING PARTNERS</span>
          <span style={{ fontSize: '18px', color: '#475569' }}>⛓</span>
        </div>

        {/* Display Headline */}
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 500,
            color: '#09090b',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '32px'
          }}
        >
          Bridge the gap between
          <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 400 }}>
            education & career
          </span>
        </h2>

        {/* Button */}
        <button
          onClick={onExplorePrograms}
          className="btn-primary"
          style={{
            padding: '14px 36px',
            fontSize: '15.5px',
            backgroundColor: '#4c0576',
            boxShadow: '0 8px 30px rgba(76, 5, 118, 0.45)'
          }}
        >
          Job-ready degrees <ArrowRight size={17} />
        </button>
      </div>

      {/* Floating 3D Bubbles with Logo Badges */}
      {bubbleLogos.map((bubble, i) => (
        <div
          key={i}
          className="hover-lift"
          style={{
            position: 'absolute',
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 4,
            animation: `floatUpAndDown ${3.5 + (i % 4) * 0.8}s ease-in-out infinite alternate`,
            animationDelay: `${(i % 5) * 0.4}s`
          }}
          title={bubble.name}
          onClick={() => onOpenCounselling(null, `Placement with ${bubble.name}`)}
        >
          <span
            style={{
              fontSize: parseInt(bubble.size) > 50 ? '11px' : '9px',
              fontWeight: 800,
              color: bubble.color || '#1e293b',
              textAlign: 'center',
              lineHeight: 1
            }}
          >
            {bubble.initial}
          </span>
        </div>
      ))}
    </section>
  );
}
