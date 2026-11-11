import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Plus, Minus, Check, CheckCircle, 
  Phone, Mail, Share2, User, Users, Award, TrendingUp, Wallet, Building2, 
  Sparkles, X, Star, Laptop, MessageSquare, GraduationCap, Globe, Calendar, ExternalLink
} from 'lucide-react';

const partnerUniversities = [
  {
    name: 'UPES',
    suffix: 'Online',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0f/UPES_Logo.png'
  },
  {
    name: 'Shoolini',
    suffix: 'University',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png'
  },
  {
    name: 'Yenepoya University',
    suffix: 'Online',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png'
  },
  {
    name: 'Amity University',
    suffix: 'Online',
    image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Amity_University_logo.png'
  },
  {
    name: 'Dr. D. Y.',
    suffix: 'Patil Vidyapeeth',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/08/Chandigarh_University_seal.svg'
  },
  {
    name: 'Edgewood University',
    suffix: 'Online',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Sharda_University_logo.png'
  },
  {
    name: 'Golden Gate',
    suffix: 'University Online',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Manav_Rachna_logo.png'
  },
  {
    name: 'Indian Institute of',
    suffix: 'Management Kozhikode',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0f/UPES_Logo.png'
  },
  {
    name: 'Institute of Management',
    suffix: 'Technology Ghaziabad',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Amity_University_logo.png'
  },
  {
    name: 'Liverpool Business',
    suffix: 'School',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png'
  },
  {
    name: 'Liverpool John',
    suffix: 'Moores University',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png'
  }
];

