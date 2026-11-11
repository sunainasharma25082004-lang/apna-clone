import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedColleges } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'store.json');

// Generate unique ID helper
function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

// Generate URL slug from name
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Build default programs from seed colleges
function buildInitialPrograms(colleges) {
  const programs = [];
  colleges.forEach(col => {
    (col.programs || []).forEach(prog => {
      const isMaster = ['MBA', 'MCA', 'M.COM', 'MA', 'M.Sc', 'PGDM'].includes(prog);
      const isDoctorate = ['DBA', 'PHD'].includes(prog);
      const isCert = ['DATA SCIENCE', 'MARKETING', 'AI'].includes(prog);
      const isDiploma = ['PGDM', 'ADVANCED DIPLOMA'].includes(prog);

      let degreeLevel = 'Bachelors';
      if (isMaster) degreeLevel = 'Masters';
      else if (isDoctorate) degreeLevel = 'Doctorate';
      else if (isCert) degreeLevel = 'Certifications';
      else if (isDiploma) degreeLevel = 'Diploma';

      programs.push({
        _id: generateId('prog'),
        name: `${prog} at ${col.name}`,
        degreeLevel,
        stream: prog,
        collegeName: col.name,
        collegeSlug: col.slug,
        collegeLogo: col.logo,
        collegeImage: col.image,
        fee: col.startingFee || '₹ 1,50,000',
        feeNum: col.startingFeeNum || 150000,
        duration: col.duration || (degreeLevel === 'Masters' ? '2 Years' : '3 Years'),
        mode: col.mode || '100% Online',
        rating: col.rating || 4.8,
        recruiterRank: col.nirfRank || 50,
        specializations: ['General', 'Executive'],
        createdAt: new Date().toISOString()
      });
    });
  });
  return programs;
}

// Read store from disk
export function readStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed && Array.isArray(parsed.colleges) && Array.isArray(parsed.programs)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading store.json, re-initializing defaults:', err.message);
  }

  // Initialize with seed data
  const initialColleges = seedColleges.map((c, idx) => ({
    _id: generateId('col'),
    ...c,
    slug: c.slug || slugify(c.name),
    createdAt: new Date().toISOString()
  }));

  const initialPrograms = buildInitialPrograms(initialColleges);

  const initialStore = {
    colleges: initialColleges,
    programs: initialPrograms,
    leads: []
  };

  writeStore(initialStore);
  return initialStore;
}

// Write store to disk
export function writeStore(data) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store.json:', err.message);
  }
}

// ==================== COLLEGES ====================

export function getColleges({ category, stream, search } = {}) {
  const store = readStore();
  let results = [...store.colleges];

  if (category && category !== 'All') {
    results = results.filter(c => Array.isArray(c.categoryTags) && c.categoryTags.includes(category));
  }
  if (stream && stream !== 'All') {
    const s = stream.toUpperCase();
    results = results.filter(c => Array.isArray(c.programs) && c.programs.some(p => p.toUpperCase() === s));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c =>
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.shortName && c.shortName.toLowerCase().includes(q)) ||
      (c.location && c.location.toLowerCase().includes(q))
    );
  }

  return results;
}

export function getCollegeByIdOrSlug(idOrSlug) {
  const store = readStore();
  return store.colleges.find(c => c._id === idOrSlug || c.slug === idOrSlug);
}

