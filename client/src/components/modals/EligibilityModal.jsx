import React, { useState } from 'react';
import { X, CheckCircle, Award, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EligibilityModal({ isOpen, onClose, onOpenCounselling }) {
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState('Graduation');
  const [experience, setExperience] = useState('1-3 Years');
  const [goal, setGoal] = useState('Career Switch / Salary Hike');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qualification: education,
          experience,
          targetRole: goal
        })
      });
      const data = await res.json();
      setResult(data);
      setStep(4);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setResult({
        eligibilityStatus: 'Eligible with Pre-Approved Merit Grant',
        scholarshipPercentage: 25,
        recommendedDegrees: ['MBA', 'MCA', 'BBA'],
        topColleges: [
          { name: 'Lovely Professional University', startingFee: '1.5 Lakh' },
          { name: 'Amity University', startingFee: '1.99 Lakh' },
          { name: 'Chandigarh University', startingFee: '1.85 Lakh' }
        ]
      });
      setStep(4);
      confetti({ particleCount: 90, spread: 70 });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', letterSpacing: '0.06em' }}>
                APNA ADVANTAGE SCHOLARSHIP PORTAL
              </span>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              Instant Eligibility & Merit Grant Calculator
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#475569" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '28px' }}>
          {step === 1 && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>STEP 1 OF 3</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                What is your highest educational qualification?
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
                {['12th Standard Passed', 'Diploma / Polytechnic', 'Graduation / Bachelor Degree', 'Post Graduation / Master Degree'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setEducation(opt)}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      border: education === opt ? '2px solid #5218c9' : '1px solid #e2e8f0',
                      backgroundColor: education === opt ? '#f3ebff' : '#ffffff',
                      color: education === opt ? '#5218c9' : '#1e293b',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {education === opt && '✓ '}{opt}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                Continue to Step 2 →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>STEP 2 OF 3</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                How much total work experience do you have?
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
                {['Fresher (0 years)', '1 - 3 Years', '3 - 5 Years', '5+ Years (Executive)'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setExperience(opt)}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      border: experience === opt ? '2px solid #5218c9' : '1px solid #e2e8f0',
                      backgroundColor: experience === opt ? '#f3ebff' : '#ffffff',
                      color: experience === opt ? '#5218c9' : '#1e293b',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {experience === opt && '✓ '}{opt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '14px' }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary"
                  style={{ flex: 2, padding: '14px' }}
                >
                  Continue to Step 3 →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>STEP 3 OF 3</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                What is your primary career goal?
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {[
                  'Career switch into High-paying Tech / AI roles',
                  'Promotion & Senior Leadership in Current Industry',
                  'International Work Mobility / Global Equivalent Degree',
                  'Flexible studies alongside full-time work with 0% EMI'
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setGoal(opt)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: goal === opt ? '2px solid #5218c9' : '1px solid #e2e8f0',
                      backgroundColor: goal === opt ? '#f3ebff' : '#ffffff',
                      color: goal === opt ? '#5218c9' : '#1e293b',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {goal === opt && '✓ '}{opt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '14px' }}
                >
                  Back
                </button>
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="btn-primary"
                  style={{ flex: 2, padding: '14px' }}
                >
                  {loading ? 'Evaluating...' : 'Check My Eligibility & Grant →'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && result && (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  backgroundColor: '#ecfdf5',
                  border: '1.5px solid #a7f3d0',
                  borderRadius: '20px',
                  padding: '24px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 800, fontSize: '13px', marginBottom: '8px' }}>
                  <Award size={20} /> PRE-APPROVED MERIT SCHOLARSHIP
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#065f46' }}>
                  {result.scholarshipPercentage}% Tuition Grant Approved
                </div>
                <p style={{ fontSize: '13.5px', color: '#047857', marginTop: '6px' }}>
                  Based on your {education} background and {experience} experience.
                </p>
              </div>

              <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '10px' }}>
                  RECOMMENDED PROGRAMS FOR YOU:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(result.recommendedDegrees || []).map((deg) => (
                    <span
                      key={deg}
                      style={{
                        backgroundColor: '#ede9fe',
                        color: '#5b21b6',
                        padding: '6px 16px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '13px'
                      }}
                    >
                      🎓 {deg}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCounselling(result.recommendedDegrees?.[0] || 'MBA');
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                Claim Grant & Talk to Counsellor Now →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
