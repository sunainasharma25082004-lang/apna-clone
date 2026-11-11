import React, { useRef } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const compareUniversities = [
  {
    name: 'Golden Gate University',
    slug: 'golden-gate-university',
    fees: '₹ ₹ ₹ ₹',
    rating: 5,
    naac: 'WASC (USA)',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Alliance University',
    slug: 'alliance-university',
    fees: '₹ ₹ ₹ ₹',
    rating: 5,
    naac: 'NAAC A+',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Edgewood University',
    slug: 'edgewood-university',
    fees: '₹ ₹ ₹ ₹',
    rating: 5,
    naac: 'HLC (USA)',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'UPES Online',
    slug: 'upes-online',
    fees: '₹ ₹ ₹ ₹',
    rating: 4,
    naac: 'NAAC A',
    image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'MIT Pune Online',
    slug: 'mit-pune-online',
    fees: '₹ ₹ ₹ ₹',
    rating: 4,
    naac: 'NAAC A+',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'O.P. Jindal Global University',
    slug: 'op-jindal-global-university',
    fees: '₹ ₹ ₹ ₹',
    rating: 5,
    naac: 'NAAC A',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=600&auto=format&fit=crop&q=80'
  }
];

export default function UniversityComparison({ onOpenCompare }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        padding: '75px 0 85px 0',
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '36px',
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
              Pick the right university
            </h2>
            <p
              style={{
                fontSize: '15.5px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 500
              }}
            >
              Compare top NAAC A+ colleges that fit your budget & career goals
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onOpenCompare}
              className="btn-outline-purple"
              style={{
                padding: '11px 26px',
                fontSize: '14px',
                border: '1.5px solid #5b14c7',
                color: '#5b14c7'
              }}
            >
              Compare colleges <ArrowRight size={15} />
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => scroll('left')}
                style={{
                  width: '36px',
                  height: '36px',
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
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#475569',
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
        </div>

        {/* Monochrome / Greyscale College Cards Carousel (Image 11 style) */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'none'
          }}
        >
          {compareUniversities.map((college, idx) => (
            <div
              key={idx}
              onClick={onOpenCompare}
              className="hover-lift"
              style={{
                flex: '0 0 250px',
                borderRadius: '24px',
                overflow: 'hidden',
                height: '300px',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                filter: 'grayscale(85%) contrast(105%)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid #d1d5db'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%) contrast(100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(85%) contrast(105%)';
              }}
            >
              {/* Campus Architecture Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${college.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              {/* Top Arched Logo Banner */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(4px)',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: '#1e293b',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  zIndex: 2
                }}
              >
                {college.naac}
              </div>

              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)',
                  zIndex: 1
                }}
              />

              {/* Bottom Details (Fees & Star Rating) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '18px 16px',
                  zIndex: 2
                }}
              >
                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    lineHeight: 1.25
                  }}
                >
                  {college.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div style={{ color: '#cbd5e1', fontWeight: 600 }}>
                    Fees <span style={{ color: '#ffffff', letterSpacing: '2px', marginLeft: '4px' }}>{college.fees}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600, marginRight: '4px' }}>Rating</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        color={i < college.rating ? '#ffffff' : '#64748b'}
                        fill={i < college.rating ? '#ffffff' : 'transparent'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
