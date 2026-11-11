# Apna Advantage - India's Top Online Programs Portal (MERN Stack)

Full-stack MERN application replicating the complete **Apna Advantage** portal with pixel-perfect fidelity across all 13 sections.

---

## 🚀 Quick Start

### 1. Start the Backend API (Express + MongoDB)
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```
> **Note**: The backend connects to MongoDB if available (`mongodb://127.0.0.1:27017/apna_advantage`), and gracefully falls back to an in-memory seed store if local MongoDB is not running, ensuring 100% uptime out-of-the-box.

### 2. Start the Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
# Vite runs on http://localhost:5174
```

---

## 🎨 Implemented Features & Sections (Matching Screenshots 1 to 13)

1. **Header & Live Search (Images 1-13)**:
   - Sticky navbar with `apna advantage` logo.
   - Pill-shaped `SEARCH FOR MBA...` with real-time dropdown search across colleges and degrees.
   - Navigation links: `FREE COUNSELLING`, `ONLINE PROGRAMS`, `COMPARE COLLEGES`, `BECOME A PARTNER`.

2. **Hero Section (Image 1)**:
   - Laurel badge: `INDIA'S TOP ONLINE PROGRAMS`.
   - Serif display headline: *"Your career deserves the unfair advantage"*.
   - CTAs: `Explore programs →` and `Talk to counsellor`.
   - University partners ticker marquee.

3. **"More than just education" (Image 2)**:
   - 4 Interactive feature cards with carousel controls:
     - Explore Top Online Degrees
     - Meet Your Career Counsellor
     - Compare Top Colleges
     - Know Your Earning Potential

4. **Scenic Candidate Meadow Banner (Image 3)**:
   - Meadow landscape banner with *"Built for the top 1% candidates"*.
   - Interactive `Check eligibility →` button triggering the Scholarship Calculator.

5. **Online Programs Catalog (Image 4)**:
   - Folder tabs: `Bachelors`, `Masters`, `Doctorate`, `Certifications`, `Diploma`.
   - Filter pills: `BBA`, `B.COM`, `BCA`, `BA`, `MBA`, `MCA`, etc.
   - 2-row campus cards grid displaying fees (e.g. ₹ 1.5 Lakh), degree tags, and circular arrows.

6. **Dark Cyber Testimonial & 4 Categories (Image 5)**:
   - Dark tech perspective grid with 24/7, 1:1, and 100% stats.
   - Student video card featuring Sankaash Bharadwaj (playable in modal).
   - 4 Category Cards: `STUDENTS' TOP CHOICE`, `TOP NIRF RANKED`, `ASSURED PROGRAMS`, `BEST BUDGET`.

7. **Globally Recognised Universities (Image 6)**:
   - Arched campus cards carousel with accreditation badges (`NAAC A+`, `UK Degree`, `WES Equiv`, `Switzerland`, `NAAC A++`).

8. **Online Degrees Preferred by Recruiters (Image 7)**:
   - 3D Podium cards numbered 1 to 5 for BBA, BA, MBA, BCA, and MCA with faded background watermarks.

9. **7 Lakhs+ Hiring Partners Landscape (Image 8)**:
   - Mountain waterfalls background with 3D floating company bubbles (Google, Amazon, Tata, TCS, Paytm, Zomato, Reliance, etc.).

10. **Counsellor Walkthrough Steps 1 & 2 (Images 9 & 10)**:
    - Step 1: Video call profiles for Kajal Agarwal, Rishabh Sharma, George Philip, Akshitha Badiger with purple cursor arrow.
    - Step 2: Goal and career analysis roadmap visualizer.

11. **"Pick the right university" (Image 11)**:
    - Monochrome architectural comparison cards with fees ratings (`₹ ₹ ₹ ₹`) and 5-star ratings.

12. **"Education that drives outcomes" (Image 12)**:
    - 3 Frosted glass outcome cards with direct action triggers.

13. **Cosmic Galaxy Footer (Image 13)**:
    - Starry night sky with graduate student looking up and glowing central star.
    - Link columns, social media card, app store download buttons, and giant `advantage` watermark.

14. **Interactive Modals**:
    - **Free 1:1 Counselling Booking Modal** with counsellor selection and confetti animation.
    - **Side-by-Side College Comparator Modal** with NAAC, NIRF, Fees, and Placement matrices.
    - **Instant Scholarship Eligibility Calculator Modal** (3-step quiz).
    - **Student Story Video Modal**.
