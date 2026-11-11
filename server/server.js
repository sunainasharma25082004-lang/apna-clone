import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedCounsellors, hiringPartners, preferredDegrees } from './data/seedData.js';
import { College } from './models/College.js';
import { Program } from './models/Program.js';
import { CounsellingLead } from './models/CounsellingLead.js';
import * as store from './data/storeManager.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apna_advantage';

// Initialize DB with graceful fallback
async function initDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully.');

    // Sync seed data to MongoDB if collection is empty
    const count = await College.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding MongoDB from persistent store...');
      const currentStore = store.readStore();
      if (currentStore.colleges && currentStore.colleges.length > 0) {
        await College.insertMany(currentStore.colleges);
        await Program.insertMany(currentStore.programs);
        console.log('✅ MongoDB seeded successfully.');
      }
    }
  } catch (err) {
    console.warn('⚠️ MongoDB connection could not be established. Using high-performance JSON store on disk (persistent).');
    isMongoConnected = false;
  }
}

initDatabase();

// ==================== SYSTEM & STATS ====================

// GET /api/health
app.get('/api/health', (req, res) => {
  const stats = store.getStats();
  res.json({
    status: 'online',
    appName: 'Apna Advantage Full-Stack Portal & Admin Suite',
    mongoConnected: isMongoConnected,
    storageEngine: isMongoConnected ? 'MongoDB + Persistent JSON Store' : 'Persistent File JSON Store',
    totalColleges: stats.totalColleges,
    totalPrograms: stats.totalPrograms,
    totalLeads: stats.totalLeads,
    timestamp: new Date().toISOString()
  });
});

// GET /api/admin/stats
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = store.getStats();
    res.json({ success: true, stats, mongoConnected: isMongoConnected });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/reset-seed
