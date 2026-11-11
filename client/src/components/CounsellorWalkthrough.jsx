import React, { useState } from 'react';
import { ArrowRight, Video, Calendar, Star, CheckCircle, Award, Compass, MousePointer2 } from 'lucide-react';

export default function CounsellorWalkthrough({ onOpenCounselling, onOpenEligibility }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCounsellor, setSelectedCounsellor] = useState('Kajal Agarwal');

  const counsellors = [
    {
      name: 'Akshitha Badiger',
      sessions: '745+ SESSIONS',
      exp: '3 YRS+',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      isPrimary: true
    },
    {
      name: 'Kajal Agarwal',
      sessions: '251+ SESSIONS',
      exp: '2 YRS+',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      isPrimary: false
    },
    {
      name: 'Rishabh Sharma',
      sessions: '224+ SESSIONS',
      exp: '3 YRS+',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      isPrimary: false
    },
    {
      name: 'George Philip',
      sessions: '360+ SESSIONS',
      exp: '4 YRS+',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      isPrimary: false
    }
  ];

  return (
    <section
      style={{
        padding: '90px 0 100px 0',
        backgroundColor: '#fafbfc',
        position: 'relative',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Step Navigation Pill Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#e2e8f0',
              padding: '4px',
              borderRadius: '9999px',
              gap: '4px'
            }}
          >
            <button
              onClick={() => setActiveStep(1)}
              style={{
                padding: '8px 24px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeStep === 1 ? '#4e12bb' : 'transparent',
                color: activeStep === 1 ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Step 1: Meet Counsellor
            </button>
            <button
              onClick={() => setActiveStep(2)}
              style={{
                padding: '8px 24px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeStep === 2 ? '#4e12bb' : 'transparent',
                color: activeStep === 2 ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Step 2: Career Analysis
            </button>
          </div>
        </div>

        {/* STEP 1: Meet your career counsellor (Matching Image 9) */}
        {activeStep === 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '60px',
              flexWrap: 'wrap'
            }}
          >
            {/* Left Column with giant "1" */}
            <div style={{ flex: '1 1 480px', position: 'relative' }}>
              <div
                style={{
                  fontSize: 'clamp(90px, 11vw, 150px)',
                  fontWeight: 900,
                  color: 'rgba(0, 0, 0, 0.08)',
                  lineHeight: 0.9,
                  marginBottom: '10px',
                  userSelect: 'none'
                }}
              >
                1
              </div>

              <h2
                style={{
                  fontSize: 'clamp(32px, 4.2vw, 48px)',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '22px'
                }}
              >
                Meet your<br />career counsellor
              </h2>

              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: '#334155',
                  maxWidth: '460px',
                  marginBottom: '36px'
                }}
              >
                Connect 1:1 with a dedicated career counsellor who understands your goals and ambitions.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onOpenCounselling(null, null, false, selectedCounsellor)}
                  className="btn-primary"
                  style={{
                    backgroundColor: '#4e12bb',
                    padding: '13px 30px',
                    fontSize: '14.5px'
                  }}
                >
                  Get Started <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setActiveStep(2)}
                  className="btn-outline-purple"
                  style={{
                    padding: '12px 28px',
                    fontSize: '14.5px',
                    border: '1.5px solid #4e12bb',
                    color: '#4e12bb'
                  }}
                >
                  What is a roadmap?
                </button>
              </div>
            </div>

            {/* Right Card with live counsellor video cards (Matching Image 9) */}
            <div
              style={{
                flex: '1 1 540px',
                backgroundColor: '#f1f5f9',
                borderRadius: '36px',
                padding: '40px 30px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)'
              }}
            >
              {/* Card Grid Pattern */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none'
                }}
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Secondary counsellor thumbnails */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Kajal Agarwal card with pointer cursor */}
                  <div
                    onClick={() => {
                      setSelectedCounsellor('Kajal Agarwal');
                      onOpenCounselling(null, null, false, 'Kajal Agarwal');
                    }}
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      height: '110px',
                      position: 'relative',
                      backgroundImage: `url(${counsellors[1].image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      border: selectedCounsellor === 'Kajal Agarwal' ? '2.5px solid #6d28d9' : '1px solid rgba(255,255,255,0.4)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: '8px', left: '10px', zIndex: 2 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                        Kajal Agarwal
                      </div>
                      <div style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: 600 }}>
                        251+ SESSIONS
                      </div>
                    </div>

                    {/* Styled Purple Cursor Arrow overlay matching Image 9 */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '14px',
                        zIndex: 10,
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))'
                      }}
                    >
                      <MousePointer2 size={28} color="#6d28d9" fill="#7c3aed" />
                    </div>
                  </div>

                  {/* Rishabh Sharma card */}
                  <div
                    onClick={() => {
                      setSelectedCounsellor('Rishabh Sharma');
                      onOpenCounselling(null, null, false, 'Rishabh Sharma');
                    }}
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      height: '110px',
                      position: 'relative',
                      backgroundImage: `url(${counsellors[2].image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      border: selectedCounsellor === 'Rishabh Sharma' ? '2.5px solid #6d28d9' : '1px solid rgba(255,255,255,0.4)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: '8px', left: '10px', zIndex: 2 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                        Rishabh Sharma
                      </div>
                      <div style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: 600 }}>
                        224+ SESSIONS • 3 YRS+
                      </div>
                    </div>
                  </div>

                  {/* George Philip card */}
                  <div
                    onClick={() => {
                      setSelectedCounsellor('George Philip');
                      onOpenCounselling(null, null, false, 'George Philip');
                    }}
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      height: '80px',
                      position: 'relative',
                      backgroundImage: `url(${counsellors[3].image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      border: selectedCounsellor === 'George Philip' ? '2.5px solid #6d28d9' : '1px solid rgba(255,255,255,0.4)'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: '8px', left: '10px', zIndex: 2 }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>
                        George Philip
                      </div>
                      <div style={{ fontSize: '8.5px', color: '#cbd5e1', fontWeight: 600 }}>
                        360+ SESSIONS
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Prominent Counsellor Video (Akshitha Badiger) */}
                <div
                  onClick={() => {
                    setSelectedCounsellor('Akshitha Badiger');
                    onOpenCounselling(null, null, false, 'Akshitha Badiger');
                  }}
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '320px',
                    position: 'relative',
                    backgroundImage: `url(${counsellors[0].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    border: selectedCounsellor === 'Akshitha Badiger' ? '2.5px solid #6d28d9' : '1px solid rgba(255,255,255,0.4)'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)'
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                      Akshitha Badiger
                    </div>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: '#e2e8f0', fontWeight: 700 }}>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                        745+ SESSIONS
                      </span>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                        3 YRS+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Analyse your goals & career plans (Matching Image 10) */}
        {activeStep === 2 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '60px',
              flexWrap: 'wrap'
            }}
          >
            {/* Left Column with giant "2" */}
            <div style={{ flex: '1 1 480px', position: 'relative' }}>
              <div
                style={{
                  fontSize: 'clamp(90px, 11vw, 150px)',
                  fontWeight: 900,
                  color: 'rgba(0, 0, 0, 0.08)',
                  lineHeight: 0.9,
                  marginBottom: '10px',
                  userSelect: 'none'
                }}
              >
                2
              </div>

              <h2
                style={{
                  fontSize: 'clamp(32px, 4.2vw, 48px)',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '22px'
                }}
              >
                Analyse your goals<br />& career plans
              </h2>

              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: '#334155',
                  maxWidth: '460px',
                  marginBottom: '36px'
                }}
              >
                Your counsellor will go through your education, goals, and job. No judgment. No pressure. Just clarity on what to do next.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onOpenCounselling()}
                  className="btn-primary"
                  style={{
                    backgroundColor: '#4e12bb',
                    padding: '13px 30px',
                    fontSize: '14.5px'
                  }}
                >
                  Get Started <ArrowRight size={16} />
                </button>

                <button
                  onClick={onOpenEligibility}
                  className="btn-outline-purple"
                  style={{
                    padding: '12px 28px',
                    fontSize: '14.5px',
                    border: '1.5px solid #4e12bb',
                    color: '#4e12bb'
                  }}
                >
                  Check eligibility
                </button>
              </div>
            </div>

            {/* Right Card (Roadmap Visualizer Matching Image 10) */}
            <div
              style={{
                flex: '1 1 540px',
                backgroundColor: '#f8fafc',
                borderRadius: '36px',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0'
              }}
            >
              {/* Subtle Grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none'
                }}
              />

              {/* Interactive Analysis Pills */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '18px 24px',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Compass size={22} color="#4338ca" />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                        Career Diagnostic & Salary Benchmark
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Analyzes your past education and current role
                      </div>
                    </div>
                  </div>
                  <CheckCircle size={20} color="#10b981" />
                </div>

                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '18px 24px',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award size={22} color="#d97706" />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                        University Fitment & ROI Analysis
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Finds NAAC A+ universities within your monthly budget
                      </div>
                    </div>
                  </div>
                  <CheckCircle size={20} color="#10b981" />
                </div>

                {/* Purple Pointer Cursor matching Image 10 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.2))'
                  }}
                >
                  <MousePointer2 size={36} color="#6d28d9" fill="#7c3aed" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
