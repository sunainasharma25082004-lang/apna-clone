import React from 'react';
import { X, CheckCircle, Award } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '800px',
          backgroundColor: '#090314',
          color: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#facc15' }}>apna</span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>advantage student story</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Video simulation / player */}
        <div style={{ position: 'relative', width: '100%', height: '420px', backgroundColor: '#000000' }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="Apna Advantage Student Story"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'none' }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '30px'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.2) 100%)'
              }}
            />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}
              >
                PLACED AT TOP MNC • 120% SALARY HIKE
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Sankaash Bharadwaj
              </h3>

              <p style={{ fontSize: '14.5px', color: '#cbd5e1', lineHeight: 1.5, maxWidth: '600px' }}>
                “Balancing a full-time tech role with an online MCA seemed impossible until I met my Apna Advantage counsellor. They guided me through flexible exam schedules, zero-cost EMI, and direct mock interviews with partner recruiters.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
