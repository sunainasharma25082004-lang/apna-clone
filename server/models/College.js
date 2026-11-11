import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    image: { type: String },
    naacGrade: { type: String, default: 'A+' },
    nirfRank: { type: Number },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 1250 },
    feesLevel: { type: String, default: '₹ ₹ ₹' },
    startingFee: { type: String, default: '1.5 Lakh' },
    startingFeeNum: { type: Number, default: 150000 },
    programs: [{ type: String }],
    location: { type: String },
    approvals: [{ type: String }],
    features: [{ type: String }],
    categoryTags: [{ type: String }] // 'students-top-choice', 'top-nirf-ranked', 'assured-programs', 'best-budget'
  },
  { timestamps: true }
);

export const College = mongoose.models.College || mongoose.model('College', collegeSchema);
