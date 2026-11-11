import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Star, Award, FileText, BookOpen, Banknote } from 'lucide-react';

export default function ProgramsCatalog({ onOpenCounselling, onOpenCompare }) {
  const [activeTab, setActiveTab] = useState('Bachelors');
  const [activeStream, setActiveStream] = useState('BBA');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const tabs = [
    { id: 'Bachelors', label: 'Bachelors', icon: GraduationCap },
    { id: 'Masters', label: 'Masters', icon: Star },
    { id: 'Doctorate', label: 'Doctorate', icon: Award },
    { id: 'Certifications', label: 'Certifications', icon: FileText },
    { id: 'Diploma', label: 'Diploma', icon: BookOpen }
  ];

  const streamFilters = {
    Bachelors: ['BBA', 'B.COM', 'BCA', 'BA'],
    Masters: ['MBA', 'MCA', 'M.COM', 'MA'],
    Doctorate: ['DBA', 'PHD'],
    Certifications: ['DATA SCIENCE', 'MARKETING', 'AI'],
    Diploma: ['PGDM', 'ADVANCED DIPLOMA']
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const streams = streamFilters[tabId] || [];
    setActiveStream(streams[0] || 'All');
    setCurrentPage(0);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/programs?level=${encodeURIComponent(activeTab)}&stream=${encodeURIComponent(activeStream)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setPrograms(data.data);
        } else {
          // Fallback if specific combination is sparse: query all programs for this degree level
          fetch(`http://localhost:5000/api/programs?level=${encodeURIComponent(activeTab)}`)
            .then(r => r.json())
            .then(fallbackData => {
              setPrograms(fallbackData.data || []);
            });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [activeTab, activeStream]);

  // Display 6 cards per page (2 rows x 3 columns) or 8 cards
  const cardsPerPage = 6;
  const totalPages = Math.ceil((programs.length || 1) / cardsPerPage);
  const currentCards = programs.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section
      id="programs"
      style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '32px',
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
              Online programs built for your next role
            </h2>
            <p
              style={{
                fontSize: '15.5px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 500
              }}
            >
              Explore popular online degrees and certifications from top universities
            </p>
          </div>

          <button
            onClick={() => onOpenCounselling()}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              backgroundColor: 'transparent',
              border: '1.5px solid #5b14c7',
              color: '#5b14c7',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3ebff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            View all <ArrowRight size={15} />
          </button>
        </div>

        {/* Tab Switcher - Folder Tabs Style as in Image 4 */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            borderBottom: '1.5px solid #e2e8f0',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            marginBottom: '24px'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  backgroundColor: isActive ? '#ffffff' : '#f1f5f9',
                  borderTop: isActive ? '2px solid #5b14c7' : '1px solid transparent',
                  borderLeft: isActive ? '1.5px solid #e2e8f0' : '1px solid transparent',
                  borderRight: isActive ? '1.5px solid #e2e8f0' : '1px solid transparent',
                  borderBottom: isActive ? '2px solid #ffffff' : 'none',
                  borderTopLeftRadius: '14px',
                  borderTopRightRadius: '14px',
                  color: isActive ? '#1e1b4b' : '#64748b',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginBottom: '-1.5px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={17} color={isActive ? '#5b14c7' : '#64748b'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sub-pills filter & Carousel Arrows row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(streamFilters[activeTab] || []).map((stream) => {
              const isSelected = activeStream === stream;
              return (
                <button
                  key={stream}
                  onClick={() => {
                    setActiveStream(stream);
                    setCurrentPage(0);
                  }}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#111827' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    border: isSelected ? '1px solid #111827' : '1px solid #e2e8f0',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <GraduationCap size={14} color={isSelected ? '#ffffff' : '#64748b'} />
                  {stream}
                </button>
              );
            })}
          </div>

          {/* Carousel Arrows */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: currentPage === 0 ? '#f1f5f9' : '#e2e8f0',
                color: currentPage === 0 ? '#cbd5e1' : '#334155',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
              }}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: currentPage >= totalPages - 1 ? '#e2e8f0' : '#475569',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer'
              }}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 2-row Cards Grid */}
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748b' }}>
            Loading online programs...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}
          >
            {currentCards.map((program, idx) => (
              <div
                key={program.id || idx}
                onClick={() => onOpenCounselling(program.stream, program.collegeName)}
                className="hover-lift"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '240px',
                  position: 'relative',
                  backgroundImage: `url(${program.collegeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* University Logo Pill at Top-Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 2
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#1e1b4b' }}>
                    {program.collegeName.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '10px', color: '#6366f1', fontWeight: 700 }}>
                    ONLINE
                  </span>
                </div>

                {/* Dark Gradient Overlay for text readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.1) 100%)',
                    zIndex: 1
                  }}
                />

                {/* Content at Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '18px 20px',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: '#ffffff',
                        fontSize: '17px',
                        fontWeight: 700,
                        marginBottom: '8px',
                        textShadow: '0 1px 4px rgba(0,0,0,0.4)'
                      }}
                    >
                      {program.collegeName}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        fontSize: '12.5px',
                        color: '#e2e8f0',
                        fontWeight: 600
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Banknote size={15} color="#cbd5e1" />
                        {program.fee}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <GraduationCap size={15} color="#cbd5e1" />
                        {program.stream}
                      </span>
                    </div>
                  </div>

                  {/* White circular arrow button in bottom right corner */}
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      flexShrink: 0
                    }}
                  >
                    <ArrowRight size={18} color="#0f172a" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Dots at Bottom */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              style={{
                width: currentPage === index ? '22px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: currentPage === index ? '#111827' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
