import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, X, ArrowRight } from 'lucide-react';

export default function Navbar({ 
  currentPage = 'home',
  onNavigateHome,
  onNavigateCompare,
  onNavigatePartner,
  onNavigateAdmin,
  onOpenCounselling, 
  onOpenCompare, 
  onSelectProgram, 
  onExplorePrograms 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('MASTERS');

  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);
  const navItemRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        navItemRef.current &&
        !navItemRef.current.contains(event.target)
      ) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length > 1) {
      setIsSearchOpen(true);
      fetch(`http://localhost:5000/api/programs?search=${encodeURIComponent(term)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSearchResults(data.data.slice(0, 6));
          }
        })
        .catch(() => {
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const megaPrograms = {
    MASTERS: {
      level: 'Masters',
      col1: [
        { name: 'Masters of Business Administration (MBA)', code: 'MBA' },
        { name: 'Masters of Computer Applications (MCA)', code: 'MCA' },
        { name: 'Masters of Arts (MA)', code: 'MA' }
      ],
      col2: [
        { name: 'Masters of Science (MSc)', code: 'M.Sc' },
        { name: 'Masters of Commerce (MCom)', code: 'M.COM' }
      ]
    },
    BACHELORS: {
      level: 'Bachelors',
      col1: [
        { name: 'Bachelors of Business Administration (BBA)', code: 'BBA' },
        { name: 'Bachelors of Computer Applications (BCA)', code: 'BCA' },
        { name: 'Bachelors of Arts (BA)', code: 'BA' }
      ],
      col2: [
        { name: 'Bachelors of Commerce (BCom)', code: 'B.COM' },
        { name: 'Bachelors of Science (BSc)', code: 'B.Sc' }
      ]
    },
    OTHERS: {
      level: 'Doctorate',
      col1: [
        { name: 'Doctor of Business Administration (DBA)', code: 'DBA' },
        { name: 'Doctor of Philosophy (PhD)', code: 'PHD' }
      ],
      col2: [
        { name: 'Executive PG Diplomas (PGDM)', code: 'PGDM' },
        { name: 'Advanced Certifications', code: 'CERT' }
      ]
    }
  };

  const handleProgramClick = (level, code) => {
    setIsMegaMenuOpen(false);
    if (currentPage !== 'home' && onNavigateHome) {
      onNavigateHome();
    }
    if (onSelectProgram) {
      onSelectProgram(level, code);
    } else if (onOpenCounselling) {
      onOpenCounselling(code);
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: '1px solid #ebecef',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'all 0.3s ease',
        padding: '14px 0'
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
          gap: '24px'
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
          }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1,
            cursor: 'pointer'
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#1e1b4b',
              letterSpacing: '0.04em'
            }}
          >
            apna
          </span>
          <span
            style={{
              fontSize: '25px',
              fontWeight: 900,
              color: '#4e12bb',
              letterSpacing: '-0.03em',
              marginTop: '1px'
            }}
          >
            advantage
          </span>
        </a>

        {/* Center Search Bar */}
        <div
          ref={searchRef}
          style={{
            position: 'relative',
            flex: '0 1 360px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              border: '1.2px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '8px 18px',
              transition: 'all 0.2s ease',
              boxShadow: isSearchOpen ? '0 0 0 3px rgba(82, 24, 201, 0.15)' : 'none',
              borderColor: isSearchOpen ? '#7928ca' : '#e2e8f0'
            }}
          >
            <Search size={16} color="#64748b" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="SEARCH FOR MBA..."
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => searchTerm.length > 1 && setIsSearchOpen(true)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#1e293b'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); setIsSearchOpen(false); }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex'
                }}
              >
                <X size={14} color="#94a3b8" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                padding: '10px',
                zIndex: 100,
                maxHeight: '360px',
                overflowY: 'auto'
              }}
            >
              <div style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Suggested Programs & Colleges
              </div>
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setIsSearchOpen(false);
                      onOpenCounselling(item.stream, item.collegeName);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3ebff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                        {item.stream} • {item.collegeName}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                        {item.fee} • {item.mode}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#5218c9', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      Apply <ChevronRight size={12} />
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px 12px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                  No programs found matching "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            position: 'relative'
          }}
        >
          <button
            onClick={() => onOpenCounselling()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#1e293b',
              transition: 'color 0.2s',
              padding: '6px 2px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#5218c9'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#1e293b'}
          >
            FREE COUNSELLING
          </button>

          {/* ONLINE PROGRAMS with Mega Menu Trigger */}
          <div
            ref={navItemRef}
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <button
              onClick={() => {
                if (currentPage !== 'home' && onNavigateHome) {
                  onNavigateHome();
                  setTimeout(() => {
                    if (onExplorePrograms) onExplorePrograms();
                  }, 150);
                } else {
                  setIsMegaMenuOpen(prev => !prev);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: isMegaMenuOpen ? '#7c3aed' : '#1e293b',
                transition: 'color 0.2s',
                padding: '6px 2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
              onMouseLeave={(e) => {
                if (!isMegaMenuOpen) e.currentTarget.style.color = '#1e293b';
              }}
            >
              ONLINE PROGRAMS
            </button>
          </div>

          <button
            onClick={() => {
              if (onNavigateCompare) {
                onNavigateCompare();
              } else if (onOpenCompare) {
                onOpenCompare();
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: currentPage === 'compare' ? '#7c3aed' : '#1e293b',
              borderBottom: currentPage === 'compare' ? '2.5px solid #7c3aed' : '2.5px solid transparent',
              transition: 'all 0.2s',
              padding: '6px 2px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
            onMouseLeave={(e) => {
              if (currentPage !== 'compare') e.currentTarget.style.color = '#1e293b';
            }}
          >
            COMPARE COLLEGES
          </button>

          <button
            onClick={() => {
              if (onNavigatePartner) {
                onNavigatePartner();
              } else if (onOpenCounselling) {
                onOpenCounselling(null, null, true);
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: currentPage === 'partner' ? '#7c3aed' : '#1e293b',
              borderBottom: currentPage === 'partner' ? '2.5px solid #7c3aed' : '2.5px solid transparent',
              transition: 'all 0.2s',
              padding: '6px 2px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
            onMouseLeave={(e) => {
              if (currentPage !== 'partner') e.currentTarget.style.color = '#1e293b';
            }}
          >
            BECOME A PARTNER
          </button>

          <button
            onClick={() => {
              if (onNavigateAdmin) onNavigateAdmin();
              else window.location.hash = '#admin';
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: currentPage === 'admin' ? '#4e12bb' : '#f5f3ff',
              color: currentPage === 'admin' ? '#ffffff' : '#6d28d9',
              border: '1.2px solid #ddd6fe',
              borderRadius: '9999px',
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
              marginLeft: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4e12bb';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'admin') {
                e.currentTarget.style.backgroundColor = '#f5f3ff';
                e.currentTarget.style.color = '#6d28d9';
              }
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            ADMIN PANEL
          </button>
        </nav>
      </div>

      {/* MEGA DROPDOWN MENU (Exact design from user screenshot) */}
      {isMegaMenuOpen && (
        <div
          ref={megaMenuRef}
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '880px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            marginTop: '8px',
            padding: '32px 36px',
            display: 'flex',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Left Category Tabs (MASTERS, BACHELORS, OTHERS) */}
          <div
            style={{
              flex: '0 0 160px',
              borderRight: '1px solid #f1f5f9',
              paddingRight: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              paddingTop: '6px'
            }}
          >
            {['MASTERS', 'BACHELORS', 'OTHERS'].map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: isSelected ? '#7c3aed' : '#94a3b8',
                      textDecoration: isSelected ? 'underline' : 'none',
                      textUnderlineOffset: '6px',
                      textDecorationThickness: '2px',
                      textDecorationColor: '#7c3aed',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {cat}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Content Area: 2 Columns of Program Links + View All Button */}
          <div
            style={{
              flex: 1,
              paddingLeft: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '36px',
                rowGap: '6px'
              }}
            >
              {/* Column 1 */}
              <div>
                {megaPrograms[activeCategory].col1.map((prog, index) => (
                  <div
                    key={index}
                    onClick={() => handleProgramClick(megaPrograms[activeCategory].level, prog.code)}
                    style={{
                      padding: '14px 0',
                      borderBottom: index < megaPrograms[activeCategory].col1.length - 1 ? '1px solid #f1f5f9' : 'none',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#7c3aed';
                      e.currentTarget.style.paddingLeft = '4px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#334155';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    {prog.name}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div>
                {megaPrograms[activeCategory].col2.map((prog, index) => (
                  <div
                    key={index}
                    onClick={() => handleProgramClick(megaPrograms[activeCategory].level, prog.code)}
                    style={{
                      padding: '14px 0',
                      borderBottom: index < megaPrograms[activeCategory].col2.length - 1 ? '1px solid #f1f5f9' : 'none',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#7c3aed';
                      e.currentTarget.style.paddingLeft = '4px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#334155';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    {prog.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-right "VIEW ALL PROGRAMS →" Pill Button (Matching user screenshot) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '28px'
              }}
            >
              <button
                onClick={() => {
                  setIsMegaMenuOpen(false);
                  if (currentPage !== 'home' && onNavigateHome) {
                    onNavigateHome();
                    setTimeout(() => {
                      if (onExplorePrograms) onExplorePrograms();
                    }, 150);
                  } else {
                    if (onExplorePrograms) onExplorePrograms();
                  }
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: '#7c3aed',
                  border: '1.5px solid #7c3aed',
                  padding: '9px 24px',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7c3aed';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#7c3aed';
                }}
              >
                VIEW ALL PROGRAMS <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
