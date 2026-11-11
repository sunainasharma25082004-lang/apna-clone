import React, { useState, useRef } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight, Plus, X, Star,
  ShieldCheck, Calendar, Wallet, CheckCircle, TrendingUp, Sparkles, Building2
} from 'lucide-react';

const availableColleges = [
  {
    id: 'amity',
    name: 'Amity University',
    shortName: 'Amity Univ',
    location: 'Noida',
    state: 'Uttar Pradesh',
    nirf: 22,
    nirfRankText: '22',
    fees: '₹2,25,000',
    feesNum: 225000,
    rating: 4.9,
    placementRate: 82,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Amity_University_logo.png'
  },
  {
    id: 'lpu',
    name: 'Lovely Professional University',
    shortName: 'LPU',
    location: 'Phagwara',
    state: 'Punjab',
    nirf: 27,
    nirfRankText: '27',
    fees: '₹1,50,000',
    feesNum: 150000,
    rating: 4.8,
    placementRate: 90,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png'
  },
  {
    id: 'cu',
    name: 'Chandigarh University',
    shortName: 'Chandigarh Univ',
    location: 'Mohali',
    state: 'Punjab',
    nirf: 19,
    nirfRankText: '19',
    fees: '₹2,33,500',
    feesNum: 233500,
    rating: 4.8,
    placementRate: 92,
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/08/Chandigarh_University_seal.svg'
  },
  {
    id: 'upes',
    name: 'UPES',
    shortName: 'UPES',
    location: 'Misraspatti',
    state: 'Uttarakhand',
    nirf: 45,
    nirfRankText: '45',
    fees: '₹1,75,000',
    feesNum: 175000,
    rating: 4.7,
    placementRate: 88,
    image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0f/UPES_Logo.png'
  },
  {
    id: 'jain',
    name: 'Jain University',
    shortName: 'Jain Univ',
    location: 'Bangalore',
    state: 'Karnataka',
    nirf: 62,
    nirfRankText: '62',
    fees: '₹1,96,000',
    feesNum: 196000,
    rating: 4.8,
    placementRate: 86,
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png'
  },
  {
    id: 'parul',
    name: 'Parul University',
    shortName: 'Parul Univ',
    location: 'Vadodara',
    state: 'Gujarat',
    nirf: 101,
    nirfRankText: '101-150',
    fees: '₹1,90,000',
    feesNum: 190000,
    rating: 4.7,
    placementRate: 84,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/52/Parul_University_logo.png'
  },
  {
    id: 'sharda',
    name: 'Sharda University',
    shortName: 'Sharda Univ',
    location: 'Greater Noida',
    state: 'Uttar Pradesh',
    nirf: 87,
    nirfRankText: '87',
    fees: '₹1,50,000',
    feesNum: 150000,
    rating: 4.6,
    placementRate: 80,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Sharda_University_logo.png'
  },
  {
    id: 'manav',
    name: 'Manav Rachna University',
    shortName: 'Manav Rachna',
    location: 'Faridabad',
    state: 'Haryana',
    nirf: 110,
    nirfRankText: 'NAAC A++',
    fees: '₹1,65,000',
    feesNum: 165000,
    rating: 4.7,
    placementRate: 85,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Manav_Rachna_logo.png'
  },
  {
    id: 'bdu',
    name: 'Bharathidasan University',
    shortName: 'Bharathidasan',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    nirf: 36,
    nirfRankText: '36',
    fees: '₹90,798',
    feesNum: 90798,
    rating: 4.7,
    placementRate: 85,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png'
  }
];

