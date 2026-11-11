import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesOverview from './components/FeaturesOverview';
import CandidateBanner from './components/CandidateBanner';
import ProgramsCatalog from './components/ProgramsCatalog';
import TestimonialAndColumns from './components/TestimonialAndColumns';
import GloballyRecognised from './components/GloballyRecognised';
import PreferredDegrees from './components/PreferredDegrees';
import HiringPartnersBanner from './components/HiringPartnersBanner';
import CounsellorWalkthrough from './components/CounsellorWalkthrough';
import UniversityComparison from './components/UniversityComparison';
import EducationOutcomes from './components/EducationOutcomes';
import Footer from './components/Footer';

import CompareCollegesPage from './pages/CompareCollegesPage';
import BecomeAPartnerPage from './pages/BecomeAPartnerPage';
import AdminPanelPage from './pages/AdminPanelPage';

import CounsellingModal from './components/modals/CounsellingModal';
import CompareModal from './components/modals/CompareModal';
import EligibilityModal from './components/modals/EligibilityModal';
import VideoModal from './components/modals/VideoModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#admin') return 'admin';
    if (window.location.hash === '#partner') return 'partner';
    if (window.location.hash === '#compare') return 'compare';
    return 'home';
  });

  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#partner') {
        setCurrentPage('partner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#compare') {
        setCurrentPage('compare');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPartner = () => {
    window.location.hash = '#partner';
    setCurrentPage('partner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCompare = () => {
    window.location.hash = '#compare';
    setCurrentPage('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal context states
  const [selectedStream, setSelectedStream] = useState('MBA');
  const [selectedCollege, setSelectedCollege] = useState('Lovely Professional University');
  const [isPartnerRequest, setIsPartnerRequest] = useState(false);
  const [assignedCounsellor, setAssignedCounsellor] = useState('Akshitha Badiger');

  const handleOpenCounselling = (stream = null, college = null, isPartner = false, counsellor = null) => {
    if (stream) setSelectedStream(stream);
    if (college) setSelectedCollege(college);
    if (counsellor) setAssignedCounsellor(counsellor);
    setIsPartnerRequest(Boolean(isPartner));
    setIsCounsellingOpen(true);
  };

  const handleExplorePrograms = () => {
    if (currentPage !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById('programs');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('programs');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentPage === 'admin' ? (
        <AdminPanelPage
          onNavigateHome={navigateToHome}
        />
      ) : currentPage === 'partner' ? (
        <BecomeAPartnerPage
          onNavigateHome={navigateToHome}
          onOpenCounselling={handleOpenCounselling}
        />
      ) : (
        <>
          {/* 1. Header Navigation (Images 1-13) */}
          <Navbar
            currentPage={currentPage}
            onNavigateHome={navigateToHome}
            onNavigateCompare={navigateToCompare}
            onNavigatePartner={navigateToPartner}
            onNavigateAdmin={navigateToAdmin}
            onOpenCounselling={handleOpenCounselling}
            onOpenCompare={navigateToCompare}
            onOpenEligibility={() => setIsEligibilityOpen(true)}
            onExplorePrograms={handleExplorePrograms}
            onSelectProgram={(level, stream) => {
              handleOpenCounselling(stream);
            }}
          />

          <main style={{ flex: 1 }}>
            {currentPage === 'compare' ? (
              <CompareCollegesPage
                onOpenCounselling={handleOpenCounselling}
                onNavigateHome={navigateToHome}
              />
            ) : (
              <>
                {/* 2. Hero Section (Image 1) */}
                <HeroSection
                  onOpenCounselling={handleOpenCounselling}
                  onExplorePrograms={handleExplorePrograms}
                />

                {/* 3. Features Overview (Image 2) */}
                <FeaturesOverview
                  onOpenCounselling={handleOpenCounselling}
                  onOpenCompare={navigateToCompare}
                  onOpenEligibility={() => setIsEligibilityOpen(true)}
                  onExplorePrograms={handleExplorePrograms}
                />

                {/* 4. Candidate Meadow Panoramic Banner (Image 3) */}
                <CandidateBanner
                  onOpenEligibility={() => setIsEligibilityOpen(true)}
                />

                {/* 5. Online Programs Catalog with Folder Tabs & University Cards (Image 4) */}
                <ProgramsCatalog
                  onOpenCounselling={handleOpenCounselling}
                  onOpenCompare={navigateToCompare}
                />

                {/* 6. Testimonial Cyber Banner & 4 Category Columns (Image 5) */}
                <TestimonialAndColumns
                  onOpenCounselling={handleOpenCounselling}
                  onOpenVideo={() => setIsVideoOpen(true)}
                  onSelectCollege={(slug) => {
                    handleOpenCounselling(null, slug);
                  }}
                />

                {/* 7. Globally Recognised Universities Arched Carousel (Image 6) */}
                <GloballyRecognised
                  onOpenCounselling={handleOpenCounselling}
                />

                {/* 8. Online Degrees Preferred by Recruiters 3D Podiums (Image 7) */}
                <PreferredDegrees
                  onSelectDegree={(code) => {
                    handleOpenCounselling(code);
                  }}
                />

                {/* 9. 7 Lakhs+ Hiring Partners Landscape with Floating Bubbles (Image 8) */}
                <HiringPartnersBanner
                  onOpenCounselling={handleOpenCounselling}
                  onExplorePrograms={handleExplorePrograms}
                />

                {/* 10. Counsellor Walkthrough Steps 1 & 2 (Images 9 & 10) */}
                <CounsellorWalkthrough
                  onOpenCounselling={handleOpenCounselling}
                  onOpenEligibility={() => setIsEligibilityOpen(true)}
                />

                {/* 11. Pick the Right University Comparison Carousel (Image 11) */}
                <UniversityComparison
                  onOpenCompare={navigateToCompare}
                />

                {/* 12. Education that Drives Outcomes 3 Outcome Cards (Image 12) */}
                <EducationOutcomes
                  onOpenCounselling={handleOpenCounselling}
                  onOpenEligibility={() => setIsEligibilityOpen(true)}
                />
              </>
            )}
          </main>

          {/* 13. Cosmic Galaxy Footer (Image 13) */}
          <Footer
            onOpenCounselling={handleOpenCounselling}
            onOpenCompare={navigateToCompare}
            onNavigatePartner={navigateToPartner}
          />
        </>
      )}

      {/* Interactive Modals */}
      <CounsellingModal
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
        initialStream={selectedStream}
        initialCollege={selectedCollege}
        isPartner={isPartnerRequest}
        preselectedCounsellor={assignedCounsellor}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectForCounselling={handleOpenCounselling}
      />

      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onOpenCounselling={handleOpenCounselling}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