export default function BecomeAPartnerPage({ onNavigateHome, onOpenCounselling }) {
  // Navigation & dropdown states
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPartnerType, setSelectedPartnerType] = useState('Referral Partner');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chart time filter
  const [chartTimeframe, setChartTimeframe] = useState('6m');

  // FAQ accordion state (first one open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Carousel ref
  const universitiesScrollRef = useRef(null);

  // Application form state
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    partnerType: 'Referral Partner',
    profileType: 'Creator / Influencer'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');

  const scrollCarousel = (direction) => {
    if (universitiesScrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      universitiesScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleOpenApplyModal = (type = 'Referral Partner') => {
    setSelectedPartnerType(type);
    setPartnerFormData(prev => ({ ...prev, partnerType: type }));
    setIsApplyModalOpen(true);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Send lead to backend API
    fetch('http://localhost:5000/api/counselling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: partnerFormData.name,
        phone: partnerFormData.phone,
        email: partnerFormData.email,
        stream: partnerFormData.partnerType,
        selectedCollege: partnerFormData.city || 'Partner Network',
        isPartner: true,
        notes: `Profile: ${partnerFormData.profileType}`
      })
    })
      .then(res => res.json())
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
        setIsSubmittedSuccess(true);
        setTimeout(() => {
          setIsSubmittedSuccess(false);
          setIsApplyModalOpen(false);
          setPartnerFormData({
            name: '',
            phone: '',
            email: '',
            city: '',
            partnerType: 'Referral Partner',
            profileType: 'Creator / Influencer'
          });
        }, 2200);
      });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FAQ Data matching video exactly
  const faqs = [
    {
      q: 'How much can I earn as a partner?',
      a: 'You can earn commission on every successful enrollment. Top partners earn ₹50,000 - ₹2,00,000+ per month. Your earnings depend on your promotional efforts and the number of successful leads you generate.'
    },
    {
      q: 'What marketing materials do you provide?',
      a: 'We provide a complete marketing toolkit including professional banners, landing pages, email templates, social media graphics, product descriptions, and video content. All materials are optimized for high conversion rates.'
    },
    {
      q: 'Is there any cost to join the program?',
      a: 'No, joining the Apna Advantage Partner Program is completely free. There are no registration fees, monthly charges, or hidden costs.'
    },
    {
      q: 'What kind of support do partners get?',
      a: 'You get a dedicated partner manager, 24/7 support via WhatsApp and phone, personalized onboarding, marketing training, and access to our partner community.'
    },
    {
      q: 'Can I promote on social media and paid ads?',
      a: 'Yes! You can promote through YouTube, Instagram, WhatsApp groups, LinkedIn, blogs, and compliant digital advertising campaigns.'
    },
    {
      q: 'How do I track my referrals and earnings?',
      a: 'You get access to a dedicated real-time Partner Dashboard where you can monitor clicks, inquiries, enrollments, commission rates, and pending payouts.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. DEDICATED PARTNER HEADER (Matching 00:00 - 00:03 in video) */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(73, 16, 139, 0.98)' : '#49108b',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isScrolled ? '0 10px 30px -5px rgba(0, 0, 0, 0.35)' : 'none',
          padding: '16px 0',
          color: '#ffffff',
          transition: 'all 0.25s ease'
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
            gap: '20px'
          }}
        >
          {/* Brand Logo with Back to Home support */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 1,
                cursor: 'pointer'
              }}
              title="Return to Apna Advantage Home"
            >
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#facc15', letterSpacing: '0.04em' }}>
                apna
              </span>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                advantage
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <button
              onClick={() => scrollToSection('why-partner')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              Why Join Us
            </button>

            <button
              onClick={() => scrollToSection('partnership-type')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              Programs
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection('partner-colleges')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              Colleges
            </button>

            {/* Contact Us with Hover Dropdown (Matching 00:55 in video) */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsContactDropdownOpen(true)}
              onMouseLeave={() => setIsContactDropdownOpen(false)}
            >
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: 0.9,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Contact us
              </button>

              {isContactDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: '-40px',
                    width: '320px',
                    backgroundColor: '#1e1b4b',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    zIndex: 100,
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <p style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '14px', lineHeight: 1.4 }}>
                    Join the Apna Advantage Partner Program and start earning
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="tel:+919484952058"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#facc15',
                        textDecoration: 'none',
                        fontSize: '13.5px',
                        fontWeight: 700
                      }}
                    >
                      <Phone size={15} /> +91 9484952058
                    </a>
                    <a
                      href="mailto:partners@apnaadvantage.com"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '13px'
                      }}
                    >
                      <Mail size={15} color="#94a3b8" /> partners@apnaadvantage.com
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '8px 12px'
              }}
            >
              Log In
            </button>

            <button
              onClick={() => handleOpenApplyModal('Referral Partner')}
              style={{
                backgroundColor: '#facc15',
                color: '#0f172a',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(250, 204, 21, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#eab308';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#facc15';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Earning!
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main style={{ overflowX: 'clip' }}>
        {/* 2. HERO SECTION (Matching 00:00 - 00:03 in video) */}
      <section
        style={{
          backgroundColor: '#49108b',
          color: '#ffffff',
          paddingTop: '60px',
          paddingBottom: '90px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 62px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '16px'
            }}
          >
            Join the Apna Advantage
            <span style={{ display: 'block' }}>Partner Program</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '680px',
              margin: '0 auto 32px auto'
            }}
          >
            Help students find their dream college and grow your earnings
          </p>

          {/* Become a Partner Hero CTA */}
          <button
            onClick={() => handleOpenApplyModal('Referral Partner')}
            style={{
              backgroundColor: '#facc15',
              color: '#0f172a',
              border: 'none',
              padding: '14px 38px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(250, 204, 21, 0.4)',
              transition: 'all 0.2s',
              marginBottom: '65px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#eab308';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#facc15';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Become a Partner
          </button>

          {/* Hero Dashboard Tablet Mockup (Matching 00:01 in video) */}
          <div
            style={{
              maxWidth: '780px',
              margin: '0 auto',
              position: 'relative'
            }}
          >
            {/* White Tablet Frame */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '32px 32px 0 0',
                padding: '24px 28px 40px 28px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
                color: '#0f172a',
                position: 'relative'
              }}
            >
              {/* Tablet Top Camera Notch */}
              <div
                style={{
                  width: '60px',
                  height: '5px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '9999px',
                  margin: '0 auto 20px auto'
                }}
              />

              {/* Mint Green Card Header */}
              <div
                style={{
                  backgroundColor: '#bbf7d0',
                  borderRadius: '20px',
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '28px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}
                  >
                    <User size={22} color="#16a34a" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
                      Your Earnings
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#14532d' }}>
                      ₹ 12,36,783
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenApplyModal('Referral Partner')}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#15803d',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  Earn Now &gt;
                </button>
              </div>

              {/* 3 Steps in Tablet Bar: Sign up, Refer, Earn */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  alignItems: 'center',
                  position: 'relative',
                  padding: '0 10px'
                }}
              >
                {/* Connecting Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20%',
                    right: '20%',
                    height: '2px',
                    borderTop: '2px dashed #cbd5e1',
                    zIndex: 1
                  }}
                />

                {/* Step 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    <User size={20} color="#475569" />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                    Sign up
                  </span>
                </div>

                {/* Step 2 (Refer with Purple Circle) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: '#7c3aed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.35)'
                    }}
                  >
                    <Share2 size={22} color="#ffffff" />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#7c3aed' }}>
                    Refer
                  </span>
                </div>

                {/* Step 3 (Earn) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    <Star size={20} color="#d97706" fill="#d97706" />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                    Earn
                  </span>
                </div>
              </div>
            </div>

            {/* Left 3D Gold Coins stack with Rupee Symbol */}
            <div
              style={{
                position: 'absolute',
                left: '-40px',
                bottom: '15px',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fef08a 0%, #eab308 50%, #ca8a04 100%)',
                  border: '3px solid #fef9c3',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#713f12'
                }}
              >
                ₹
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCREDITATION STRIP (Matching 00:03 in video) */}
      <section
        style={{
          backgroundColor: '#ffffff',
          padding: '36px 0',
          borderBottom: '1px solid #f1f5f9'
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#475569',
              marginBottom: '24px'
            }}
          >
            <span>🌾</span>
            <span>20+ NAAC A+ UNIVERSITIES</span>
            <span>🌾</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              opacity: 0.85
            }}
          >
            {['UPES ONLINE', 'DATTA MEGHE (DMIHER)', 'JAIN ONLINE', 'LPU ONLINE', 'AMITY UNIVERSITY', 'ONLINE MANIPAL', 'SHARDA ONLINE'].map((uni, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#1e293b',
                  letterSpacing: '0.04em',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc'
                }}
              >
                {uni}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "WHY PARTNER WITH US?" BENTO GRID (Matching 00:05 - 00:10 in video) */}
      <section id="why-partner" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: '50px',
              letterSpacing: '-0.02em'
            }}
          >
            Why partner with us?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '24px',
              marginBottom: '40px'
            }}
          >
            {/* Card 1: Real-time Analytics (Spans 8 columns) */}
            <div
              style={{
                gridColumn: 'span 8',
                backgroundColor: '#f8fafc',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Real-time Analytics
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                  Track performance, conversions, and earnings in one dashboard.
                </p>
              </div>

              {/* Bar Chart Mockup with 7d, 30d, 6m filters */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {['7d', '30d', '6m'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setChartTimeframe(tab)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        backgroundColor: chartTimeframe === tab ? '#10b981' : '#f1f5f9',
                        color: chartTimeframe === tab ? '#ffffff' : '#64748b',
                        cursor: 'pointer'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '110px', gap: '8px', paddingBottom: '8px', borderBottom: '1px dashed #cbd5e1' }}>
                  {[30, 45, 25, 75, 55, 40, 85, 60, 95].map((val, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${val}%`,
                          backgroundColor: '#7c3aed',
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.3s ease'
                        }}
                      />
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Instant Approval (Spans 4 columns) */}
            <div
              style={{
                gridColumn: 'span 4',
                backgroundColor: '#fffbeb',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #fef3c7',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Instant Approval
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                  No delays, no hassle - begin promoting and earning instantly.
                </p>
              </div>

              {/* Congratulation Notification Mockup */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
                  textAlign: 'center',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>
                  Congratulations!
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                  You are an Apna Advantage Partner. Start earning!
                </div>
              </div>
            </div>

            {/* Card 3: High Commission Rates (Spans 4 columns) */}
            <div
              style={{
                gridColumn: 'span 4',
                backgroundColor: '#f8fafc',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  High Commission Rates
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                  Most rewarding partner program in industry.
                </p>
              </div>

              {/* Graphic */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TrendingUp size={24} color="#16a34a" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Industry Leading</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#15803d' }}>Up to 30% Payout</div>
                </div>
              </div>
            </div>

            {/* Card 4: 24/7 Dedicated Support (Spans 4 columns) */}
            <div
              style={{
                gridColumn: 'span 4',
                backgroundColor: '#fdf2f8',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid #fce7f3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  24/7 Dedicated Support
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                  Dedicated support to boost your earnings and growth.
                </p>
              </div>

              {/* Chat box mockup */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #fbcfe8'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Support"
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>Divya Patel</div>
                    <div style={{ fontSize: '11px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} /> 24/7 Support
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+919484952058"
                  style={{
                    backgroundColor: '#db2777',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  Call
                </a>
              </div>
            </div>

            {/* Card 5: Early Payouts (Spans 4 columns) */}
            <div
              style={{
                gridColumn: 'span 4',
                backgroundColor: '#f5f3ff',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid #ede9fe',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Early Payouts
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                  Fast payouts, directly to your bank without waiting.
                </p>
              </div>

              {/* Balance card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  border: '1px solid #ddd6fe'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>Balance</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>₹ 1,23,487</div>
                  </div>
                  <button
                    onClick={() => handleOpenApplyModal('Referral Partner')}
                    style={{
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Withdraw
                  </button>
                </div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                  ₹ 2,45,67,890 Total Disbursed
                </div>
              </div>
            </div>
          </div>

          {/* Become a Partner Section Bottom Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => handleOpenApplyModal('Referral Partner')}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '13px 36px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
            >
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* 5. GLOBALLY RECOGNISED UNIVERSITIES CAROUSEL (Matching 00:10 - 00:20 in video) */}
      <section id="partner-colleges" style={{ padding: '70px 0', backgroundColor: '#faf8fc' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 800, color: '#1e293b', letterSpacing: '0.12em' }}>
              <span>⛓</span>
              <span>GLOBALLY RECOGNISED UNIVERSITIES</span>
              <span>⛓</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => scrollCarousel('left')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={18} color="#475569" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
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

          {/* Arched Cards Carousel */}
          <div
            ref={universitiesScrollRef}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              paddingBottom: '16px',
              scrollbarWidth: 'none'
            }}
          >
            {partnerUniversities.map((uni, idx) => (
              <div
                key={idx}
                className="hover-lift"
                style={{
                  flex: '0 0 210px',
                  backgroundColor: '#ffffff',
                  borderRadius: '32px 32px 20px 20px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Arched Image Header */}
                <div
                  style={{
                    height: '140px',
                    position: 'relative',
                    backgroundImage: `url(${uni.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '32px 32px 0 0'
                  }}
                >
                  {/* Circular Arrow Button */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                  >
                    <ArrowRight size={14} color="#0f172a" />
                  </div>
                </div>

                {/* University Name & Suffix */}
                <div style={{ padding: '16px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                    {uni.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    {uni.suffix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "CHOOSE YOUR PARTNERSHIP TYPE" (Matching 00:21 - 00:25 in video) */}
      <section id="partnership-type" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
          
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: '50px',
              letterSpacing: '-0.02em'
            }}
          >
            Choose your partnership type
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px',
              marginBottom: '40px'
            }}
          >
            {/* Card A: Referral Partner (Green Header) */}
            <div
              style={{
                borderRadius: '28px',
                border: '1.5px solid #86efac',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Green Header */}
              <div
                style={{
                  backgroundColor: '#22c55e',
                  color: '#ffffff',
                  padding: '28px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <User size={22} color="#ffffff" />
                  <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Referral Partner</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#dcfce7', lineHeight: 1.35 }}>
                  Generate & share leads exclusively, counselling done by AA counsellors
                </p>
              </div>

              {/* What do you get ? */}
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                    What do you get ?
                  </h4>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      'Earn ₹5,000 per Admission',
                      'Fast payouts within 15 days',
                      'Perfect for high-volume referrers',
                      'Dedicated WhatsApp support for quick help'
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#334155', fontWeight: 600 }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={13} color="#16a34a" strokeWidth={3} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenApplyModal('Referral Partner')}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '36px',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
                >
                  Choose Referral Partner
                </button>
              </div>
            </div>

            {/* Card B: Channel Partner (Purple Header) */}
            <div
              style={{
                borderRadius: '28px',
                border: '1.5px solid #c4b5fd',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Purple Header */}
              <div
                style={{
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  padding: '28px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Building2 size={22} color="#ffffff" />
                  <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Channel Partner</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#ede9fe', lineHeight: 1.35 }}>
                  Generate, share & counsel the leads, manage entire student journey
                </p>
              </div>

              {/* What do you get ? */}
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                    What do you get ?
                  </h4>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      'Highest commission rate in market',
                      "One-stop access to India's top universities.",
                      'Build long-term partnerships',
                      'Exclusive partner support & resources'
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#334155', fontWeight: 600 }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={13} color="#7c3aed" strokeWidth={3} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenApplyModal('Channel Partner')}
                  style={{
                    backgroundColor: '#7c3aed',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '36px',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                >
                  Choose Channel Partner
                </button>
              </div>
            </div>
          </div>

          {/* Banner: "Not sure which partnership is right for you ?" (Matching 00:24 in video) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '24px 36px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                Not sure which partnership is right for you ?
              </h4>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>
                Let us help you make the right choice
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button
                onClick={() => handleOpenApplyModal('Advice Request')}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1.5px solid #cbd5e1',
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#7c3aed'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
              >
                Connect with our team
              </button>

              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                alt="Advisor"
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. "WHO IS A GOOD FIT ?" (Matching 00:26 - 00:29 in video) */}
      <section style={{ padding: '80px 0', backgroundColor: '#faf8fc' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '60px',
              alignItems: 'center'
            }}
          >
            {/* Left Description */}
            <div>
              <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                Who is a good fit ?
              </h2>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                The Apna Advantage partner program is perfect for <strong>creators, influencers, consultants, agencies, institutions, and career partners</strong> to earn commissions by referring students or driving admissions.
              </p>

              <button
                onClick={() => handleOpenApplyModal('Referral Partner')}
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 34px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.2)'
                }}
              >
                Become a Partner
              </button>
            </div>

            {/* Right Personas List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                {
                  title: 'Content Creators & Influencers',
                  desc: 'YouTubers, bloggers, social media influencers, content creators in the education niche.',
                  icon: <Laptop size={22} color="#7c3aed" />
                },
                {
                  title: 'Consultants',
                  desc: 'Career counselors, education advisors, and academic mentors who guide students in their educational journey.',
                  icon: <MessageSquare size={22} color="#2563eb" />
                },
                {
                  title: 'Institutions',
                  desc: 'Coaching centers, training institutes, and educational organizations looking to expand their offerings.',
                  icon: <GraduationCap size={22} color="#16a34a" />
                },
                {
                  title: 'Community Leaders',
                  desc: 'Local community leaders, teachers, and professionals with strong networks who want to help others.',
                  icon: <Users size={22} color="#d97706" />
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '20px 24px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. "HOW IT WORKS?" (Matching 00:30 - 00:33 in video) */}
      <section id="how-it-works" style={{ padding: '80px 0', backgroundColor: '#18181b', color: '#ffffff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '50px', letterSpacing: '-0.02em' }}>
            How it works?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              marginBottom: '50px'
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                backgroundColor: '#27272a',
                borderRadius: '24px',
                padding: '36px 28px',
                border: '1px solid #3f3f46',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '180px',
                  height: '110px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                  boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#ede9fe' }}>Create your Account</div>
                <div style={{ width: '70px', height: '6px', backgroundColor: '#a78bfa', borderRadius: '4px', marginTop: '8px' }} />
              </div>

              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px' }}>Create Account</h3>
              <p style={{ fontSize: '13.5px', color: '#a1a1aa' }}>Create your partner account in minutes</p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                backgroundColor: '#27272a',
                borderRadius: '24px',
                padding: '36px 28px',
                border: '1px solid #3f3f46',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '180px',
                  height: '110px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Add Student</div>
                <div style={{ width: '80px', height: '6px', backgroundColor: '#cbd5e1', borderRadius: '4px', marginTop: '8px' }} />
              </div>

              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px' }}>Share with Students</h3>
              <p style={{ fontSize: '13.5px', color: '#a1a1aa' }}>Promote courses through your network and social media</p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                backgroundColor: '#27272a',
                borderRadius: '24px',
                padding: '36px 28px',
                border: '1px solid #3f3f46',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '180px',
                  height: '110px',
                  backgroundColor: '#18181b',
                  border: '1px solid #52525b',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#facc15' }}>Make a huge Profit</div>
                <div style={{ fontSize: '12px', color: '#ffffff', marginTop: '4px' }}>And Enjoy That !</div>
              </div>

              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px' }}>Earn Payouts</h3>
              <p style={{ fontSize: '13.5px', color: '#a1a1aa' }}>Get paid for every successful conversion</p>
            </div>
          </div>

          <button
            onClick={() => handleOpenApplyModal('Referral Partner')}
            style={{
              backgroundColor: '#facc15',
              color: '#0f172a',
              border: 'none',
              padding: '13px 36px',
              borderRadius: '9999px',
              fontSize: '14.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(250, 204, 21, 0.35)'
            }}
          >
            Become a Partner
          </button>
        </div>
      </section>

      {/* 9. "WHAT OUR PARTNERS HAVE TO SAY?" (Matching 00:34 - 00:35 in video) */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
          
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: '50px',
              letterSpacing: '-0.02em'
            }}
          >
            What our partners have to say?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                text: "My Instagram following was perfect for the Referral model. The commission structure is transparent and the payments are always on time. I've built a steady income stream while helping students find quality education.",
                earnings: '₹ 1.4L',
                time: 'in 4 months',
                name: 'Amit Kumar',
                role: 'Content Creator',
                rating: 5
              },
              {
                text: "The Referral model perfectly fits my social media strategy. Quick payouts, transparent tracking, and excellent commission rates. I've referred over 200 students and the process is seamless every time.",
                earnings: '₹ 1.8L',
                time: 'in 4 months',
                name: 'Kumari Gautam',
                role: 'Influencer',
                rating: 5
              },
              {
                text: "As an educator, I wanted to help students beyond my classroom. The Admission model allows me to guide students to the right institutions while earning good commissions. The support team is incredible.",
                earnings: '₹ 1.8L',
                time: 'in 4 months',
                name: 'Anita Verma',
                role: 'Teacher',
                rating: 5
              },
              {
                text: "I can genuinely help students find the right courses while building my practice. The quality of education counsellor and support system at Apna Advantage makes all the difference. It feels great to make a real impact.",
                earnings: '₹ 1.8L',
                time: 'in 4 months',
                name: 'Divya Patel',
                role: 'Consultant',
                rating: 5
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  padding: '28px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '38px', color: '#7c3aed', lineHeight: 1, fontFamily: 'serif', marginBottom: '10px' }}>“</div>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                    {item.text}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                    <div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>Earnings</div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: '#f59e0b' }}>
                        {item.earnings} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{item.time}</span>
                      </div>
                    </div>
                    <div style={{ color: '#f59e0b', fontSize: '13px' }}>★★★★★</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (Matching 00:36 - 00:42 in video) */}
      <section style={{ padding: '80px 0', backgroundColor: '#faf8fc' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
          
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: '40px',
              letterSpacing: '-0.02em'
            }}
          >
            Frequently asked questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '15.5px', fontWeight: 700, color: '#0f172a' }}>
                      {faq.q}
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {isOpen ? <Minus size={16} color="#475569" /> : <Plus size={16} color="#475569" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 28px 24px 28px', color: '#64748b', fontSize: '14px', lineHeight: 1.6, borderTop: '1px solid #f8fafc' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. MAX EARNINGS BANNER (Matching 00:43, 00:45 in video) */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 80px auto', padding: '0 24px' }}>
        <div
          style={{
            backgroundColor: '#0c0714',
            borderRadius: '28px',
            padding: '48px 56px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Cyber perspective grid */}
          <div className="cyber-grid" />

          {/* Left Text */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '580px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#facc15', letterSpacing: '0.1em', marginBottom: '8px' }}>
              apna advantage
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Partnership Program
            </h3>
            <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '24px' }}>
              Join us for the highest payouts ever!
            </p>

            <button
              onClick={() => handleOpenApplyModal('Referral Partner')}
              style={{
                backgroundColor: '#ffffff',
                color: '#0c0714',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#facc15'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              Become a Partner
            </button>
          </div>

          {/* Right Bursting MAX EARNINGS Badge */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: '#052e16',
                border: '4px solid #22c55e',
                boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transform: 'rotate(-5deg)'
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#4ade80', letterSpacing: '-0.02em', lineHeight: 1 }}>
                MAX
              </span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.1em', marginTop: '4px' }}>
                EARNINGS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. DEDICATED PARTNER FOOTER (Matching 00:44 in video) */}
      <footer
        style={{
          backgroundColor: '#1f0a38',
          color: '#ffffff',
          padding: '60px 0 30px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '40px',
              marginBottom: '50px'
            }}
          >
            {/* Left Brand & Social */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#facc15' }}>apna</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  advantage
                </div>
              </div>

              <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>
                Follow us on social media
              </div>

              <div style={{ display: 'flex', gap: '14px', color: '#ffffff' }}>
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social, i) => (
                  <div
                    key={i}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {social[0]}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Download App */}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                Download the app
              </div>
              <p style={{ fontSize: '13px', color: '#a78bfa', marginBottom: '16px' }}>
                Access top online degree programs on our app
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>▶</span>
                  <div>
                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>GET IT ON</div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>Google Play</div>
                  </div>
                </div>

                {/* QR Code box */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', border: '2px solid #000000', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '2px' }}>
                    <div style={{ backgroundColor: '#000' }} />
                    <div style={{ backgroundColor: '#fff' }} />
                    <div style={{ backgroundColor: '#fff' }} />
                    <div style={{ backgroundColor: '#000' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Links */}
          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12px',
              color: '#94a3b8'
            }}
          >
            <div>© 2022 Apna | All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
              <span>Rewards T&C</span>
            </div>
          </div>

          {/* Giant watermark */}
          <div
            style={{
              textAlign: 'center',
              fontSize: 'clamp(50px, 9vw, 130px)',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.03)',
              userSelect: 'none',
              pointerEvents: 'none',
              marginTop: '20px'
            }}
          >
            apnaadvantage
          </div>
        </div>
      </footer>
      </main>

      {/* 13. PARTNER LOGIN MODAL (Matching 00:58 - 01:01 in video) */}
      {isLoginModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsLoginModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '820px',
              borderRadius: '28px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              padding: 0
            }}
          >
            {/* Left Login Form */}
            <div style={{ padding: '40px 36px', backgroundColor: '#ffffff', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#1e1b4b' }}>apna </span>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#4e12bb' }}>advantage</span>
                </div>
                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={18} color="#64748b" />
                </button>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                Welcome back!
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '28px' }}>
                Login to access your partner dashboard
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Login link sent to: ${loginIdentifier}`);
                  setIsLoginModalOpen(false);
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                    Email or phone number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your Email or phone number"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#4e12bb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(78, 18, 187, 0.3)',
                    marginBottom: '20px'
                  }}
                >
                  Continue
                </button>

                <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#64748b' }}>
                  New Here ?{' '}
                  <span
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      handleOpenApplyModal('Referral Partner');
                    }}
                    style={{ color: '#7c3aed', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Create Account
                  </span>
                </div>
              </form>
            </div>

            {/* Right Preview Card */}
            <div
              style={{
                backgroundColor: '#f3e8ff',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Mini card */}
              <div
                style={{
                  backgroundColor: '#bbf7d0',
                  borderRadius: '16px',
                  padding: '18px 24px',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '24px',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{ fontSize: '11px', color: '#166534', fontWeight: 700 }}>Your Earnings</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#14532d' }}>₹ 12,36,783</div>
              </div>

              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                Welcome back to your dashboard!
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', width: '100%' }}>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#4e12bb' }}>20+</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Top Universities</div>
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#4e12bb' }}>10,000+</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Students Enrolled</div>
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#4e12bb' }}>1,000+</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Active Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 14. PARTNER APPLICATION MODAL */}
      {isApplyModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsApplyModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '520px',
              borderRadius: '24px',
              padding: '32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                  Join as {partnerFormData.partnerType}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b' }}>
                  Start earning high payouts by partnering with Apna Advantage
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            {isSubmittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle size={32} color="#16a34a" />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Application Submitted!
                </h4>
                <p style={{ fontSize: '13px', color: '#475569' }}>
                  Our partner onboarding team will contact you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1.2px solid #cbd5e1',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={partnerFormData.phone}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        border: '1.2px solid #cbd5e1',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={partnerFormData.email}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        border: '1.2px solid #cbd5e1',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Partnership Type
                    </label>
                    <select
                      value={partnerFormData.partnerType}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, partnerType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        border: '1.2px solid #cbd5e1',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="Referral Partner">Referral Partner</option>
                      <option value="Channel Partner">Channel Partner</option>
                      <option value="Corporate / Agency">Corporate / Agency</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Your Profile / Role
                    </label>
                    <select
                      value={partnerFormData.profileType}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, profileType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        border: '1.2px solid #cbd5e1',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="Creator / Influencer">Creator / Influencer</option>
                      <option value="Career Consultant">Career Consultant</option>
                      <option value="Institution / Coaching">Institution / Coaching</option>
                      <option value="Teacher / Academic">Teacher / Academic</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={partnerFormData.city}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1.2px solid #cbd5e1',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#4e12bb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(78, 18, 187, 0.35)'
                  }}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