export default function CompareCollegesPage({ onOpenCounselling, onNavigateHome }) {
  // Selected colleges in the 3 comparison slots (null or college object)
  const [slotColleges, setSlotColleges] = useState([null, null, null]);
  const [activeSlotModalIndex, setActiveSlotModalIndex] = useState(null);

  // Filter for Popular Colleges section
  const [popularStream, setPopularStream] = useState('MBA');
  // Filter for Based On NIRF Rank section
  const [nirfStream, setNirfStream] = useState('MBA');

  const quickAddScrollRef = useRef(null);
  const popularCardsScrollRef = useRef(null);
  const topMbaScrollRef = useRef(null);
  const nirfCardsScrollRef = useRef(null);

  const scrollHorizontally = (ref, direction) => {
    if (ref.current) {
      const offset = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const addCollegeToSlot = (college, targetIndex = null) => {
    setSlotColleges(prev => {
      const updated = [...prev];
      if (targetIndex !== null) {
        updated[targetIndex] = college;
        return updated;
      }
      // Find first empty slot
      const firstEmpty = updated.findIndex(c => c === null);
      if (firstEmpty !== -1) {
        updated[firstEmpty] = college;
      } else {
        // If all 3 full, replace slot 0
        updated[0] = college;
      }
      return updated;
    });
    setActiveSlotModalIndex(null);
  };

  const removeCollegeFromSlot = (index) => {
    setSlotColleges(prev => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const streamsList = ['MBA', 'B.Com', 'BA', 'BBA', 'BCA', 'M.Com', 'M.Sc', 'MA', 'MCA'];
  const nirfStreamsList = ['MBA', 'MA', 'BA', 'B.Com', 'BCA', 'M.Sc', 'BBA', 'MCA', 'M.Com', 'Doctorate', 'Diploma'];

  // Head-to-Head Popular Pairs (Screenshot 3)
  const popularPairs = [
    {
      col1: availableColleges.find(c => c.id === 'cu'),
      col2: availableColleges.find(c => c.id === 'amity'),
      title: 'Chandigarh University vs Amity University'
    },
    {
      col1: availableColleges.find(c => c.id === 'jain'),
      col2: availableColleges.find(c => c.id === 'parul'),
      title: 'Jain University vs Parul University'
    },
    {
      col1: availableColleges.find(c => c.id === 'upes'),
      col2: availableColleges.find(c => c.id === 'sharda'),
      title: 'UPES vs Sharda University'
    },
    {
      col1: { name: 'Vivekananda Global University', shortName: 'Vivekananda..', nirfRankText: '151', location: 'Jaipur', fees: '₹1,50,000', rating: 4.6 },
      col2: availableColleges.find(c => c.id === 'manav'),
      title: 'Vivekananda Global University vs Manav Rachna University'
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'clip' }}>

      {/* SECTION 1: HERO (Matching Screenshot 1) */}
      <section
        style={{
          position: 'relative',
          paddingTop: '60px',
          paddingBottom: '120px',
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(243, 232, 255, 0.7) 0%, transparent 50%),
            radial-gradient(circle at 90% 40%, rgba(254, 226, 226, 0.4) 0%, transparent 60%)
          `,
          backgroundColor: '#faf8fc',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2,
            flexWrap: 'wrap',
            gap: '40px'
          }}
        >
          {/* Left Title & Laurel Badge */}
          <div style={{ flex: '1 1 540px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.18em',
                color: '#1e293b',
                marginBottom: '20px'
              }}
            >
              <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
              <span>12,000+ COMPARISONS DONE</span>
              <span style={{ fontSize: '18px', color: '#64748b' }}>⛓</span>
            </div>

            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(44px, 5.8vw, 76px)',
                fontWeight: 500,
                color: '#09090b',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '24px'
              }}
            >
              Compare and find
              <span
                style={{
                  display: 'block',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#111827'
                }}
              >
                the right university
              </span>
            </h1>
          </div>

          {/* Right Classical Temple Illustration with 3D Circular Pins (Screenshot 1) */}
          <div
            style={{
              flex: '1 1 560px',
              height: '380px',
              position: 'relative',
              borderRadius: '24px',
              backgroundImage: 'url(/images/compare_temple.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Soft pink/purple mist overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(250, 248, 252, 0.3) 0%, transparent 60%)',
                borderRadius: '24px'
              }}
            />

            {/* Pin 1: CREDIBILITY */}
            <div
              style={{
                position: 'absolute',
                top: '22%',
                left: '26%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 3
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.8)'
                }}
              >
                <ShieldCheck size={14} color="#7c3aed" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#4c1d95', letterSpacing: '0.05em' }}>
                  CREDIBILITY
                </span>
              </div>
              <div style={{ width: '1.5px', height: '36px', backgroundColor: 'rgba(255,255,255,0.8)', borderStyle: 'dashed' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #7c3aed' }} />
            </div>

            {/* Pin 2: FLEXIBLE LEARNING */}
            <div
              style={{
                position: 'absolute',
                top: '46%',
                left: '10%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 3
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.8)'
                }}
              >
                <Calendar size={14} color="#7c3aed" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#4c1d95', letterSpacing: '0.05em' }}>
                  FLEXIBLE LEARNING
                </span>
              </div>
              <div style={{ width: '1.5px', height: '30px', backgroundColor: 'rgba(255,255,255,0.8)', borderStyle: 'dashed' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #7c3aed' }} />
            </div>

            {/* Pin 3: BUDGET */}
            <div
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '18%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 3
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.8)'
                }}
              >
                <Wallet size={14} color="#7c3aed" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#4c1d95', letterSpacing: '0.05em' }}>
                  BUDGET
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 3 COMPARISON SLOTS & QUICK ADD (Matching Screenshot 2) */}
      <section style={{ maxWidth: '1360px', margin: '-75px auto 60px auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: '36px 32px 32px 32px',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* 3 Slot Comparison Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '36px'
            }}
          >
            {[0, 1, 2].map((slotIndex) => {
              const college = slotColleges[slotIndex];
              return (
                <div
                  key={slotIndex}
                  style={{
                    height: '190px',
                    borderRadius: '20px',
                    border: college ? '1.5px solid #7c3aed' : '2px dashed #cbd5e1',
                    backgroundColor: college ? '#fdfaff' : '#fcfcfd',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}
                >
                  {/* Faint temple column outline in background */}
                  {!college && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '12px',
                        bottom: '8px',
                        opacity: 0.1,
                        pointerEvents: 'none'
                      }}
                    >
                      <Building2 size={110} color="#64748b" />
                    </div>
                  )}

                  {college ? (
                    /* Filled Slot Card */
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                            {college.name}
                          </div>
                          <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                            📍 {college.location}, {college.state}
                          </div>
                        </div>

                        <button
                          onClick={() => removeCollegeFromSlot(slotIndex)}
                          style={{
                            background: '#f1f5f9',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Remove college"
                        >
                          <X size={15} color="#475569" />
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>STARTING FEE</div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#7c3aed' }}>{college.fees}</div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>NIRF RANK</div>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: '#10b981' }}>#{college.nirf}</div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>RATING</div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>★ {college.rating}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Empty Slot Card with "Add College ⊕" button (Screenshot 2) */
                    <button
                      onClick={() => setActiveSlotModalIndex(slotIndex)}
                      style={{
                        backgroundColor: '#4e12bb',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 28px',
                        borderRadius: '9999px',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(78, 18, 187, 0.3)',
                        transition: 'all 0.2s ease',
                        zIndex: 2
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b0764';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#4e12bb';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Add College <Plus size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Add Bar Header: "Need help choosing? Start here" (Screenshot 2) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px'
            }}
          >
            <div style={{ fontSize: '14.5px', color: '#334155' }}>
              Need help choosing? <strong style={{ color: '#0f172a', cursor: 'pointer' }} onClick={() => onOpenCounselling()}>Start here</strong>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => scrollHorizontally(quickAddScrollRef, 'left')}
                style={{
                  width: '32px',
                  height: '32px',
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
                <ChevronLeft size={16} color="#475569" />
              </button>
              <button
                onClick={() => scrollHorizontally(quickAddScrollRef, 'right')}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Scroll right"
              >
                <ChevronRight size={16} color="#475569" />
              </button>
            </div>
          </div>

          {/* Quick Add Horizontal Carousel (Screenshot 2) */}
          <div
            ref={quickAddScrollRef}
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'none'
            }}
          >
            {availableColleges.map((col) => (
              <div
                key={col.id}
                onClick={() => addCollegeToSlot(col)}
                className="hover-lift"
                style={{
                  flex: '0 0 160px',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                {/* College Image Banner */}
                <div
                  style={{
                    height: '80px',
                    position: 'relative',
                    backgroundImage: `url(${col.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Purple Circle '+' button */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Plus size={14} color="#7c3aed" strokeWidth={3} />
                  </div>
                </div>

                {/* College Details */}
                <div style={{ padding: '10px 12px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0f172a',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {col.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    📍 {col.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: "Popular colleges" HEAD-TO-HEAD CARDS (Matching Screenshot 3) */}
      <section style={{ maxWidth: '1360px', margin: '0 auto 70px auto', padding: '0 24px' }}>
        {/* Title and Carousel Arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Popular colleges
          </h2>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scrollHorizontally(popularCardsScrollRef, 'left')}
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
              <ChevronLeft size={18} color="#475569" />
            </button>
            <button
              onClick={() => scrollHorizontally(popularCardsScrollRef, 'right')}
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
              aria-label="Scroll right"
            >
              <ChevronRight size={18} color="#475569" />
            </button>
          </div>
        </div>

        {/* Filter Pills: MBA, B.Com, BA, BBA, BCA, M.Com, M.Sc, MA, MCA (Screenshot 3) */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {streamsList.map((stream) => {
            const isSelected = popularStream === stream;
            return (
              <button
                key={stream}
                onClick={() => setPopularStream(stream)}
                style={{
                  padding: '8px 22px',
                  borderRadius: '9999px',
                  backgroundColor: isSelected ? '#ffffff' : '#ffffff',
                  color: isSelected ? '#5218c9' : '#334155',
                  border: isSelected ? '1.5px solid #5218c9' : '1px solid #e2e8f0',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {stream}
              </button>
            );
          })}
        </div>

        {/* Head-to-Head Comparison Cards Grid (Screenshot 3) */}
        <div
          ref={popularCardsScrollRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none'
          }}
        >
          {popularPairs.map((pair, idx) => (
            <div
              key={idx}
              className="hover-lift"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Banner Header */}
              <div
                style={{
                  height: '110px',
                  position: 'relative',
                  backgroundImage: `url(${pair.col1?.image || availableColleges[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.4) 100%)'
                  }}
                />
                <h3
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.3
                  }}
                >
                  {pair.title}
                </h3>
              </div>

              {/* Head-to-Head Comparison Data */}
              <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* College Names Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  <div style={{ color: '#64748b' }}>College</div>
                  <div style={{ textAlign: 'center' }}>{pair.col1?.shortName}</div>
                  <div style={{ textAlign: 'center' }}>{pair.col2?.shortName}</div>
                </div>

                {/* NIRF Rank Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontSize: '13px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>NIRF Rank</div>
                  <div style={{ textAlign: 'center', fontWeight: 800, color: '#059669' }}>{pair.col1?.nirfRankText || '19'}</div>
                  <div style={{ textAlign: 'center', fontWeight: 800, color: '#334155' }}>{pair.col2?.nirfRankText || '22'}</div>
                </div>

                {/* Location Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontSize: '13px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>Location</div>
                  <div style={{ textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{pair.col1?.location}</div>
                  <div style={{ textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{pair.col2?.location}</div>
                </div>

                {/* Fees Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontSize: '13px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>Fees</div>
                  <div style={{ textAlign: 'center', fontWeight: 800, color: '#059669' }}>{pair.col1?.fees}</div>
                  <div style={{ textAlign: 'center', fontWeight: 800, color: '#059669' }}>{pair.col2?.fees}</div>
                </div>

                {/* Rating Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontSize: '13px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>Rating</div>
                  <div style={{ textAlign: 'center', color: '#0f172a', fontWeight: 700 }}>★★★★★</div>
                  <div style={{ textAlign: 'center', color: '#0f172a', fontWeight: 700 }}>★★★★★</div>
                </div>

                {/* Card Footer: "Most Popular" and Right Arrow Button (Screenshot 3) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#f1f5f9',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#475569'
                    }}
                  >
                    ↗ Most Popular
                  </div>

                  <button
                    onClick={() => {
                      if (pair.col1) addCollegeToSlot(pair.col1, 0);
                      if (pair.col2) addCollegeToSlot(pair.col2, 1);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#4e12bb',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(78, 18, 187, 0.3)'
                    }}
                  >
                    <ArrowRight size={16} color="#ffffff" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: DARK BANNER "Compare and choose the college that fits your budget" (Screenshot 4) */}
      <section style={{ maxWidth: '1360px', margin: '0 auto 70px auto', padding: '0 24px' }}>
        <div
          style={{
            backgroundColor: '#0c0714',
            borderRadius: '24px',
            padding: '40px 48px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Cyber perspective grid */}
          <div className="cyber-grid" />

          {/* Left Text */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '520px' }}>
            <h3
              style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: 1.25
              }}
            >
              Compare and choose the college that fits your budget
            </h3>

            <button
              onClick={() => onOpenCounselling()}
              style={{
                backgroundColor: 'transparent',
                color: '#facc15',
                border: '1.5px solid #facc15',
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#facc15';
                e.currentTarget.style.color = '#0c0714';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#facc15';
              }}
            >
              EXPLORE &gt;
            </button>
          </div>

          {/* Right Glowing Neon Pink Temple Graphic (Screenshot 4) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 0 25px rgba(244, 63, 94, 0.6))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '160px',
                height: '120px',
                borderRadius: '16px',
                border: '2px solid #f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Temple Pediment Triangle */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  width: 0,
                  height: 0,
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderBottom: '30px solid #f43f5e'
                }}
              />
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '12px', height: '60px', backgroundColor: '#f43f5e', borderRadius: '4px' }} />
                <div style={{ width: '12px', height: '60px', backgroundColor: '#f43f5e', borderRadius: '4px' }} />
                <div style={{ width: '12px', height: '60px', backgroundColor: '#f43f5e', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: "MOST COMPARED COLLEGES" / Top MBA Colleges (Screenshot 4) */}
      <section style={{ maxWidth: '1360px', margin: '0 auto 70px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.1em' }}>
              MOST COMPARED COLLEGES
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
              Top MBA Colleges
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scrollHorizontally(topMbaScrollRef, 'left')}
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
            >
              <ChevronLeft size={18} color="#475569" />
            </button>
            <button
              onClick={() => scrollHorizontally(topMbaScrollRef, 'right')}
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
            >
              <ChevronRight size={18} color="#475569" />
            </button>
          </div>
        </div>

        {/* Carousel of Top MBA Colleges */}
        <div
          ref={topMbaScrollRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none'
          }}
        >
          {availableColleges.slice(0, 5).map((col) => (
            <div
              key={col.id}
              onClick={() => addCollegeToSlot(col)}
              className="hover-lift"
              style={{
                flex: '0 0 240px',
                borderRadius: '20px',
                overflow: 'hidden',
                height: '240px',
                position: 'relative',
                backgroundImage: `url(${col.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}
            >
              {/* Logo pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#1e1b4b',
                  zIndex: 2
                }}
              >
                {col.name.split(' ')[0]}
              </div>

              {/* Gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)'
                }}
              />

              {/* Bottom name and '+' button */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 2
                }}
              >
                <div style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 700 }}>
                  {col.name}
                </div>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={16} color="#4e12bb" strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: "BASED ON NIRF RANK" / Top colleges for you (Screenshot 4) */}
      <section style={{ maxWidth: '1360px', margin: '0 auto 70px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.1em' }}>
              BASED ON NIRF RANK
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
              Top colleges for you
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scrollHorizontally(nirfCardsScrollRef, 'left')}
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
            >
              <ChevronLeft size={18} color="#475569" />
            </button>
            <button
              onClick={() => scrollHorizontally(nirfCardsScrollRef, 'right')}
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
            >
              <ChevronRight size={18} color="#475569" />
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {nirfStreamsList.map((stream) => {
            const isSelected = nirfStream === stream;
            return (
              <button
                key={stream}
                onClick={() => setNirfStream(stream)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: isSelected ? '#5218c9' : '#334155',
                  border: isSelected ? '1.5px solid #5218c9' : '1px solid #e2e8f0',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {stream}
              </button>
            );
          })}
        </div>

        {/* Placement rate detail cards */}
        <div
          ref={nirfCardsScrollRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none'
          }}
        >
          {availableColleges.slice(0, 4).map((col) => (
            <div
              key={col.id}
              className="hover-lift"
              style={{
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
              }}
            >
              <div
                style={{
                  height: '160px',
                  backgroundImage: `url(${col.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              />

              <div style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  {col.name}
                </h4>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px' }}>
                    NIRF #{col.nirf}
                  </span>
                  <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px' }}>
                    {col.state}
                  </span>
                </div>

                {/* Placement % bar (Screenshot 4) */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <span>Placement %</span>
                    <span>{col.placementRate}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${col.placementRate}%`, height: '100%', backgroundColor: '#0f172a', borderRadius: '9999px' }} />
                  </div>
                </div>

                {/* Rating and '+' button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Rating</span>
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>★★★★★</span>
                  </div>

                  <button
                    onClick={() => addCollegeToSlot(col)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#7c3aed',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={16} color="#ffffff" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: "Confused about where to start?" COUNSELLING BANNER (Screenshot 4) */}
      <section style={{ maxWidth: '1360px', margin: '0 auto 80px auto', padding: '0 24px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: '40px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '30px'
          }}
        >
          {/* Left Student Image with Floating Thought Bubbles */}
          <div style={{ position: 'relative', width: '280px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              alt="Student"
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
            {/* Thought bubbles: Eligibility?, Fees?, College?, Course? */}
            <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '10.5px', fontWeight: 800, color: '#64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              Eligibility?
            </span>
            <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '10.5px', fontWeight: 800, color: '#64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              Fees?
            </span>
            <span style={{ position: 'absolute', bottom: '20px', left: '0px', backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '10.5px', fontWeight: 800, color: '#64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              College?
            </span>
            <span style={{ position: 'absolute', bottom: '25px', right: '10px', backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '10.5px', fontWeight: 800, color: '#64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              Course?
            </span>
          </div>

          {/* Center Text */}
          <div style={{ flex: '1 1 450px' }}>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Confused about where to start?
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}>
              Get personalised guidance from our experts who have helped 50,000+ students
            </p>

            <button
              onClick={() => onOpenCounselling()}
              style={{
                backgroundColor: '#4e12bb',
                color: '#ffffff',
                border: 'none',
                padding: '13px 32px',
                borderRadius: '9999px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(78, 18, 187, 0.35)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3b0764'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4e12bb'}
            >
              Get free counselling
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: Select College for Empty Slot */}
      {activeSlotModalIndex !== null && (
        <div className="modal-backdrop" onClick={() => setActiveSlotModalIndex(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                Select College for Slot {activeSlotModalIndex + 1}
              </h3>
              <button onClick={() => setActiveSlotModalIndex(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '20px 24px', maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {availableColleges.map((c) => (
                <div
                  key={c.id}
                  onClick={() => addCollegeToSlot(c, activeSlotModalIndex)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3ebff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>📍 {c.location} • Starting {c.fees}</div>
                  </div>
                  <button
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#4e12bb',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