export function addCollege(collegeData) {
  const store = readStore();
  const slug = collegeData.slug ? slugify(collegeData.slug) : slugify(collegeData.name);

  // Check slug conflict
  let uniqueSlug = slug;
  let counter = 1;
  while (store.colleges.some(c => c.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  const newCollege = {
    _id: generateId('col'),
    name: collegeData.name,
    slug: uniqueSlug,
    shortName: collegeData.shortName || collegeData.name,
    logo: collegeData.logo || 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80',
    image: collegeData.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
    naacGrade: collegeData.naacGrade || 'A+',
    nirfRank: Number(collegeData.nirfRank) || 50,
    rating: Number(collegeData.rating) || 4.8,
    reviewCount: Number(collegeData.reviewCount) || 1200,
    feesLevel: collegeData.feesLevel || '₹ ₹ ₹',
    startingFee: collegeData.startingFee || '₹ 1.5 Lakh',
    startingFeeNum: Number(collegeData.startingFeeNum) || 150000,
    duration: collegeData.duration || '3 Years',
    mode: collegeData.mode || '100% Online',
    programs: Array.isArray(collegeData.programs) ? collegeData.programs : (collegeData.programs ? collegeData.programs.split(',').map(s => s.trim().toUpperCase()) : ['MBA', 'BBA']),
    location: collegeData.location || 'India',
    approvals: Array.isArray(collegeData.approvals) ? collegeData.approvals : (collegeData.approvals ? collegeData.approvals.split(',').map(s => s.trim()) : ['UGC-DEB', 'AICTE']),
    features: Array.isArray(collegeData.features) ? collegeData.features : (collegeData.features ? collegeData.features.split(',').map(s => s.trim()) : ['100% Placement Support', 'Live Online Classes']),
    categoryTags: Array.isArray(collegeData.categoryTags) ? collegeData.categoryTags : (collegeData.categoryTags ? collegeData.categoryTags.split(',').map(s => s.trim()) : ['students-top-choice']),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.colleges.unshift(newCollege);

  // Auto-generate programs if requested or if programs array is provided
  if (collegeData.autoCreatePrograms !== false && newCollege.programs.length > 0) {
    newCollege.programs.forEach(prog => {
      const isMaster = ['MBA', 'MCA', 'M.COM', 'MA', 'M.Sc', 'PGDM'].includes(prog);
      const isDoctorate = ['DBA', 'PHD'].includes(prog);
      const isCert = ['DATA SCIENCE', 'MARKETING', 'AI'].includes(prog);
      const isDiploma = ['PGDM', 'ADVANCED DIPLOMA'].includes(prog);

      let degreeLevel = 'Bachelors';
      if (isMaster) degreeLevel = 'Masters';
      else if (isDoctorate) degreeLevel = 'Doctorate';
      else if (isCert) degreeLevel = 'Certifications';
      else if (isDiploma) degreeLevel = 'Diploma';

      store.programs.unshift({
        _id: generateId('prog'),
        name: `${prog} at ${newCollege.name}`,
        degreeLevel,
        stream: prog,
        collegeName: newCollege.name,
        collegeSlug: newCollege.slug,
        collegeLogo: newCollege.logo,
        collegeImage: newCollege.image,
        fee: newCollege.startingFee,
        feeNum: newCollege.startingFeeNum,
        duration: newCollege.duration,
        mode: newCollege.mode,
        rating: newCollege.rating,
        recruiterRank: newCollege.nirfRank,
        specializations: ['General'],
        createdAt: new Date().toISOString()
      });
    });
  }

  writeStore(store);
  return newCollege;
}

export function updateCollege(idOrSlug, updateData) {
  const store = readStore();
  const index = store.colleges.findIndex(c => c._id === idOrSlug || c.slug === idOrSlug);
  if (index === -1) return null;

  const current = store.colleges[index];
  const updated = {
    ...current,
    ...updateData,
    _id: current._id, // preserve ID
    slug: updateData.slug ? slugify(updateData.slug) : current.slug,
    programs: Array.isArray(updateData.programs) ? updateData.programs : (typeof updateData.programs === 'string' ? updateData.programs.split(',').map(s => s.trim().toUpperCase()) : current.programs),
    approvals: Array.isArray(updateData.approvals) ? updateData.approvals : (typeof updateData.approvals === 'string' ? updateData.approvals.split(',').map(s => s.trim()) : current.approvals),
    features: Array.isArray(updateData.features) ? updateData.features : (typeof updateData.features === 'string' ? updateData.features.split(',').map(s => s.trim()) : current.features),
    categoryTags: Array.isArray(updateData.categoryTags) ? updateData.categoryTags : (typeof updateData.categoryTags === 'string' ? updateData.categoryTags.split(',').map(s => s.trim()) : current.categoryTags),
    updatedAt: new Date().toISOString()
  };

  store.colleges[index] = updated;

  // Also sync college name and slug in associated programs
  store.programs.forEach(p => {
    if (p.collegeSlug === current.slug || p.collegeName === current.name) {
      p.collegeName = updated.name;
      p.collegeSlug = updated.slug;
      if (updated.logo) p.collegeLogo = updated.logo;
      if (updated.image) p.collegeImage = updated.image;
    }
  });

  writeStore(store);
  return updated;
}

export function deleteCollege(idOrSlug, deleteAssociatedPrograms = true) {
  const store = readStore();
  const college = store.colleges.find(c => c._id === idOrSlug || c.slug === idOrSlug);
  if (!college) return false;

  store.colleges = store.colleges.filter(c => c._id !== college._id);

  if (deleteAssociatedPrograms) {
    store.programs = store.programs.filter(p => p.collegeSlug !== college.slug && p.collegeName !== college.name);
  }

  writeStore(store);
  return true;
}

// ==================== PROGRAMS / COURSES ====================

export function getPrograms({ level, stream, search, collegeSlug } = {}) {
  const store = readStore();
  let results = [...store.programs];

  if (level && level !== 'All') {
    results = results.filter(p => p.degreeLevel && p.degreeLevel.toLowerCase() === level.toLowerCase());
  }
  if (stream && stream !== 'All') {
    results = results.filter(p => p.stream && p.stream.toUpperCase() === stream.toUpperCase());
  }
  if (collegeSlug) {
    results = results.filter(p => p.collegeSlug === collegeSlug);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.stream && p.stream.toLowerCase().includes(q)) ||
      (p.collegeName && p.collegeName.toLowerCase().includes(q))
    );
  }

  return results;
}

export function getProgramById(id) {
  const store = readStore();
  return store.programs.find(p => p._id === id);
}

export function addProgram(programData) {
  const store = readStore();

  // Find college details to enrich program
  let col = null;
  if (programData.collegeSlug) {
    col = store.colleges.find(c => c.slug === programData.collegeSlug);
  } else if (programData.collegeName) {
    col = store.colleges.find(c => c.name.toLowerCase() === programData.collegeName.toLowerCase());
  }

  const collegeName = col ? col.name : (programData.collegeName || 'Top University');
  const collegeSlug = col ? col.slug : (programData.collegeSlug || slugify(collegeName));
  const collegeLogo = programData.collegeLogo || (col ? col.logo : 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80');
  const collegeImage = programData.collegeImage || (col ? col.image : 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80');

  const stream = (programData.stream || 'MBA').toUpperCase();

  const newProgram = {
    _id: generateId('prog'),
    name: programData.name || `${stream} at ${collegeName}`,
    degreeLevel: programData.degreeLevel || 'Masters',
    stream,
    collegeName,
    collegeSlug,
    collegeLogo,
    collegeImage,
    fee: programData.fee || (col ? col.startingFee : '₹ 1,50,000'),
    feeNum: Number(programData.feeNum) || (col ? col.startingFeeNum : 150000),
    duration: programData.duration || '2 Years',
    mode: programData.mode || '100% Online',
    rating: Number(programData.rating) || 4.8,
    recruiterRank: Number(programData.recruiterRank) || (col ? col.nirfRank : 50),
    specializations: Array.isArray(programData.specializations)
      ? programData.specializations
      : (programData.specializations ? programData.specializations.split(',').map(s => s.trim()) : ['General']),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.programs.unshift(newProgram);

  // If college exists and doesn't have this stream in its programs array, append it
  if (col && !col.programs.includes(stream)) {
    col.programs.push(stream);
  }

  writeStore(store);
  return newProgram;
}

export function updateProgram(id, updateData) {
  const store = readStore();
  const index = store.programs.findIndex(p => p._id === id);
  if (index === -1) return null;

  const current = store.programs[index];
  const updated = {
    ...current,
    ...updateData,
    _id: current._id,
    stream: updateData.stream ? updateData.stream.toUpperCase() : current.stream,
    specializations: Array.isArray(updateData.specializations)
      ? updateData.specializations
      : (typeof updateData.specializations === 'string' ? updateData.specializations.split(',').map(s => s.trim()) : current.specializations),
    updatedAt: new Date().toISOString()
  };

  store.programs[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteProgram(id) {
  const store = readStore();
  const program = store.programs.find(p => p._id === id);
  if (!program) return false;

  store.programs = store.programs.filter(p => p._id !== id);
  writeStore(store);
  return true;
}

// ==================== LEADS ====================

export function getLeads() {
  const store = readStore();
  return store.leads || [];
}

export function addLead(leadData) {
  const store = readStore();
  if (!store.leads) store.leads = [];

  const newLead = {
    _id: generateId('lead'),
    ...leadData,
    status: leadData.status || 'Confirmed',
    createdAt: new Date().toISOString()
  };

  store.leads.unshift(newLead);
  writeStore(store);
  return newLead;
}

export function updateLeadStatus(id, status) {
  const store = readStore();
  if (!store.leads) return null;
  const lead = store.leads.find(l => l._id === id);
  if (!lead) return null;
  lead.status = status;
  writeStore(store);
  return lead;
}

export function deleteLead(id) {
  const store = readStore();
  if (!store.leads) return false;
  store.leads = store.leads.filter(l => l._id !== id);
  writeStore(store);
  return true;
}

// ==================== STATS ====================

export function getStats() {
  const store = readStore();
  const degreeCounts = {};
  store.programs.forEach(p => {
    const lvl = p.degreeLevel || 'Other';
    degreeCounts[lvl] = (degreeCounts[lvl] || 0) + 1;
  });

  return {
    totalColleges: store.colleges.length,
    totalPrograms: store.programs.length,
    totalLeads: (store.leads || []).length,
    degreeCounts,
    recentColleges: store.colleges.slice(0, 5),
    recentPrograms: store.programs.slice(0, 5),
    recentLeads: (store.leads || []).slice(0, 5)
  };
}

export function resetToSeed() {
  const initialColleges = seedColleges.map((c) => ({
    _id: generateId('col'),
    ...c,
    slug: c.slug || slugify(c.name),
    createdAt: new Date().toISOString()
  }));

  const initialPrograms = buildInitialPrograms(initialColleges);

  const freshStore = {
    colleges: initialColleges,
    programs: initialPrograms,
    leads: []
  };

  writeStore(freshStore);
  return freshStore;
}

// Ensure store.json exists on load
readStore();

