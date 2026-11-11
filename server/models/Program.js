import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    degreeLevel: { type: String, required: true }, // 'Bachelors', 'Masters', 'Doctorate', 'Certifications', 'Diploma'
    stream: { type: String, required: true }, // 'BBA', 'B.COM', 'BCA', 'BA', 'MBA', 'MCA', etc.
    collegeName: { type: String, required: true },
    collegeSlug: { type: String },
    collegeLogo: { type: String },
    collegeImage: { type: String },
    fee: { type: String, required: true },
    feeNum: { type: Number, required: true },
    duration: { type: String, default: '3 Years' },
    mode: { type: String, default: '100% Online' },
    rating: { type: Number, default: 4.8 },
    recruiterRank: { type: Number }
  },
  { timestamps: true }
);

export const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
