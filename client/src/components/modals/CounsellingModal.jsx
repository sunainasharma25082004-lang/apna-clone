import React, { useState, useEffect } from 'react';
import { 
  X, ArrowLeft, Search, GraduationCap, 
  Check, ShieldCheck, Tag, Gift, Sparkles, Building2, 
  DollarSign, Monitor, Wallet, MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ==========================================
// 15 COLLEGES DATA (Exact Match with 11.png)
// ==========================================
const collegesList = [
  { id: 'alliance', name: 'Alliance University', location: 'Bangalore', nirf: 'Ranked #11', fees: '₹1,50,000', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Amity_University_logo.png', initials: 'ALLIANCE' },
  { id: 'amity', name: 'Amity University', location: 'Noida', nirf: 'NIRF #22', fees: '₹2,25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Amity_University_logo.png', initials: 'AMITY' },
  { id: 'bdu', name: 'Bharathidasan University', location: 'Tiruchirappalli', nirf: 'NIRF #36', fees: '₹45,798', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png', initials: 'BDU' },
  { id: 'cu', name: 'Chandigarh University', location: 'Mohali', nirf: 'NIRF #19', fees: '₹2,33,500', logo: 'https://upload.wikimedia.org/wikipedia/en/0/08/Chandigarh_University_seal.svg', initials: 'CU' },
  { id: 'dypatil_navi', name: 'DY Patil University Navi Mumbai', location: 'Navi Mumbai', nirf: 'NAAC A++', fees: '₹1,60,000', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Sharda_University_logo.png', initials: 'DY PATIL' },
  { id: 'dpu', name: 'Dr. D. Y. Patil Vidyapeeth', location: 'Pune', nirf: 'NIRF #46', fees: '₹1,70,000', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Sharda_University_logo.png', initials: 'DPU' },
  { id: 'edgewood', name: 'Edgewood University', location: 'USA Online', nirf: 'Global #40', fees: '₹3,50,000', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png', initials: 'EDGEWOOD' },
  { id: 'gla', name: 'G.L.A. University', location: 'Mathura', nirf: 'NIRF #54', fees: '₹1,40,000', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png', initials: 'GLA' },
  { id: 'ggu', name: 'Golden Gate University', location: 'California Online', nirf: 'Global #35', fees: '₹3,20,000', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Manav_Rachna_logo.png', initials: 'GGU' },
  { id: 'jain', name: 'Jain University', location: 'Bangalore', nirf: 'NIRF #62', fees: '₹1,96,000', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Jain_University_logo.png', initials: 'JAIN' },
  { id: 'lbs', name: 'Liverpool Business School', location: 'UK Online', nirf: 'UK Top 50', fees: '₹4,50,000', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0f/UPES_Logo.png', initials: 'LBS' },
  { id: 'ljmu', name: 'Liverpool John Moores', location: 'UK Online', nirf: 'World Top 100', fees: '₹4,20,000', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0f/UPES_Logo.png', initials: 'LJMU' },
  { id: 'lpu', name: 'Lovely Professional', location: 'Phagwara', nirf: 'NIRF #27', fees: '₹1,50,000', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png', initials: 'LPU' },
  { id: 'mit', name: 'MIT Pune', location: 'Pune', nirf: 'NIRF #30', fees: '₹2,10,000', logo: 'https://upload.wikimedia.org/wikipedia/en/0/08/Chandigarh_University_seal.svg', initials: 'MIT' },
  { id: 'manav', name: 'Manav Rachna University', location: 'Faridabad', nirf: 'NAAC A++', fees: '₹1,65,000', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Manav_Rachna_logo.png', initials: 'MANAV RACHNA' }
];

// ==========================================
// 3D ICONS AND BRAND LOGOS (High Fidelity)
// ==========================================
const SvgIcons = {
  // 3D Brown Leather Briefcase
  Briefcase3D: () => (
    <svg width="68" height="56" viewBox="0 0 68 56" fill="none">
      <rect x="10" y="16" width="48" height="34" rx="6" fill="#8d5b28" />
      <rect x="10" y="16" width="48" height="34" rx="6" fill="url(#briefcaseGrad)" />
      <rect x="12" y="18" width="44" height="6" fill="#784218" opacity="0.4" />
      <path d="M26 16V10C26 7.79 27.79 6 30 6H38C40.21 6 42 7.79 42 10V16" stroke="#5a3111" strokeWidth="4" strokeLinecap="round" />
      <rect x="31" y="24" width="6" height="8" rx="2" fill="#ffd700" />
      <line x1="10" y1="26" x2="58" y2="26" stroke="#683914" strokeWidth="2" strokeDasharray="3 3" />
      <defs>
        <linearGradient id="briefcaseGrad" x1="10" y1="16" x2="58" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a76d33" />
          <stop offset="1" stopColor="#703f16" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 3D Glass Jar with Gold Coins
  CoinJar3D: () => (
    <svg width="60" height="56" viewBox="0 0 60 56" fill="none">
      <ellipse cx="30" cy="12" rx="14" ry="4" fill="#a76d33" />
      <rect x="16" y="10" width="28" height="6" rx="2" fill="#c48a47" />
      <path d="M18 16C18 16 12 24 12 36C12 46 19 50 30 50C41 50 48 46 48 36C48 24 42 16 42 16H18Z" fill="#bae6fd" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.5" />
      {/* Golden coins inside */}
      <circle cx="26" cy="38" r="8" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="34" cy="34" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="30" cy="42" r="7" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="6" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="36" cy="26" r="6" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      {/* Coin stack in front */}
      <ellipse cx="44" cy="48" rx="7" ry="2.5" fill="#ca8a04" />
      <ellipse cx="44" cy="45" rx="7" ry="2.5" fill="#facc15" />
      <ellipse cx="44" cy="42" rx="7" ry="2.5" fill="#fde047" />
    </svg>
  ),

  // 3D Isometric House with Lawn
  House3D: () => (
    <svg width="64" height="56" viewBox="0 0 64 56" fill="none">
      <ellipse cx="32" cy="48" rx="26" ry="7" fill="#86efac" />
      <path d="M18 42L18 26L32 16L46 26L46 42H18Z" fill="#fef08a" />
      <path d="M14 26L32 12L50 26L46 29L32 18L18 29L14 26Z" fill="#ea580c" />
      <rect x="38" y="14" width="4" height="8" fill="#c2410c" />
      <rect x="28" y="32" width="8" height="10" rx="1" fill="#78350f" />
      <rect x="22" y="28" width="5" height="5" rx="1" fill="#93c5fd" />
      <rect x="37" y="28" width="5" height="5" rx="1" fill="#93c5fd" />
    </svg>
  ),

  // 3D Sleek Luxury Car
  Car3D: () => (
    <svg width="68" height="50" viewBox="0 0 68 50" fill="none">
      <ellipse cx="34" cy="42" rx="28" ry="6" fill="#cbd5e1" opacity="0.6" />
      <path d="M10 32C10 30 13 28 17 28L24 22C27 19 32 18 38 18H48C52 18 56 22 58 26L61 31C63 33 62 36 59 36H13C11 36 10 34 10 32Z" fill="#1e293b" />
      <path d="M25 22L20 28H33V20C29 20 26 21 25 22Z" fill="#64748b" />
      <path d="M35 20V28H48L44 22C42 20 38 20 35 20Z" fill="#64748b" />
      <circle cx="21" cy="36" r="6" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="51" cy="36" r="6" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
      <rect x="58" y="30" width="3" height="3" rx="1" fill="#fbbf24" />
      <rect x="9" y="30" width="3" height="3" rx="1" fill="#ef4444" />
    </svg>
  ),

  // 3D Red Question Mark on Pedestal
  Question3D: () => (
    <svg width="50" height="56" viewBox="0 0 50 56" fill="none">
      <ellipse cx="25" cy="50" rx="16" ry="4" fill="#e2e8f0" />
      <ellipse cx="25" cy="48" rx="12" ry="3" fill="#fef08a" />
      <circle cx="25" cy="40" r="3.5" fill="#dc2626" />
      <path d="M21 27C21 23 23 21 25 19C28 17 30 15 30 12C30 8 27 6 24 6C20 6 18 9 18 12H12C12 6 17 2 24 2C31 2 36 6 36 13C36 17 33 20 30 22C27 24 26 25 26 28H21V27Z" fill="#ef4444" />
    </svg>
  ),

  // 3D Floating Graduation Cap (Step 9 top)
  GradCap3D: () => (
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none">
      <ellipse cx="36" cy="46" rx="22" ry="4" fill="#e9d5ff" opacity="0.6" />
      <path d="M36 8L64 20L36 32L8 20L36 8Z" fill="#8b5cf6" />
      <path d="M36 8L64 20L36 32L8 20L36 8Z" fill="url(#gradCapGrad)" />
      <path d="M20 27V36C20 40 27 44 36 44C45 44 52 40 52 36V27L36 34L20 27Z" fill="#6d28d9" />
      <path d="M52 23V36" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="52" cy="38" r="2.5" fill="#facc15" />
      <defs>
        <linearGradient id="gradCapGrad" x1="8" y1="8" x2="64" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 3D Rose Gold / Pink Metallic Graduation Cap (Step 13 Left Side)
  PinkGradCap3D: () => (
    <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
      <ellipse cx="60" cy="80" rx="36" ry="7" fill="rgba(0,0,0,0.3)" />
      <g transform="rotate(-12 60 45)">
        <path d="M60 14L104 32L60 50L16 32L60 14Z" fill="url(#pinkCapGrad1)" />
        <path d="M36 42V56C36 62 47 68 60 68C73 68 84 62 84 56V42L60 52L36 42Z" fill="url(#pinkCapGrad2)" />
        <path d="M88 36V58" stroke="#fbcfe8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="88" cy="62" r="4" fill="#f43f5e" />
      </g>
      <defs>
        <linearGradient id="pinkCapGrad1" x1="16" y1="14" x2="104" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fda4af" />
          <stop offset="0.5" stopColor="#fb7185" />
          <stop offset="1" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="pinkCapGrad2" x1="36" y1="42" x2="84" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e11d48" />
          <stop offset="1" stopColor="#9f1239" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 3D "OFFER APPLIED" Golden Badge for Step 13 Popup
  OfferAppliedBadge: () => (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
      <circle cx="55" cy="45" r="38" fill="url(#goldGrad)" stroke="#fef08a" strokeWidth="3" />
      <circle cx="55" cy="45" r="34" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="55" y="40" fill="#713f12" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">OFFER</text>
      <text x="55" y="56" fill="#713f12" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">APPLIED</text>
      {/* Sparkles */}
      <path d="M22 22L24 16L26 22L32 24L26 26L24 32L22 26L16 24L22 22Z" fill="#facc15" />
      <path d="M84 18L85 14L86 18L90 19L86 20L85 24L84 20L80 19L84 18Z" fill="#facc15" />
      <path d="M88 64L89 61L90 64L93 65L90 66L89 69L88 66L85 65L88 64Z" fill="#a855f7" />
      <path d="M18 60L19 57L20 60L23 61L20 62L19 65L18 62L15 61L18 60Z" fill="#a855f7" />
      <defs>
        <linearGradient id="goldGrad" x1="20" y1="10" x2="90" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.4" stopColor="#facc15" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>
      </defs>
    </svg>
  )
};

// ==========================================
// ROLE LOGOS (Matching 8.png exactly)
// ==========================================
const roleGroups = [
  {
    name: 'Technology',
    logos: [
      { name: 'Wipro', bg: '#ffffff', color: '#1e3a8a', label: 'wipro', border: '1px solid #e2e8f0' },
      { name: 'Infosys', bg: '#007cc3', color: '#ffffff', label: 'Infosys' },
      { name: 'TCS', bg: '#ffffff', color: '#0f172a', label: 'tcs', border: '1px solid #e2e8f0' }
    ]
  },
  {
    name: 'Business',
    logos: [
      { name: 'Birla', bg: '#b91c1c', color: '#fef08a', label: 'BIRLA' },
      { name: 'Reliance', bg: '#002060', color: '#ffffff', label: 'Reliance' },
      { name: 'Tata', bg: '#004b87', color: '#ffffff', label: 'TATA' }
    ]
  },
  {
    name: 'Finance',
    logos: [
      { name: 'Kotak', bg: '#ed1c24', color: '#ffffff', label: 'kotak' },
      { name: 'Paytm', bg: '#00b9f1', color: '#ffffff', label: 'Paytm' },
      { name: 'HDFC', bg: '#004c8f', color: '#ffffff', label: 'HDFC' }
    ]
  },
  {
    name: 'Marketing',
    logos: [
      { name: 'Zee', bg: '#581c87', color: '#ffffff', label: 'ZEE' },
      { name: 'Hero', bg: '#ffffff', color: '#dc2626', label: 'Hero', border: '1px solid #e2e8f0' },
      { name: 'Jio', bg: '#d9232d', color: '#ffffff', label: 'Jio' }
    ]
  },
  {
    name: 'Sales',
    logos: [
      { name: 'Meesho', bg: '#60113c', color: '#ffffff', label: 'meesho' },
      { name: 'Airtel', bg: '#e11d48', color: '#ffffff', label: 'airtel' },
      { name: 'Cisco', bg: '#049fd9', color: '#ffffff', label: 'CISCO' }
    ]
  },
  {
    name: 'Startups',
    logos: [
      { name: 'Zepto', bg: '#3e0258', color: '#ffffff', label: 'zepto' },
      { name: 'Flipkart', bg: '#fed100', color: '#0456c8', label: 'f' },
      { name: 'Zomato', bg: '#e23744', color: '#ffffff', label: 'zomato' }
    ]
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function CounsellingModal({ 
  isOpen, 
  onClose, 
  initialStream = 'MBA', 
  initialCollege = 'Bharathidasan University', 
  isPartner = false 
}) {
  const [step, setStep] = useState(1);

  // Step 1: Admission inputs
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  // Step 2: OTP
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(19);

  // Step 3: Main Goal
  const [mainGoal, setMainGoal] = useState('Getting my dream job');

  // Step 4: Qualification
  const [qualification, setQualification] = useState('Graduate');

  // Step 5: Pursuing sub-modal
  const [showPursuingModal, setShowPursuingModal] = useState(false);
  const [pursuingStatus, setPursuingStatus] = useState('No, completed this course');

  // Step 6: Current Salary
  const [currentSalary, setCurrentSalary] = useState('21000');
  const [isNotWorking, setIsNotWorking] = useState(false);

  // Step 7: Salary Goal
  const [salaryGoal, setSalaryGoal] = useState('50000');

  // Step 8: Dream Role
  const [dreamRole, setDreamRole] = useState('Technology');

  // Step 10: Degree interested in
  const [selectedDegree, setSelectedDegree] = useState('Online MCA');

  // Step 11: Preferred College
  const [selectedCollege, setSelectedCollege] = useState(
    collegesList.find(c => c.name.toLowerCase().includes(initialCollege.toLowerCase())) || collegesList[2]
  );
  const [collegeSearch, setCollegeSearch] = useState('');

  // Step 13: Offer popup
  const [showOfferPopup, setShowOfferPopup] = useState(true);
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setShowOfferPopup(true);
      setIsBookedSuccess(false);
      setOtpTimer(19);
    }
  }, [isOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  if (!isOpen) return null;

  // Handle OTP box changes
  const handleOtpChange = (val, idx) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    // auto focus next input
    if (val && idx < 3) {
      const nextInput = document.getElementById(`otp-box-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-box-${idx - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Submission to backend
  const submitLeadToBackend = () => {
    fetch('http://localhost:5000/api/counselling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: fullName || 'Student Applicant',
        phone: mobileNumber || '6284961684',
        email: email || 'student@apnaadvantage.com',
        highestEducation: qualification,
        preferredProgram: selectedDegree,
        preferredCollege: selectedCollege?.name || 'Bharathidasan University',
        notes: `Goal: ${mainGoal}, Current Salary: ${isNotWorking ? 'Not Working' : currentSalary}, Target Salary: ${salaryGoal}, Dream Role: ${dreamRole}`
      })
    }).catch(() => {});
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onClose();
    }
  };

  // Determine modal width per step matching screenshots
  const getModalWidth = () => {
    if (step === 1 || step === 2) return '440px';
    if (step === 12) return '620px';
    if (step === 13) return '880px';
    return '590px';
  };

  // Progress percentage for header (Steps 3-11)
  const getProgressPercent = () => {
    switch (step) {
      case 3: return '12%';
      case 4: return '25%';
      case 6: return '40%';
      case 7: return '52%';
      case 8: return '65%';
      case 10: return '85%';
      case 11: return '96%';
      default: return '50%';
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose} 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '16px'
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: getModalWidth(),
          width: '100%',
          borderRadius: '20px',
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}
      >
        
        {/* ========================================================= */}
        {/* STEP 1: Admission open for 2026 (Matching 1.png) */}
        {/* ========================================================= */}
        {step === 1 && (
          <div style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>
                Admission open for 2026
              </h2>
              <button 
                onClick={onClose} 
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} color="#4b5563" />
              </button>
            </div>
            
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 22px 0' }}>
              Enter your name, mobile number and email to continue.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#1f2937', marginBottom: '6px' }}>
                  Full Name*
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    color: '#111827'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#1f2937', marginBottom: '6px' }}>
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    color: '#111827'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#1f2937', marginBottom: '6px' }}>
                  Email*
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    color: '#111827'
                  }}
                />
              </div>

              <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 22px 0', lineHeight: 1.4 }}>
                By filling this form, you agree to the Apna{' '}
                <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Apna Advantage T&C</a> &amp;{' '}
                <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Privacy policy</a>.
              </p>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#38006b',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: Enter OTP here (Matching 2.png) */}
        {/* ========================================================= */}
        {step === 2 && (
          <div style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>
                Enter OTP here
              </h2>
              <button 
                onClick={onClose} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={20} color="#374151" />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 24px 0' }}>
              We have sent an OTP on : <strong>{mobileNumber || '6284961684'}</strong>
            </p>

            {/* 4 OTP Input Boxes */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginBottom: '6px' }}>
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`otp-box-${idx}`}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  style={{
                    width: '52px',
                    height: '56px',
                    borderRadius: '8px',
                    border: '1.5px solid #059669',
                    fontSize: '24px',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                    color: '#111827'
                  }}
                />
              ))}
            </div>

            {/* Timer right aligned with 4th box */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '62px', fontSize: '12px', color: '#6b7280', marginBottom: '26px' }}>
              00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
            </div>

            {/* Resend */}
            <div style={{ fontSize: '13.5px', color: '#1f2937', marginBottom: '28px' }}>
              Didn't get the OTP?{' '}
              <span 
                onClick={() => setOtpTimer(30)} 
                style={{ color: '#4b5563', fontWeight: 700, cursor: 'pointer' }}
              >
                Resend
              </span>
            </div>

            <button
              onClick={() => setStep(3)}
              style={{
                width: '100%',
                backgroundColor: '#38006b',
                color: '#ffffff',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* COMMON TOP BAR FOR STEPS 3 TO 11 */}
        {/* ========================================================= */}
        {step >= 3 && step <= 11 && (
          <div style={{ padding: '22px 28px 0 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <button 
                onClick={handlePrevStep}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <ArrowLeft size={20} color="#374151" />
              </button>

              {/* Sleek 4px progress bar (hidden in step 9) */}
              {step !== 9 ? (
                <div style={{ flex: 1, height: '4px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      backgroundColor: '#38006b', 
                      borderRadius: '9999px', 
                      width: getProgressPercent(),
                      transition: 'width 0.3s ease'
                    }} 
                  />
                </div>
              ) : (
                <div style={{ flex: 1 }} />
              )}

              <button 
                onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <X size={20} color="#374151" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: What is your main goal? (Matching 3.png) */}
        {/* ========================================================= */}
        {step === 3 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 4px 0' }}>
              What is your main goal?
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0' }}>
              Select atleast one
            </p>

            {/* 3 columns x 2 rows grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { title: 'Getting my dream job', icon: <SvgIcons.Briefcase3D /> },
                { title: 'Earning a better salary', icon: <SvgIcons.CoinJar3D /> },
                { title: 'Supporting my family', icon: <SvgIcons.House3D /> },
                { title: 'Living my dream lifestyle', icon: <SvgIcons.Car3D /> },
                { title: 'Not sure. I am confused', icon: <SvgIcons.Question3D /> }
              ].map((item, idx) => {
                const isSelected = mainGoal === item.title;
                return (
                  <div
                    key={idx}
                    onClick={() => setMainGoal(item.title)}
                    style={{
                      border: isSelected ? '1.5px solid #38006b' : '1px solid #f1f5f9',
                      borderRadius: '12px',
                      padding: '16px 10px 14px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: isSelected ? '#faf5ff' : '#f8fafc',
                      transition: 'all 0.15s'
                    }}
                  >
                    {/* Top right circular radio */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        border: isSelected ? '5px solid #38006b' : '1.5px solid #cbd5e1',
                        backgroundColor: '#ffffff'
                      }} 
                    />
                    
                    {/* 3D Graphic */}
                    <div style={{ height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                      {item.icon}
                    </div>

                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(4)}
              style={{
                width: '100%',
                backgroundColor: mainGoal ? '#9975c9' : '#d8b4fe',
                color: '#ffffff',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: What is your highest qualification? (Matching 4.png) */}
        {/* ========================================================= */}
        {step === 4 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 16px 0' }}>
              What is your highest qualification?
            </h2>

            <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '22px' }}>
              {/* College */}
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', margin: '4px 0 6px 0' }}>College</div>
              {[
                { name: 'Graduate', icon: '🎓' },
                { name: 'Postgraduate', icon: '📚' },
                { name: 'Diploma', icon: '📜' }
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setQualification(item.name);
                    setShowPursuingModal(true);
                  }}
                  style={{
                    border: qualification === item.name ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: qualification === item.name ? '#faf5ff' : '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>{item.name}</span>
                  </div>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: qualification === item.name ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                </div>
              ))}

              {/* School */}
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', margin: '10px 0 6px 0' }}>School</div>
              {[
                { name: '12th Pass', icon: '💻' },
                { name: '10th or Below', icon: '🏫' }
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setQualification(item.name);
                    setShowPursuingModal(true);
                  }}
                  style={{
                    border: qualification === item.name ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: qualification === item.name ? '#faf5ff' : '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>{item.name}</span>
                  </div>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: qualification === item.name ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                </div>
              ))}

              {/* Others */}
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', margin: '10px 0 6px 0' }}>Others</div>
              <div
                onClick={() => {
                  setQualification('ITI');
                  setShowPursuingModal(true);
                }}
                style={{
                  border: qualification === 'ITI' ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  backgroundColor: qualification === 'ITI' ? '#faf5ff' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>👷</span>
                  <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>ITI</span>
                </div>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: qualification === 'ITI' ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
              </div>
            </div>

            <button
              onClick={() => setStep(6)}
              style={{
                width: '100%',
                backgroundColor: '#9975c9',
                color: '#ffffff',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Next
            </button>

            {/* STEP 5: "Are you currently pursuing this course?" Submodal (Matching 5.png) */}
            {showPursuingModal && (
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  zIndex: 50
                }}
              >
                <div 
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '380px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                    position: 'relative'
                  }}
                >
                  <button 
                    onClick={() => setShowPursuingModal(false)} 
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={18} color="#4b5563" />
                  </button>

                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e1b4b', textAlign: 'center', margin: '4px 0 20px 0', lineHeight: 1.35 }}>
                    Are you currently pursuing<br />this course?
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {['Yes, pursuing', 'No, completed this course'].map((opt) => {
                      const isSel = pursuingStatus === opt;
                      return (
                        <div
                          key={opt}
                          onClick={() => setPursuingStatus(opt)}
                          style={{
                            border: isSel ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            backgroundColor: isSel ? '#faf5ff' : '#ffffff'
                          }}
                        >
                          <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>{opt}</span>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: isSel ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setShowPursuingModal(false);
                      setStep(6);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: '#9975c9',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: Tell us your current salary (Matching 6.png) */}
        {/* ========================================================= */}
        {step === 6 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 4px 0' }}>
              Tell us your current salary
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 28px 0' }}>
              Enter your current salary
            </p>

            <div style={{ position: 'relative', marginBottom: '180px' }}>
              <input
                type="number"
                placeholder="₹  5,000 (minimum)"
                value={isNotWorking ? '' : currentSalary}
                disabled={isNotWorking}
                onChange={(e) => setCurrentSalary(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: isNotWorking ? '#f3f4f6' : '#ffffff',
                  color: '#111827'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <button
                onClick={() => {
                  setIsNotWorking(true);
                  setCurrentSalary('0');
                  setStep(7);
                }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px solid #38006b',
                  backgroundColor: '#ffffff',
                  color: '#38006b',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                I am not working
              </button>

              <button
                onClick={() => setStep(7)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: currentSalary ? '#9975c9' : '#d8b4fe',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 7: Great! What's your salary goal? (Matching 7.png) */}
        {/* ========================================================= */}
        {step === 7 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 4px 0' }}>
              Great! What’s your salary goal?
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 28px 0' }}>
              Enter your dream salary
            </p>

            <div style={{ position: 'relative', marginBottom: '160px' }}>
              <input
                type="number"
                placeholder="₹  25,200 (minimum)"
                value={salaryGoal}
                onChange={(e) => setSalaryGoal(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#111827'
                }}
              />
            </div>

            {/* Current Salary Full-width Indicator Strip */}
            <div 
              style={{
                backgroundColor: '#ede9fe',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#1e1b4b',
                marginBottom: '16px'
              }}
            >
              <span>💵</span> Current salary - ₹{isNotWorking ? '0' : Number(currentSalary || 21000).toLocaleString('en-IN')}/month
            </div>

            <button
              onClick={() => setStep(8)}
              style={{
                width: '100%',
                backgroundColor: '#9975c9',
                color: '#ffffff',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 8: Your Dream Job Role (Matching 8.png) */}
        {/* ========================================================= */}
        {step === 8 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 4px 0' }}>
              Your Dream Job Role
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 18px 0' }}>
              Select one role you are interested in
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '18px' }}>
              {roleGroups.map((role) => {
                const isSelected = dreamRole === role.name;
                return (
                  <div
                    key={role.name}
                    onClick={() => setDreamRole(role.name)}
                    style={{
                      border: isSelected ? '1.5px solid #38006b' : '1px solid #f1f5f9',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: isSelected ? '#faf5ff' : '#f8fafc'
                    }}
                  >
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: '8px', 
                        right: '8px', 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        border: isSelected ? '5px solid #38006b' : '1.5px solid #cbd5e1',
                        backgroundColor: '#ffffff'
                      }} 
                    />
                    
                    {/* 3 Circular Brand Logos */}
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', marginTop: '4px' }}>
                      {role.logos.map((lg, i) => (
                        <div 
                          key={i} 
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: lg.bg,
                            color: lg.color,
                            border: lg.border || 'none',
                            fontSize: '8px',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}
                        >
                          {lg.label}
                        </div>
                      ))}
                    </div>

                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                      {role.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Comparison Full-width Strip */}
            <div 
              style={{
                backgroundColor: '#ede9fe',
                padding: '10px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#1e1b4b',
                marginBottom: '18px'
              }}
            >
              <span>💵 ₹{isNotWorking ? '0' : Number(currentSalary || 21000).toLocaleString('en-IN')}/mo</span>
              <span>➔</span>
              <span style={{ backgroundColor: '#22c55e', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontWeight: 700 }}>
                💵 ₹{Number(salaryGoal || 50000).toLocaleString('en-IN')}/mo (Goal)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <button
                onClick={() => setStep(9)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px solid #38006b',
                  backgroundColor: '#ffffff',
                  color: '#38006b',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Recommend
              </button>

              <button
                onClick={() => setStep(9)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#38006b',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 9: Your growth after online degree (Matching 9.png) */}
        {/* ========================================================= */}
        {step === 9 && (
          <div style={{ padding: '6px 28px 24px 28px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <SvgIcons.GradCap3D />
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 20px 0' }}>
              Your growth after online degree
            </h2>

            {/* 3D Isometric Bar Graphic */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '42px', height: '220px', marginBottom: '22px', position: 'relative' }}>
              
              {/* Left 3D Red Bar: CURRENT (GRADUATE) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  style={{
                    width: '74px',
                    height: '110px',
                    backgroundColor: '#f87171',
                    borderRadius: '6px 6px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: 'inset 0 6px 0 #ef4444'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 900 }}>20,833</span>
                  <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.04em' }}>PER MONTH</span>
                </div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#ef4444', marginTop: '8px', lineHeight: 1.25 }}>
                  CURRENT<br/>(GRADUATE)
                </div>
              </div>

              {/* Upward curved arrow & Avg salary growth tag */}
              <div style={{ position: 'absolute', left: '38%', bottom: '105px', textAlign: 'center' }}>
                <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '10.5px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>
                  Avg salary growth
                </span>
                <div style={{ fontSize: '24px', color: '#16a34a', transform: 'rotate(-25deg)', marginTop: '2px' }}>
                  ➔
                </div>
              </div>

              {/* Right 3D Green Pillar: AFTER (ONLINE DEGREE) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Dream Job Role Pill + brand logos */}
                <div style={{ backgroundColor: '#22c55e', color: '#ffffff', fontSize: '9.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', marginBottom: '4px' }}>
                  Dream Job Role ✦
                </div>
                
                <div 
                  style={{
                    width: '74px',
                    height: '180px',
                    backgroundColor: '#22c55e',
                    borderRadius: '6px 6px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: 'inset 0 6px 0 #16a34a'
                  }}
                >
                  <span style={{ fontSize: '17px', fontWeight: 900 }}>40,000</span>
                  <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.04em' }}>PER MONTH</span>
                </div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#111827', marginTop: '8px', lineHeight: 1.25 }}>
                  AFTER<br/>(ONLINE DEGREE)
                </div>
              </div>
            </div>

            {/* Recommendation Strip */}
            <div 
              style={{
                backgroundColor: '#ede9fe',
                padding: '10px 18px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 800,
                color: '#581c87',
                marginBottom: '18px'
              }}
            >
              <span>✦</span> RECOMMENDED DEGREE <span style={{ backgroundColor: '#ffffff', color: '#111827', padding: '2px 8px', borderRadius: '4px' }}>MCA</span>
            </div>

            <button
              onClick={() => setStep(10)}
              style={{
                width: '100%',
                backgroundColor: '#38006b',
                color: '#ffffff',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              I want to earn more &amp; grow
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 10: Which degree are you interested in? (Matching 10-a & 10-b.png) */}
        {/* ========================================================= */}
        {step === 10 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 16px 0' }}>
              Which degree are you interested in?
            </h2>

            <div style={{ maxHeight: '340px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}>
              {/* Masters */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '8px' }}>Masters</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  
                  {/* Online MBA */}
                  <div
                    onClick={() => setSelectedDegree('Online MBA')}
                    style={{
                      border: selectedDegree === 'Online MBA' ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      backgroundColor: selectedDegree === 'Online MBA' ? '#faf5ff' : '#ffffff'
                    }}
                  >
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedDegree === 'Online MBA' ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                    <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>Online MBA</span>
                  </div>

                  {/* Online MCA (With RECOMMENDED banner seamlessly attached) */}
                  <div
                    onClick={() => setSelectedDegree('Online MCA')}
                    style={{
                      border: selectedDegree === 'Online MCA' ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: selectedDegree === 'Online MCA' ? '#faf5ff' : '#ffffff'
                    }}
                  >
                    <div style={{ backgroundColor: '#ede9fe', color: '#6b21a8', fontSize: '9px', fontWeight: 800, padding: '3px 8px', textAlign: 'center', letterSpacing: '0.04em' }}>
                      ✦ RECOMMENDED
                    </div>
                    <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedDegree === 'Online MCA' ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                      <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>Online MCA</span>
                    </div>
                  </div>

                  {/* Other Masters */}
                  {[
                    { name: 'Online M.Com' },
                    { name: 'Online M.Sc' },
                    { name: 'Online MA' },
                    { name: 'Other' }
                  ].map((deg) => {
                    const isSelected = selectedDegree === deg.name;
                    return (
                      <div
                        key={deg.name}
                        onClick={() => setSelectedDegree(deg.name)}
                        style={{
                          border: isSelected ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#faf5ff' : '#ffffff'
                        }}
                      >
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: isSelected ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                        <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>{deg.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bachelors */}
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '8px' }}>Bachelors</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {['Online BBA', 'Online BCA', 'Online B.Com', 'Online BA', 'Other'].map((deg) => {
                    const isSelected = selectedDegree === deg;
                    return (
                      <div
                        key={deg}
                        onClick={() => setSelectedDegree(deg)}
                        style={{
                          border: isSelected ? '1.5px solid #38006b' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#faf5ff' : '#ffffff'
                        }}
                      >
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: isSelected ? '5px solid #38006b' : '1.5px solid #cbd5e1', backgroundColor: '#ffffff' }} />
                        <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1f2937' }}>{deg}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Green strip: Learn from top universities without leaving job */}
            <div 
              style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                padding: '9px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              <span>🎓</span> Learn from top universities without leaving job
            </div>

            <button
              onClick={() => setStep(11)}
              style={{
                width: '100%',
                backgroundColor: '#38006b',
                color: '#ffffff',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 11: Select your preferred college (Matching 11.png) */}
        {/* ========================================================= */}
        {step === 11 && (
          <div style={{ padding: '16px 28px 24px 28px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>
              Select your preferred college
            </h2>

            {/* Purple Banner: ADVANTAGE ASSURED COLLEGES */}
            <div 
              style={{
                backgroundColor: '#ede9fe',
                padding: '7px 14px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#38006b',
                letterSpacing: '0.04em',
                marginBottom: '14px'
              }}
            >
              <span>✔</span> ADVANTAGE ASSURED COLLEGES
            </div>

            {/* Capsule Search Bar */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <Search size={15} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search Colleges"
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 16px 9px 40px',
                  borderRadius: '9999px',
                  border: '1px solid #d1d5db',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* 15 College Cards (5 columns x 3 rows) */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)', 
                gap: '8px', 
                maxHeight: '260px', 
                overflowY: 'auto', 
                padding: '2px',
                marginBottom: '14px' 
              }}
            >
              {collegesList
                .filter(c => c.name.toLowerCase().includes(collegeSearch.toLowerCase()))
                .map((col) => {
                  const isSelected = selectedCollege?.id === col.id;
                  return (
                    <div
                      key={col.id}
                      onClick={() => setSelectedCollege(col)}
                      style={{
                        border: isSelected ? '2px solid #38006b' : '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '8px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#faf5ff' : '#ffffff'
                      }}
                    >
                      <div style={{ width: '44px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                        <img src={col.logo} alt={col.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: '#374151', lineHeight: 1.2 }}>
                        {col.name}
                      </span>
                    </div>
                  );
                })}
            </div>

            {/* Green strip: Free career benefits worth ₹14,376 */}
            <div 
              style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              <span>🎓</span> Your degree includes free career benefits worth ₹14,376
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => setStep(12)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px solid #38006b',
                  backgroundColor: '#ffffff',
                  color: '#38006b',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                I want recommendation
              </button>

              <button
                onClick={() => setStep(12)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#9975c9',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 12: DEGREE CONFIRMATION (Matching 12.png) */}
        {/* ========================================================= */}
        {step === 12 && (
          <div 
            style={{
              minHeight: '520px',
              backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#ffffff'
            }}
          >
            {/* Dark Vignette Overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 6, 28, 0.78)' }} />

            {/* Top Bar with circular white back button and close */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={handlePrevStep}
                style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <ArrowLeft size={16} color="#0f172a" />
              </button>

              <button 
                onClick={onClose}
                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={20} color="#ffffff" />
              </button>
            </div>

            {/* Center Degree Title & Badges */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: '14px 0' }}>
              {/* White shield crest */}
              <div style={{ width: '48px', height: '36px', backgroundColor: '#ffffff', clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                <GraduationCap size={20} color="#38006b" />
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#e2e8f0', marginBottom: '2px' }}>
                DEGREE FROM
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
                {selectedCollege?.name || 'BHARATHIDASAN UNIVERSITY'}
              </h2>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                <span style={{ backgroundColor: 'rgba(120, 53, 15, 0.85)', color: '#fef3c7', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  🎖 {selectedCollege?.nirf || 'NIRF #36'}
                </span>
                <span style={{ backgroundColor: 'rgba(120, 53, 15, 0.85)', color: '#fef3c7', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  ★ Top Students Choice
                </span>
              </div>

              {/* Glowing Center Box */}
              <div 
                style={{
                  backgroundColor: 'rgba(18, 12, 32, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '20px',
                  padding: '20px 24px 0 24px',
                  maxWidth: '350px',
                  margin: '0 auto',
                  boxShadow: '0 0 35px rgba(34, 197, 94, 0.25)'
                }}
              >
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.04em' }}>
                  apna advantage
                </div>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#22c55e', textShadow: '0 0 20px rgba(34, 197, 94, 0.8)', lineHeight: 1.1, margin: '4px 0' }}>
                  FREE
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#facc15' }}>
                  ₹14,376
                </div>
                <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '16px', lineHeight: 1.3 }}>
                  worth career benefits<br />for 24 months
                </div>

                <div style={{ backgroundColor: '#251640', margin: '0 -24px', padding: '10px 20px', borderRadius: '0 0 20px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#c4b5fd' }}>Course fee</span>
                  <span style={{ fontWeight: 800, color: '#ffffff' }}>{selectedCollege?.fees || '₹45,798'}</span>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <button
                onClick={() => {
                  submitLeadToBackend();
                  setStep(13);
                  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#ede9fe',
                  color: '#38006b',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 13: BOOK YOUR SEAT & POPUP (Matching 13.png) */}
        {/* ========================================================= */}
        {step === 13 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', minHeight: '520px', position: 'relative' }}>
            
            {/* Left Dark Column */}
            <div 
              style={{
                backgroundColor: '#171328',
                color: '#ffffff',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8' }}>apna </span>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#c084fc' }}>advantage</span>
                </div>

                {/* 3D Rose Gold Tilted Graduation Cap */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 20px 0' }}>
                  <SvgIcons.PinkGradCap3D />
                </div>

                <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.06em', color: '#94a3b8', textAlign: 'center', marginBottom: '18px' }}>
                  — REAL ADVANTAGES. ZERO EXTRA COST. —
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { text: 'Interview preparation from experts', icon: <Monitor size={15} color="#c084fc" /> },
                    { text: 'Direct MNC job access', icon: <Building2 size={15} color="#c084fc" /> },
                    { text: 'Easy EMI Options on admission', icon: <Wallet size={15} color="#c084fc" /> }
                  ].map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11.5px', color: '#e2e8f0', backgroundColor: 'rgba(255,255,255,0.04)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {feat.icon}
                      <span>{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Booking Column */}
            <div style={{ padding: '28px 24px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#111827', margin: 0 }}>
                    Book your seat
                  </h3>
                  <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={18} color="#4b5563" />
                  </button>
                </div>

                {/* College Banner Card */}
                <div 
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}
                >
                  <div 
                    style={{
                      height: '80px',
                      backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      padding: '8px 10px'
                    }}
                  >
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.65)', color: '#ffffff', fontSize: '9.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                      ⚙ 100% ONLINE CLASSES
                    </span>
                  </div>
                  <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                      {selectedCollege?.name || 'Bharathidasan University'}
                    </div>
                    <button 
                      onClick={() => setStep(11)}
                      style={{ background: '#f3f4f6', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700, color: '#4b5563', cursor: 'pointer' }}
                    >
                      CHANGE
                    </button>
                  </div>
                </div>

                {/* Dashed Coupon Card */}
                <div 
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>DEGREEOFF</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ✔ Applied
                  </span>
                </div>

                {/* Career Benefits Card */}
                <div 
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                      ₹14,376 worth
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                      career benefits included
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#7c3aed' }}>apna advantage</span>
                </div>

                {/* Social Proof Pill */}
                <div style={{ fontSize: '11px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', backgroundColor: '#f3e8ff', padding: '6px 10px', borderRadius: '6px' }}>
                  <span>🥳</span> Riya Kapoor got selected for {selectedCollege?.name || 'Bharathidasan University'} (Other)
                </div>
              </div>

              {/* Bottom booking price & button */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>₹200</span>
                    <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>₹500</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>for seat booking</div>
                </div>

                <button
                  onClick={() => {
                    setIsBookedSuccess(true);
                    confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
                  }}
                  style={{
                    backgroundColor: '#38006b',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Book Seat
                </button>
              </div>
            </div>

            {/* POPUP OVERLAY: OFFER APPLIED (Matching 13.png) */}
            {showOfferPopup && (
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  zIndex: 40
                }}
              >
                <div 
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '340px',
                    textAlign: 'center',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
                  }}
                >
                  {/* Top bright green bar */}
                  <div style={{ backgroundColor: '#22c55e', color: '#111827', fontSize: '12px', fontWeight: 800, padding: '7px' }}>
                    DEGREEOFF applied
                  </div>

                  <div style={{ padding: '24px 20px' }}>
                    {/* Golden 3D Offer Applied Badge */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                      <SvgIcons.OfferAppliedBadge />
                    </div>

                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#2e1065', margin: '0 0 16px 0' }}>
                      You saved ₹300 with this coupon
                    </h4>

                    <button
                      onClick={() => setShowOfferPopup(false)}
                      style={{
                        backgroundColor: '#38006b',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 44px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      WOW!
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SEAT BOOKED SUCCESS OVERLAY */}
            {isBookedSuccess && (
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '28px',
                  zIndex: 50,
                  textAlign: 'center'
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <Check size={34} color="#16a34a" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                  Seat Successfully Reserved!
                </h3>
                <p style={{ fontSize: '13.5px', color: '#6b7280', maxWidth: '360px', margin: '0 0 20px 0', lineHeight: 1.4 }}>
                  Congratulations! Your provisional admission for <strong>{selectedCollege?.name}</strong> has been secured. Your dedicated counselor will call you within 15 minutes.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    backgroundColor: '#38006b',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px 32px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
