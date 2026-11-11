import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const globalUniversities = [
  { name: 'GLA University', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A+' },
  { name: 'Liverpool Business School', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80', badge: 'UK Degree' },
  { name: 'Yenepoya University Online', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A+' },
  { name: 'Liverpool John Moores University', image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&auto=format&fit=crop&q=80', badge: 'WES Equiv' },
  { name: 'Rushford Business School Online', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80', badge: 'Switzerland' },
  { name: 'Jain University', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A++' },
  { name: 'Lovely Professional University', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80', badge: 'NIRF #38' },
  { name: 'Amity University', image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&auto=format&fit=crop&q=80', badge: 'QS Ranked' },
  { name: 'Shoolini University', image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&auto=format&fit=crop&q=80', badge: 'THE #1' },
  { name: 'Vivekananda Global University', image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A+' },
  { name: 'Chandigarh University', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80', badge: 'QS Asia' },
  { name: 'Dr. D. Y. Patil Vidyapeeth', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A++' },
  { name: 'Parul University', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A++' },
  { name: 'Paris School of Business', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=80', badge: 'AMBA France' },
  { name: 'Sharda University', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80', badge: 'NAAC A+' },
  { name: 'O.P. Jindal Global University', image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=400&auto=format&fit=crop&q=80', badge: 'QS #1' }
];

export default function GloballyRecognised({ onOpenCounselling }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        padding: '60px 0 70px 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top Header Row with Laurel Badge and Nav arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#1e293b'
            }}
          >
            <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
            <span>GLOBALLY RECOGNISED UNIVERSITIES</span>
            <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scroll('left')}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
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
                backgroundColor: '#334155',
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

        {/* Arched Top Cards Carousel */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '18px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory'
          }}
        >
          {globalUniversities.map((item, index) => (
            <div
              key={index}
              onClick={() => onOpenCounselling(null, item.name)}
              className="hover-lift"
              style={{
                flex: '0 0 170px',
                borderRadius: '24px',
                borderTopLeftRadius: '85px',
                borderTopRightRadius: '85px',
                overflow: 'hidden',
                position: 'relative',
                height: '240px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                scrollSnapAlign: 'start',
                border: '1px solid #e2e8f0'
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              {/* Arched White Logo Pill at Top Center */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  color: '#4338ca',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  whiteSpace: 'nowrap',
                  zIndex: 2
                }}
              >
                {item.badge}
              </div>

              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
                  zIndex: 1
                }}
              />

              {/* Text & Button at Bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '14px 12px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    maxWidth: '105px'
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    flexShrink: 0
                  }}
                >
                  <ArrowRight size={13} color="#0f172a" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
