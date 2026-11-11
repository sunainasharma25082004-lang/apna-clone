import React, { useState, useEffect } from 'react';
import { X, Check, Star, ShieldCheck, Award, Banknote, Clock, ArrowRight } from 'lucide-react';

export default function CompareModal({ isOpen, onClose, onSelectForCounselling }) {
  const [colleges, setColleges] = useState([]);
  const [selectedSlugs, setSelectedSlugs] = useState([
    'lovely-professional-university',
    'amity-university',
    'chandigarh-university'
  ]);

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:5000/api/colleges')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setColleges(data.data);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const comparedColleges = colleges.filter(c => selectedSlugs.includes(c.slug));

  const toggleCollege = (slug) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length > 2) {
        setSelectedSlugs(selectedSlugs.filter(s => s !== slug));
      }
    } else {
      if (selectedSlugs.length < 3) {
        setSelectedSlugs([...selectedSlugs, slug]);
      } else {
        // Replace last
        setSelectedSlugs([selectedSlugs[0], selectedSlugs[1], slug]);
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1080px', width: '95%' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#4e12bb', letterSpacing: '0.08em' }}>
              APNA ADVANTAGE COLLEGE COMPARATOR
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
              Side-by-Side University Comparison
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

        {/* College selector chips */}
        <div style={{ padding: '16px 28px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Select to compare (max 3):</span>
          {colleges.map(c => {
            const isSelected = selectedSlugs.includes(c.slug);
            return (
              <button
                key={c.slug}
                onClick={() => toggleCollege(c.slug)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: isSelected ? '1.5px solid #4e12bb' : '1px solid #cbd5e1',
                  backgroundColor: isSelected ? '#ede9fe' : '#ffffff',
                  color: isSelected ? '#4e12bb' : '#334155',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {isSelected ? '✓ ' : '+ '}{c.shortName || c.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div style={{ padding: '24px 28px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ width: '25%', padding: '16px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
                  Criteria
                </th>
                {comparedColleges.map(c => (
                  <th key={c.slug} style={{ width: `${75 / comparedColleges.length}%`, padding: '16px', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>{c.location}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* NAAC Grade */}
              <tr>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#334155', fontSize: '13px' }}>
                  NAAC Grade / Accreditations
                </td>
                {comparedColleges.map(c => (
                  <td key={c.slug} style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '9999px', fontWeight: 800, fontSize: '12px' }}>
                      {c.naacGrade}
                    </span>
                  </td>
                ))}
              </tr>

              {/* NIRF Rank */}
              <tr>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#334155', fontSize: '13px' }}>
                  NIRF Ranking
                </td>
                {comparedColleges.map(c => (
                  <td key={c.slug} style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                    {c.nirfRank ? `#${c.nirfRank} in India` : 'Globally Accredited'}
                  </td>
                ))}
              </tr>

              {/* Starting Fee */}
              <tr>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#334155', fontSize: '13px' }}>
                  Starting Fee
                </td>
                {comparedColleges.map(c => (
                  <td key={c.slug} style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: 800, color: '#4e12bb', fontSize: '15px' }}>
                    {c.startingFee}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#334155', fontSize: '13px' }}>
                  Student Rating
                </td>
                {comparedColleges.map(c => (
                  <td key={c.slug} style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '13.5px', color: '#0f172a' }}>
                      <Star size={15} color="#eab308" fill="#eab308" />
                      {c.rating} / 5.0
                    </div>
                  </td>
                ))}
              </tr>

              {/* Mode & Duration */}
              <tr>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#334155', fontSize: '13px' }}>
                  Study Mode
                </td>
                {comparedColleges.map(c => (
                  <td key={c.slug} style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: '13px', color: '#334155' }}>
                    {c.mode || '100% Online'}
                  </td>
                ))}
              </tr>

              {/* Action Button Row */}
              <tr>
                <td style={{ padding: '20px 16px' }} />
                {comparedColleges.map(c => (
                  <td key={c.slug} style={{ padding: '20px 16px', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectForCounselling('MBA', c.name);
                      }}
                      className="btn-primary"
                      style={{ padding: '10px 20px', fontSize: '12.5px', width: '100%' }}
                    >
                      Enquire for this college →
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
