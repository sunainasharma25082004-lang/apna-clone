import { Smartphone, Apple } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer({ onOpenCounselling, onOpenCompare, onNavigatePartner }) {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#070210',
        backgroundImage: 'url(/images/cosmic_footer.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        color: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '30px',
        overflow: 'hidden'
      }}
    >
      {/* Dark overlay to balance readability with the cosmic background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 20%, rgba(15, 6, 30, 0.75) 0%, rgba(5, 2, 12, 0.94) 80%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 3
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '70px'
          }}
        >
          {/* Column 1: Apna Advantage & Bachelors */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#facc15' }}>apna</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '24px' }}>
                advantage
              </div>

              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.08em', marginBottom: '14px' }}>
                APNA ADVANTAGE
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['About Us', 'Contact Us', 'Compare Colleges', 'Online Degree Programs', 'Become a Partner', 'Blog'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (link === 'Compare Colleges') onOpenCompare();
                        else if (link === 'Become a Partner') {
                          if (onNavigatePartner) onNavigatePartner();
                          else onOpenCounselling(null, null, true);
                        }
                        else onOpenCounselling();
                      }}
                      style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.08em', marginBottom: '14px' }}>
                BACHELORS
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Top Online BBA Colleges', 'Top Online BCA Colleges', 'Top Online BA Colleges', 'Top Online B.Com Colleges', 'View more'].map((link) => (
                  <li key={link}>
                    <a
                      href="#programs"
                      style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Colleges & Masters */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.08em', marginBottom: '14px' }}>
                COLLEGES
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Lovely Professional University', 'Amity University', 'Parul University', 'Jain University', 'Sharda University', 'View more'].map((link) => (
                  <li key={link}>
                    <a
                      href="#programs"
                      style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.08em', marginBottom: '14px' }}>
                MASTERS
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Top Online MBA Colleges', 'Top Online MCA Colleges', 'Top Online M.Sc Colleges', 'Top Online MA Colleges', 'Top Online M.Com Colleges'].map((link) => (
                  <li key={link}>
                    <a
                      href="#programs"
                      style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Trending Programs & Comparisons */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.08em', marginBottom: '14px' }}>
                TRENDING PROGRAMS
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Online BBA', 'Online BCA', 'Online MBA', 'Online BA', 'Online B.Com'].map((link) => (
                  <li key={link}>
                    <a
                      href="#programs"
                      style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.08em', marginBottom: '14px' }}>
                POPULAR COMPARISONS
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['LPU vs Amity', 'Manipal vs Chandigarh', 'Amity vs Jain', 'Sharda vs Parul', 'UPES vs Manipal'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenCompare();
                      }}
                      style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Dark Glassmorphic Card (Image 13) */}
          <div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                Follow us on social media
              </h4>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <a href="#" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
                <a href="#" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} aria-label="YouTube">
                  <YoutubeIcon />
                </a>
              </div>

              {/* App Store Download Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  <Smartphone size={16} /> Download on android
                </button>

                <button
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  <Apple size={16} /> Download on ios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Huge Faded Watermark Text "advantage" */}
        <div
          style={{
            fontSize: 'clamp(50px, 12vw, 160px)',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.04)',
            textAlign: 'center',
            letterSpacing: '-0.04em',
            lineHeight: 0.8,
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          advantage
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: '#94a3b8'
          }}
        >
          <div>
            © 2026 Apna | All rights reserved
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Apna Advantage T&C</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
