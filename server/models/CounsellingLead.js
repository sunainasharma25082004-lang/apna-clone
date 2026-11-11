import mongoose from 'mongoose';

const counsellingLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    highestEducation: { type: String, default: 'Undergraduate' },
    preferredProgram: { type: String, default: 'MBA' },
    preferredCollege: { type: String, default: 'Any' },
    workExperience: { type: String, default: '0-2 years' },
    counsellorName: { type: String, default: 'Akshitha Badiger' },
    preferredSlot: { type: String, default: 'Today, 4:00 PM' },
    status: { type: String, default: 'Pending' }
  },
  { timestamps: true }
);

export const CounsellingLead = mongoose.models.CounsellingLead || mongoose.model('CounsellingLead', counsellingLeadSchema);