app.post('/api/admin/reset-seed', (req, res) => {
  try {
    const fresh = store.resetToSeed();
    res.json({
      success: true,
      message: 'Store has been reset to default initial colleges and programs.',
      stats: {
        totalColleges: fresh.colleges.length,
        totalPrograms: fresh.programs.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== COLLEGES API ====================

// GET /api/colleges (List with search, category, and stream filtering)
app.get('/api/colleges', async (req, res) => {
  try {
    const { category, search, stream } = req.query;

    if (isMongoConnected) {
      let query = {};
      if (category && category !== 'All') query.categoryTags = category;
      if (stream && stream !== 'All') query.programs = stream.toUpperCase();
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { shortName: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } }
        ];
      }
      const colleges = await College.find(query);
      if (colleges.length > 0) {
        return res.json({ success: true, count: colleges.length, data: colleges });
      }
    }

    const colleges = store.getColleges({ category, stream, search });
    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/colleges/:idOrSlug
app.get('/api/colleges/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    if (isMongoConnected) {
      const col = await College.findOne({
        $or: [{ slug: idOrSlug }, { _id: mongoose.Types.ObjectId.isValid(idOrSlug) ? idOrSlug : null }]
      });
      if (col) return res.json({ success: true, data: col });
    }

    const college = store.getCollegeByIdOrSlug(idOrSlug);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found.' });
    }
    res.json({ success: true, data: college });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/colleges (Create new college from Admin Panel)
app.post('/api/colleges', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'College name is required.' });
    }

    const newCollege = store.addCollege(req.body);

    if (isMongoConnected) {
      try {
        await College.create(newCollege);
      } catch (mErr) {
        console.warn('Could not sync college to Mongo:', mErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: `College "${newCollege.name}" has been created successfully!`,
      data: newCollege
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/colleges/:idOrSlug (Update college from Admin Panel)
app.put('/api/colleges/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const updated = store.updateCollege(idOrSlug, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'College not found to update.' });
    }

    if (isMongoConnected) {
      try {
        await College.findOneAndUpdate(
          { $or: [{ slug: idOrSlug }, { _id: mongoose.Types.ObjectId.isValid(idOrSlug) ? idOrSlug : null }] },
          { $set: updated },
          { new: true }
        );
      } catch (mErr) {
        console.warn('Could not sync college update to Mongo:', mErr.message);
      }
    }

    res.json({
      success: true,
      message: `College "${updated.name}" updated successfully!`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/colleges/:idOrSlug (Delete college from Admin Panel)
app.delete('/api/colleges/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const { deletePrograms } = req.query;
    const ok = store.deleteCollege(idOrSlug, deletePrograms !== 'false');
    if (!ok) {
      return res.status(404).json({ success: false, message: 'College not found to delete.' });
    }

    if (isMongoConnected) {
      try {
        await College.findOneAndDelete({
          $or: [{ slug: idOrSlug }, { _id: mongoose.Types.ObjectId.isValid(idOrSlug) ? idOrSlug : null }]
        });
      } catch (mErr) {
        console.warn('Could not sync delete college to Mongo:', mErr.message);
      }
    }

    res.json({
      success: true,
      message: 'College and associated programs deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== PROGRAMS / COURSES API ====================

// GET /api/programs (List with search, degree level, and stream filtering)
app.get('/api/programs', async (req, res) => {
  try {
    const { level, stream, search, collegeSlug } = req.query;

    if (isMongoConnected) {
      let query = {};
      if (level && level !== 'All') query.degreeLevel = level;
      if (stream && stream !== 'All') query.stream = stream.toUpperCase();
      if (collegeSlug) query.collegeSlug = collegeSlug;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { stream: { $regex: search, $options: 'i' } },
          { collegeName: { $regex: search, $options: 'i' } }
        ];
      }
      const progs = await Program.find(query);
      if (progs.length > 0) {
        return res.json({ success: true, count: progs.length, data: progs });
      }
    }

    const programs = store.getPrograms({ level, stream, search, collegeSlug });
    res.json({ success: true, count: programs.length, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/programs/:id
app.get('/api/programs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prog = store.getProgramById(id);
    if (!prog) return res.status(404).json({ success: false, message: 'Course/Program not found.' });
    res.json({ success: true, data: prog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/programs (Create new course from Admin Panel)
app.post('/api/programs', async (req, res) => {
  try {
    const { name, stream, degreeLevel, collegeName } = req.body;
    if (!stream || !degreeLevel) {
      return res.status(400).json({ success: false, message: 'Stream and degreeLevel are required.' });
    }

    const newProg = store.addProgram(req.body);

    if (isMongoConnected) {
      try {
        await Program.create(newProg);
      } catch (mErr) {
        console.warn('Could not sync program to Mongo:', mErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: `Course "${newProg.name}" created successfully!`,
      data: newProg
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/programs/:id (Update course from Admin Panel)
app.put('/api/programs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = store.updateProgram(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found to update.' });
    }

    if (isMongoConnected) {
      try {
        await Program.findByIdAndUpdate(id, { $set: updated }, { new: true });
      } catch (mErr) {
        console.warn('Could not sync program update to Mongo:', mErr.message);
      }
    }

    res.json({
      success: true,
      message: `Course "${updated.name}" updated successfully!`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/programs/:id (Delete course from Admin Panel)
app.delete('/api/programs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ok = store.deleteProgram(id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Course not found to delete.' });
    }

    if (isMongoConnected) {
      try {
        await Program.findByIdAndDelete(id);
      } catch (mErr) {
        console.warn('Could not sync delete program to Mongo:', mErr.message);
      }
    }

    res.json({ success: true, message: 'Course deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== OTHER SEED & UTILITY DATA ====================

app.get('/api/counsellors', (req, res) => {
  res.json({ success: true, data: seedCounsellors });
});

app.get('/api/hiring-partners', (req, res) => {
  res.json({ success: true, data: hiringPartners });
});

app.get('/api/preferred-degrees', (req, res) => {
  res.json({ success: true, data: preferredDegrees });
});

// ==================== COUNSELLING LEADS ====================

// POST /api/counselling (Lead Generation)
app.post('/api/counselling', async (req, res) => {
  try {
    const {
      name,
      fullName,
      email,
      phone,
      highestEducation,
      preferredProgram,
      stream,
      preferredCollege,
      selectedCollege,
      workExperience,
      counsellorName,
      preferredSlot,
      isPartner,
      notes
    } = req.body;

    const studentName = name || fullName;
    if (!studentName || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
    }

    const leadData = {
      name: studentName,
      email: email || `${phone}@placeholder.com`,
      phone,
      highestEducation: highestEducation || 'Undergraduate',
      preferredProgram: preferredProgram || stream || 'MBA',
      preferredCollege: preferredCollege || selectedCollege || 'Any Top University',
      workExperience: workExperience || '0-2 years',
      counsellorName: counsellorName || 'Akshitha Badiger',
      preferredSlot: preferredSlot || 'Next available slot',
      isPartner: Boolean(isPartner),
      notes: notes || '',
      status: 'Confirmed'
    };

    const savedLead = store.addLead(leadData);

    if (isMongoConnected) {
      try {
        await CounsellingLead.create(leadData);
      } catch (mErr) {
        console.warn('Could not sync lead to Mongo:', mErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Counselling session successfully booked! Our senior counsellor will call you shortly.',
      data: savedLead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/counselling (View booked leads in Admin Panel)
app.get('/api/counselling', async (req, res) => {
  try {
    if (isMongoConnected) {
      const leads = await CounsellingLead.find().sort({ createdAt: -1 });
      if (leads.length > 0) return res.json({ success: true, count: leads.length, data: leads });
    }
    const leads = store.getLeads();
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/counselling/:id (Update lead status e.g. "Contacted", "Enrolled")
app.patch('/api/counselling/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = store.updateLeadStatus(id, status);
    if (!updated) return res.status(404).json({ success: false, message: 'Lead not found.' });

    if (isMongoConnected) {
      try {
        await CounsellingLead.findByIdAndUpdate(id, { $set: { status } });
      } catch (mErr) {}
    }

    res.json({ success: true, message: 'Lead status updated.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/counselling/:id (Delete lead)
app.delete('/api/counselling/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ok = store.deleteLead(id);
    if (!ok) return res.status(404).json({ success: false, message: 'Lead not found.' });

    if (isMongoConnected) {
      try {
        await CounsellingLead.findByIdAndDelete(id);
      } catch (mErr) {}
    }

    res.json({ success: true, message: 'Lead deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/compare (Compare multiple colleges side-by-side)
app.post('/api/compare', (req, res) => {
  try {
    const { slugs } = req.body;
    if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide college slugs to compare.' });
    }

    const allColleges = store.getColleges();
    const matched = allColleges.filter(c => slugs.includes(c.slug) || slugs.includes(c._id));
    res.json({ success: true, count: matched.length, data: matched });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/eligibility (Calculate eligibility & recommended programs)
app.post('/api/eligibility', (req, res) => {
  try {
    const { qualification, experience, budget, targetRole } = req.body;

    let recommendedDegrees = [];
    let scholarshipPercentage = 15;

    if (qualification === '12th' || qualification === 'Diploma') {
      recommendedDegrees = ['BBA', 'BCA', 'B.COM'];
      scholarshipPercentage = 25;
    } else {
      recommendedDegrees = ['MBA', 'MCA', 'Executive MBA'];
      scholarshipPercentage = 30;
    }

    const allColleges = store.getColleges();
    const matchingColleges = allColleges.filter(col =>
      Array.isArray(col.programs) && col.programs.some(p => recommendedDegrees.includes(p))
    ).slice(0, 4);

    res.json({
      success: true,
      eligibilityStatus: 'Eligible with Pre-Approved Merit Grant',
      scholarshipPercentage,
      recommendedDegrees,
      topColleges: matchingColleges,
      nextStep: 'Connect with a counsellor to claim up to 30% tuition fee grant.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Apna Advantage Backend running on http://localhost:${PORT}`);
});
