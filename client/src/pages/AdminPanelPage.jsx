import React, { useState, useEffect } from 'react';
import {
  GraduationCap, Building2, BookOpen, Users, Plus, Search, Edit3, Trash2,
  CheckCircle, AlertCircle, ArrowLeft, RefreshCw, Filter, ExternalLink,
  ChevronRight, Sparkles, Layers, DollarSign, MapPin, Award, Star, Globe, X
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const DEGREE_LEVELS = ['Bachelors', 'Masters', 'Doctorate', 'Certifications', 'Diploma'];
const COMMON_STREAMS = ['MBA', 'MCA', 'BBA', 'BCA', 'B.COM', 'M.COM', 'BA', 'MA', 'AI', 'DATA SCIENCE', 'PGDM', 'DBA', 'PHD'];
const CATEGORY_TAGS = [
  { id: 'students-top-choice', label: "Student's Top Choice" },
  { id: 'top-nirf-ranked', label: 'Top NIRF Ranked' },
  { id: 'assured-programs', label: 'Assured Programs' },
  { id: 'best-budget', label: 'Best Budget' }
];

export default function AdminPanelPage({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'colleges' | 'courses' | 'leads'
  const [stats, setStats] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState(false);
  const [toast, setToast] = useState(null);

  // Search & filter states
  const [collegeSearch, setCollegeSearch] = useState('');
  const [collegeCategoryFilter, setCollegeCategoryFilter] = useState('All');
  const [programSearch, setProgramSearch] = useState('');
  const [programLevelFilter, setProgramLevelFilter] = useState('All');
  const [programStreamFilter, setProgramStreamFilter] = useState('All');

  // Modal states
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'college' | 'program' | 'lead', id: string, name: string }

  // College form state
  const [collegeForm, setCollegeForm] = useState({
    name: '',
    shortName: '',
    slug: '',
    location: '',
    naacGrade: 'A+',
    nirfRank: 35,
    rating: 4.8,
    reviewCount: 1500,
    feesLevel: '₹ ₹ ₹',
    startingFee: '₹ 1.5 Lakh',
    startingFeeNum: 150000,
    duration: '3 Years',
    mode: '100% Online',
    programs: 'BBA, BCA, MBA, MCA',
    approvals: 'UGC-DEB, AICTE, NAAC A+',
    features: '100% Placement Support, Live Interactive Sessions, Industry Mentors',
    categoryTags: ['students-top-choice'],
    logo: '',
    image: '',
    autoCreatePrograms: true
  });

  // Program form state
  const [programForm, setProgramForm] = useState({
    name: '',
    degreeLevel: 'Masters',
    stream: 'MBA',
    collegeName: '',
    fee: '₹ 1,80,000',
    feeNum: 180000,
    duration: '2 Years',
    mode: '100% Online',
    rating: 4.8,
    specializations: 'Finance, Marketing, Business Analytics, HR'
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load all data
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Stats & Health
      const healthRes = await fetch(`${API_BASE}/health`).catch(() => null);
      if (healthRes && healthRes.ok) {
        setServerOnline(true);
      } else {
        setServerOnline(false);
      }

      const statsRes = await fetch(`${API_BASE}/admin/stats`).catch(() => null);
      if (statsRes && statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.stats);
      }

      // 2. Colleges
      const colRes = await fetch(`${API_BASE}/colleges`).catch(() => null);
      if (colRes && colRes.ok) {
        const colData = await colRes.json();
        if (colData.success) setColleges(colData.data || []);
      }

      // 3. Programs
      const progRes = await fetch(`${API_BASE}/programs`).catch(() => null);
      if (progRes && progRes.ok) {
        const progData = await progRes.json();
        if (progData.success) setPrograms(progData.data || []);
      }

      // 4. Leads
      const leadsRes = await fetch(`${API_BASE}/counselling`).catch(() => null);
      if (leadsRes && leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success) setLeads(leadsData.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open College Modal
  const handleOpenCollegeModal = (college = null) => {
    if (college) {
      setEditingCollege(college);
      setCollegeForm({
        name: college.name || '',
        shortName: college.shortName || '',
        slug: college.slug || '',
        location: college.location || '',
        naacGrade: college.naacGrade || 'A+',
        nirfRank: college.nirfRank || 35,
        rating: college.rating || 4.8,
        reviewCount: college.reviewCount || 1500,
        feesLevel: college.feesLevel || '₹ ₹ ₹',
        startingFee: college.startingFee || '₹ 1.5 Lakh',
        startingFeeNum: college.startingFeeNum || 150000,
        duration: college.duration || '3 Years',
        mode: college.mode || '100% Online',
        programs: Array.isArray(college.programs) ? college.programs.join(', ') : (college.programs || ''),
        approvals: Array.isArray(college.approvals) ? college.approvals.join(', ') : (college.approvals || ''),
        features: Array.isArray(college.features) ? college.features.join(', ') : (college.features || ''),
        categoryTags: Array.isArray(college.categoryTags) ? college.categoryTags : ['students-top-choice'],
        logo: college.logo || '',
        image: college.image || '',
        autoCreatePrograms: false
      });
    } else {
      setEditingCollege(null);
      setCollegeForm({
        name: '',
        shortName: '',
        slug: '',
        location: 'Delhi NCR, India',
        naacGrade: 'A+',
        nirfRank: 35,
        rating: 4.8,
        reviewCount: 1500,
        feesLevel: '₹ ₹ ₹',
        startingFee: '₹ 1.5 Lakh',
        startingFeeNum: 150000,
        duration: '3 Years',
        mode: '100% Online',
        programs: 'MBA, MCA, BBA, BCA',
        approvals: 'UGC-DEB, AICTE, NAAC A+',
        features: '100% Placement Support, Live Interactive Sessions, Industry Mentors',
        categoryTags: ['students-top-choice'],
        logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        autoCreatePrograms: true
      });
    }
    setIsCollegeModalOpen(true);
  };

  // Submit College
  const handleSaveCollege = async (e) => {
    e.preventDefault();
    if (!collegeForm.name.trim()) {
      showToast('Please enter college name', 'error');
      return;
    }

    try {
      const url = editingCollege
        ? `${API_BASE}/colleges/${editingCollege._id || editingCollege.slug}`
        : `${API_BASE}/colleges`;
      const method = editingCollege ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collegeForm)
      });
      const data = await res.json();

      if (data.success) {
        showToast(editingCollege ? 'College updated successfully!' : 'College added successfully!');
        setIsCollegeModalOpen(false);
        loadData();
      } else {
        showToast(data.message || 'Error saving college', 'error');
      }
    } catch (err) {
      showToast('Network error while saving college', 'error');
    }
  };

  // Open Program Modal
  const handleOpenProgramModal = (program = null, defaultCollegeName = null) => {
    if (program) {
      setEditingProgram(program);
      setProgramForm({
        name: program.name || '',
        degreeLevel: program.degreeLevel || 'Masters',
        stream: program.stream || 'MBA',
        collegeName: program.collegeName || (colleges[0]?.name || ''),
        fee: program.fee || '₹ 1,80,000',
        feeNum: program.feeNum || 180000,
        duration: program.duration || '2 Years',
        mode: program.mode || '100% Online',
        rating: program.rating || 4.8,
        specializations: Array.isArray(program.specializations)
          ? program.specializations.join(', ')
          : (program.specializations || '')
      });
    } else {
      setEditingProgram(null);
      const chosenCollege = defaultCollegeName || colleges[0]?.name || 'Lovely Professional University';
      setProgramForm({
        name: `Online MBA at ${chosenCollege}`,
        degreeLevel: 'Masters',
        stream: 'MBA',
        collegeName: chosenCollege,
        fee: '₹ 1,80,000',
        feeNum: 180000,
        duration: '2 Years',
        mode: '100% Online',
        rating: 4.8,
        specializations: 'Marketing, Finance, Business Analytics, HR'
      });
    }
    setIsProgramModalOpen(true);
  };

  // Submit Program
  const handleSaveProgram = async (e) => {
    e.preventDefault();
    if (!programForm.stream || !programForm.degreeLevel) {
      showToast('Please select stream and degree level', 'error');
      return;
    }

    try {
      const url = editingProgram
        ? `${API_BASE}/programs/${editingProgram._id}`
        : `${API_BASE}/programs`;
      const method = editingProgram ? 'PUT' : 'POST';

      const payload = {
        ...programForm,
        name: programForm.name.trim() || `${programForm.stream} at ${programForm.collegeName}`
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        showToast(editingProgram ? 'Course updated successfully!' : 'Course added successfully!');
        setIsProgramModalOpen(false);
        loadData();
      } else {
        showToast(data.message || 'Error saving course', 'error');
      }
    } catch (err) {
      showToast('Network error while saving course', 'error');
    }
  };

  // Confirm and Execute Delete
  const handleExecuteDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;

    try {
      let endpoint = '';
      if (type === 'college') endpoint = `${API_BASE}/colleges/${id}?deletePrograms=true`;
      else if (type === 'program') endpoint = `${API_BASE}/programs/${id}`;
      else if (type === 'lead') endpoint = `${API_BASE}/counselling/${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        setDeleteConfirm(null);
        loadData();
      } else {
        showToast(data.message || 'Delete failed', 'error');
      }
    } catch (err) {
      showToast('Failed to delete item', 'error');
    }
  };

  // Update lead status
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/counselling/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Lead status updated to ${newStatus}`);
        loadData();
      }
    } catch (err) {
      showToast('Failed to update lead status', 'error');
    }
  };

  // Filtered lists
  const filteredColleges = colleges.filter(c => {
    const matchesSearch = collegeSearch === '' ||
      c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      c.location?.toLowerCase().includes(collegeSearch.toLowerCase());
    const matchesCategory = collegeCategoryFilter === 'All' ||
      (Array.isArray(c.categoryTags) && c.categoryTags.includes(collegeCategoryFilter));
    return matchesSearch && matchesCategory;
  });

  const filteredPrograms = programs.filter(p => {
    const matchesSearch = programSearch === '' ||
      p.name.toLowerCase().includes(programSearch.toLowerCase()) ||
      p.collegeName.toLowerCase().includes(programSearch.toLowerCase()) ||
      p.stream.toLowerCase().includes(programSearch.toLowerCase());
    const matchesLevel = programLevelFilter === 'All' ||
      (p.degreeLevel && p.degreeLevel.toLowerCase() === programLevelFilter.toLowerCase());
    const matchesStream = programStreamFilter === 'All' ||
      (p.stream && p.stream.toUpperCase() === programStreamFilter.toUpperCase());
    return matchesSearch && matchesLevel && matchesStream;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'inherit' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: toast.type === 'error' ? '#ef4444' : '#10b981',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13.5px',
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ADMIN HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#1e1b4b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '14px 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          {/* Logo & Portal Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#facc15', letterSpacing: '0.04em' }}>
                apna
              </span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                advantage
              </span>
            </div>

            <span
              style={{
                backgroundColor: 'rgba(250, 204, 21, 0.15)',
                color: '#facc15',
                border: '1px solid rgba(250, 204, 21, 0.3)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.05em'
              }}
            >
              ADMIN SUITE
            </span>

            {/* Server status badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                fontWeight: 600,
                backgroundColor: serverOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: serverOnline ? '#34d399' : '#f87171',
                border: `1px solid ${serverOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: serverOnline ? '#10b981' : '#ef4444'
                }}
              />
              {serverOnline ? 'API Connected' : 'Local Fallback'}
            </span>
          </div>

          {/* Quick Actions & Navigation back to Public Site */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={loadData}
              title="Refresh all data from backend"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onNavigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#facc15',
                color: '#0f172a',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(250, 204, 21, 0.25)',
                transition: 'all 0.2s'
              }}
            >
              <ExternalLink size={14} />
              <span>View Public Website</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 24px' }}>
        
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '2px solid #e2e8f0',
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'overview' ? 700 : 600,
              color: activeTab === 'overview' ? '#4e12bb' : '#64748b',
              borderBottom: activeTab === 'overview' ? '3px solid #4e12bb' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('colleges')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'colleges' ? 700 : 600,
              color: activeTab === 'colleges' ? '#4e12bb' : '#64748b',
              borderBottom: activeTab === 'colleges' ? '3px solid #4e12bb' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            <Building2 size={16} />
            <span>Colleges ({colleges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'courses' ? 700 : 600,
              color: activeTab === 'courses' ? '#4e12bb' : '#64748b',
              borderBottom: activeTab === 'courses' ? '3px solid #4e12bb' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            <GraduationCap size={16} />
            <span>Courses & Programs ({programs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'leads' ? 700 : 600,
              color: activeTab === 'leads' ? '#4e12bb' : '#64748b',
              borderBottom: activeTab === 'leads' ? '3px solid #4e12bb' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            <Users size={16} />
            <span>Counselling Enquiries ({leads.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Colleges</span>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={22} color="#3b82f6" />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>{colleges.length}</div>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '6px' }}>Verified UGC / AICTE Approved partners</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Courses</span>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={22} color="#7c3aed" />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>{programs.length}</div>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '6px' }}>Across Bachelors, Masters, Diplomas & Certs</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Student Enquiries</span>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={22} color="#16a34a" />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>{leads.length}</div>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '6px' }}>Counselling session bookings</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quick Actions</span>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={22} color="#d97706" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    onClick={() => handleOpenCollegeModal()}
                    style={{
                      flex: 1,
                      backgroundColor: '#4e12bb',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    + College
                  </button>
                  <button
                    onClick={() => handleOpenProgramModal()}
                    style={{
                      flex: 1,
                      backgroundColor: '#7c3aed',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    + Course
                  </button>
                </div>
              </div>

            </div>

            {/* Recent Colleges and Courses section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              {/* Latest Colleges */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Recently Added Colleges</h3>
                  <button
                    onClick={() => setActiveTab('colleges')}
                    style={{ background: 'none', border: 'none', color: '#4e12bb', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    View All &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {colleges.slice(0, 5).map(col => (
                    <div
                      key={col._id || col.slug}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={col.logo}
                          alt={col.name}
                          style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80'; }}
                        />
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{col.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{col.location} • NAAC {col.naacGrade}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => handleOpenCollegeModal(col)}
                          style={{ background: 'none', border: 'none', color: '#4e12bb', cursor: 'pointer', padding: '6px' }}
                          title="Edit"
                        >
                          <Edit3 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Courses */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Recently Added Courses</h3>
                  <button
                    onClick={() => setActiveTab('courses')}
                    style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    View All &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {programs.slice(0, 5).map(prog => (
                    <div
                      key={prog._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              backgroundColor: '#ede9fe',
                              color: '#6d28d9',
                              fontSize: '11px',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}
                          >
                            {prog.stream}
                          </span>
                          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{prog.name}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                          {prog.collegeName} • {prog.fee}
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenProgramModal(prog)}
                        style={{ background: 'none', border: 'none', color: '#7c3aed', cursor: 'pointer', padding: '6px' }}
                        title="Edit"
                      >
                        <Edit3 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: COLLEGES MANAGEMENT */}
        {activeTab === 'colleges' && (
          <div>
            {/* Header controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Search */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    border: '1.2px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    width: '260px'
                  }}
                >
                  <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    placeholder="Search colleges..."
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
                  />
                </div>

                {/* Category filter */}
                <select
                  value={collegeCategoryFilter}
                  onChange={(e) => setCollegeCategoryFilter(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    border: '1.2px solid #cbd5e1',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    fontWeight: 600
                  }}
                >
                  <option value="All">All Categories</option>
                  {CATEGORY_TAGS.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Add College button */}
              <button
                onClick={() => handleOpenCollegeModal()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#4e12bb',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(78, 18, 187, 0.25)'
                }}
              >
                <Plus size={16} />
                <span>Add New College</span>
              </button>
            </div>

            {/* Colleges Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>College</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Location</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Rank / Grade</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Starting Fee</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Programs Offered</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                          No colleges found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredColleges.map((col, idx) => (
                        <tr
                          key={col._id || col.slug || idx}
                          style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={col.logo}
                                alt={col.name}
                                style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80'; }}
                              />
                              <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>{col.name}</div>
                                <div style={{ fontSize: '11.5px', color: '#64748b' }}>Slug: {col.slug}</div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '14px 18px', color: '#334155' }}>
                            {col.location}
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                                NAAC {col.naacGrade}
                              </span>
                              {col.nirfRank && (
                                <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                                  NIRF #{col.nirfRank}
                                </span>
                              )}
                            </div>
                          </td>

                          <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a' }}>
                            {col.startingFee}
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '260px' }}>
                              {(col.programs || []).slice(0, 4).map(p => (
                                <span
                                  key={p}
                                  style={{
                                    backgroundColor: '#f1f5f9',
                                    color: '#475569',
                                    fontSize: '11px',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontWeight: 600
                                  }}
                                >
                                  {p}
                                </span>
                              ))}
                              {(col.programs || []).length > 4 && (
                                <span style={{ fontSize: '11px', color: '#64748b' }}>
                                  +{col.programs.length - 4} more
                                </span>
                              )}
                            </div>
                          </td>

                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                              <button
                                onClick={() => handleOpenProgramModal(null, col.name)}
                                title="Add Course for this College"
                                style={{
                                  backgroundColor: '#eff6ff',
                                  color: '#2563eb',
                                  border: 'none',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                + Course
                              </button>
                              <button
                                onClick={() => handleOpenCollegeModal(col)}
                                title="Edit College"
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  color: '#334155',
                                  border: 'none',
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'college', id: col._id || col.slug, name: col.name })}
                                title="Delete College"
                                style={{
                                  backgroundColor: '#fef2f2',
                                  color: '#ef4444',
                                  border: 'none',
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COURSES MANAGEMENT */}
        {activeTab === 'courses' && (
          <div>
            {/* Header controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Search */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    border: '1.2px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    width: '260px'
                  }}
                >
                  <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={programSearch}
                    onChange={(e) => setProgramSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
                  />
                </div>

                {/* Level filter */}
                <select
                  value={programLevelFilter}
                  onChange={(e) => setProgramLevelFilter(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    border: '1.2px solid #cbd5e1',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    fontWeight: 600
                  }}
                >
                  <option value="All">All Degrees</option>
                  {DEGREE_LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>

                {/* Stream filter */}
                <select
                  value={programStreamFilter}
                  onChange={(e) => setProgramStreamFilter(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    border: '1.2px solid #cbd5e1',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    fontWeight: 600
                  }}
                >
                  <option value="All">All Streams</option>
                  {COMMON_STREAMS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Add Course button */}
              <button
                onClick={() => handleOpenProgramModal()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)'
                }}
              >
                <Plus size={16} />
                <span>Add New Course</span>
              </button>
            </div>

            {/* Courses Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Course Name</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Stream / Degree</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>College</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Total Fee</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Duration / Mode</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                          No courses found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredPrograms.map((prog, idx) => (
                        <tr
                          key={prog._id || idx}
                          style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{prog.name}</div>
                            {Array.isArray(prog.specializations) && prog.specializations.length > 0 && (
                              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                Specs: {prog.specializations.slice(0, 3).join(', ')}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 800 }}>
                                {prog.stream}
                              </span>
                              <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                                {prog.degreeLevel}
                              </span>
                            </div>
                          </td>

                          <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                            {prog.collegeName}
                          </td>

                          <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a' }}>
                            {prog.fee}
                          </td>

                          <td style={{ padding: '14px 18px', color: '#64748b' }}>
                            {prog.duration} • {prog.mode}
                          </td>

                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                              <button
                                onClick={() => handleOpenProgramModal(prog)}
                                title="Edit Course"
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  color: '#334155',
                                  border: 'none',
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'program', id: prog._id, name: prog.name })}
                                title="Delete Course"
                                style={{
                                  backgroundColor: '#fef2f2',
                                  color: '#ef4444',
                                  border: 'none',
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUNSELLING LEADS */}
        {activeTab === 'leads' && (
          <div>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Student Enquiries & Leads</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b' }}>Submitted from homepage, popups, and counsellor forms</p>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Candidate</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Contact</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Program / College</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Status</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Date</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                          No enquiries received yet. Try booking a free counselling session on the website to see it appear here live!
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead, idx) => (
                        <tr
                          key={lead._id || idx}
                          style={{ borderBottom: '1px solid #f1f5f9' }}
                        >
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{lead.name}</div>
                            {lead.isPartner && (
                              <span style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                                PARTNER LEAD
                              </span>
                            )}
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ color: '#0f172a', fontWeight: 600 }}>{lead.phone}</div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>{lead.email}</div>
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: 600, color: '#4e12bb' }}>{lead.preferredProgram || lead.stream || 'MBA'}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{lead.preferredCollege || lead.selectedCollege || 'Any University'}</div>
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <select
                              value={lead.status || 'Confirmed'}
                              onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value)}
                              style={{
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 700,
                                border: '1px solid #cbd5e1',
                                backgroundColor: lead.status === 'Enrolled' ? '#dcfce7' : (lead.status === 'Contacted' ? '#eff6ff' : '#fef9c3'),
                                color: lead.status === 'Enrolled' ? '#15803d' : (lead.status === 'Contacted' ? '#1d4ed8' : '#854d0e')
                              }}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12px' }}>
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                          </td>

                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'lead', id: lead._id, name: lead.name })}
                              style={{
                                backgroundColor: '#fef2f2',
                                color: '#ef4444',
                                border: 'none',
                                padding: '6px 8px',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                              title="Delete Lead"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ==================== ADD / EDIT COLLEGE MODAL ==================== */}
      {isCollegeModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsCollegeModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={22} color="#7c3aed" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                    {editingCollege ? 'Edit College' : 'Add New College'}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Enter college details to display across Apna Advantage portal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCollegeModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
              >
                <X size={20} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSaveCollege}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Symbiosis International University"
                    value={collegeForm.name}
                    onChange={(e) => setCollegeForm({ ...collegeForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Short Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Symbiosis Online"
                    value={collegeForm.shortName}
                    onChange={(e) => setCollegeForm({ ...collegeForm, shortName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Maharashtra"
                    value={collegeForm.location}
                    onChange={(e) => setCollegeForm({ ...collegeForm, location: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    NAAC Grade
                  </label>
                  <select
                    value={collegeForm.naacGrade}
                    onChange={(e) => setCollegeForm({ ...collegeForm, naacGrade: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="A++">A++</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B++">B++</option>
                    <option value="UGC Approved">UGC Approved</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    NIRF Rank
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 28"
                    value={collegeForm.nirfRank}
                    onChange={(e) => setCollegeForm({ ...collegeForm, nirfRank: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Starting Fee (Display Text)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 1.6 Lakh"
                    value={collegeForm.startingFee}
                    onChange={(e) => setCollegeForm({ ...collegeForm, startingFee: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Starting Fee (Numeric in ₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 160000"
                    value={collegeForm.startingFeeNum}
                    onChange={(e) => setCollegeForm({ ...collegeForm, startingFeeNum: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Programs / Streams Offered (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MBA, MCA, BBA, BCA, M.COM"
                  value={collegeForm.programs}
                  onChange={(e) => setCollegeForm({ ...collegeForm, programs: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Approvals & Recognitions (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UGC-DEB, AICTE, NAAC A+, WES Recognised"
                  value={collegeForm.approvals}
                  onChange={(e) => setCollegeForm({ ...collegeForm, approvals: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Logo Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={collegeForm.logo}
                    onChange={(e) => setCollegeForm({ ...collegeForm, logo: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Campus Cover Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={collegeForm.image}
                    onChange={(e) => setCollegeForm({ ...collegeForm, image: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {!editingCollege && (
                <div style={{ marginBottom: '24px', backgroundColor: '#f3e8ff', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="autoCreate"
                    checked={collegeForm.autoCreatePrograms}
                    onChange={(e) => setCollegeForm({ ...collegeForm, autoCreatePrograms: e.target.checked })}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="autoCreate" style={{ fontSize: '13px', fontWeight: 600, color: '#4c1d95', cursor: 'pointer' }}>
                    Automatically create and publish catalog courses for all selected programs
                  </label>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setIsCollegeModalOpen(false)}
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '11px 20px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4e12bb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px 24px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(78, 18, 187, 0.3)'
                  }}
                >
                  {editingCollege ? 'Save Changes' : 'Create & Publish College'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== ADD / EDIT COURSE MODAL ==================== */}
      {isProgramModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsProgramModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={22} color="#7c3aed" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                    {editingProgram ? 'Edit Course / Program' : 'Add New Course / Program'}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Publish a degree or certification course to Apna Advantage catalog
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProgramModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
              >
                <X size={20} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Select College / University *
                </label>
                <select
                  required
                  value={programForm.collegeName}
                  onChange={(e) => {
                    const colName = e.target.value;
                    setProgramForm(prev => ({
                      ...prev,
                      collegeName: colName,
                      name: `${prev.stream || 'MBA'} at ${colName}`
                    }));
                  }}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  {colleges.map(c => (
                    <option key={c._id || c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Degree Level *
                  </label>
                  <select
                    value={programForm.degreeLevel}
                    onChange={(e) => setProgramForm({ ...programForm, degreeLevel: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    {DEGREE_LEVELS.map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Stream Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBA, MCA, BBA, AI"
                    value={programForm.stream}
                    onChange={(e) => {
                      const streamVal = e.target.value.toUpperCase();
                      setProgramForm(prev => ({
                        ...prev,
                        stream: streamVal,
                        name: `${streamVal} at ${prev.collegeName || 'Top University'}`
                      }));
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Full Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masters of Business Administration (MBA)"
                  value={programForm.name}
                  onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Total Fee (Display)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 1,90,000"
                    value={programForm.fee}
                    onChange={(e) => setProgramForm({ ...programForm, fee: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Fee (Numeric ₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 190000"
                    value={programForm.feeNum}
                    onChange={(e) => setProgramForm({ ...programForm, feeNum: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Years"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Mode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Online"
                    value={programForm.mode}
                    onChange={(e) => setProgramForm({ ...programForm, mode: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Specializations (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marketing, Finance, HR, IT"
                  value={programForm.specializations}
                  onChange={(e) => setProgramForm({ ...programForm, specializations: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.2px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '11px 20px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#7c3aed',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px 24px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  {editingProgram ? 'Save Changes' : 'Create & Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '440px',
              width: '100%',
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#fef2f2',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <Trash2 size={26} />
            </div>

            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Confirm Deletion
            </h4>

            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>
              Are you sure you want to delete <strong>"{deleteConfirm.name}"</strong>?
              {deleteConfirm.type === 'college' && (
                <span style={{ display: 'block', marginTop: '6px', color: '#b91c1c', fontSize: '12px' }}>
                  Note: All associated courses for this college will also be removed from catalog.
                </span>
              )}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  flex: 1,
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  padding: '11px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDelete}
                style={{
                  flex: 1,
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  padding: '11px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

