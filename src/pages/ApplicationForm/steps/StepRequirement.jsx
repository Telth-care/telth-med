// StepRequirement — read-only welcome / requirement overview page.
// Shows the user every mandatory field they will encounter across all steps
// before they start filling in anything. No inputs here — just clear, friendly
// information grouped by section so nothing comes as a surprise.

import { Card } from '../ui/index.jsx'

// ─── icons ───────────────────────────────────────────────────────────────────

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
  </svg>
)

const CheckCircle = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-[#0F4C81] flex-shrink-0 mt-0.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#EF4444" stroke="none">
    <circle cx="12" cy="12" r="5" />
  </svg>
)

// ─── data ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    step: 'Step 1',
    label: 'Program & Personal Information',
    color: '#0F4C81',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    ),
    mandatory: [
      'Joining date (Sep / Jan / May intake)',
      'Program selection',
      'Recent passport-size photo (upload)',
      'First Name & Last Name (as in passport)',
      'Passport Number — or Aadhar Card / PAN (Indian applicants)',
      'Gender',
      'Age',
      'Date of Birth',
      "Student's Email Address",
      'Mobile Phone',
      'Current Mailing Address (Street, State, Postal Code, Country)',
      'City / State / Country of Birth',
      'Citizenship Status',
    ],
    optional: [
      'Middle Name',
      'Home Phone',
      "Parent's / Guardian's Email",
      'Calendly / Zoom ID',
      'Visa Type & UK Entry Date (if applicable)',
    ],
  },
  {
    step: 'Step 2',
    label: 'Emergency Contact',
    color: '#1A6B3A',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    mandatory: [
      'Full Name',
      'Phone Number',
      'Relation to student',
    ],
    optional: [
      'Additional emergency contacts (you can add more)',
    ],
  },
  {
    step: 'Step 3',
    label: 'Academic Records',
    color: '#7C3AED',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    mandatory: [
      'High School Name',
      'High School City, State / Province, Country',
      'Graduation Date',
    ],
    optional: [
      'English Proficiency Test (IELTS / OET / TOEFL) — test date & score',
      'Previous colleges / universities attended',
    ],
  },
  {
    step: 'Step 4',
    label: 'Personal Statement',
    color: '#B45309',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    mandatory: [
      'Personal Statement (typed, double-spaced)',
    ],
    optional: [],
  },
  {
    step: 'Step 5',
    label: 'Campus Security',
    color: '#DC2626',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
      </svg>
    ),
    mandatory: [
      'Criminal / military offense question (Yes / No)',
      'Academic dismissal question (Yes / No)',
      'Letter of Explanation + supporting evidence attachment — required only if you answer Yes to either question above',
    ],
    optional: [],
  },
  {
    step: 'Step 6',
    label: 'Student Agreement',
    color: '#0369A1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    mandatory: [
      'Agreement to the Student Agreement (checkbox)',
      'Date of signing',
    ],
    optional: [],
  },
  {
    step: 'Step 7',
    label: 'Required Documents (Checklist)',
    color: '#065F46',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    ),
    mandatory: [
      'Three (3) recent passport-size photos',
      'Passport Copy',
      'Two Letters of Recommendation',
      'Personal Statement (typed and double-spaced)',
      'Certified / Notarized copies of transcripts & Undergraduate Degree (in English)',
      'Certified copies of High School Diploma (in English)',
      'US$5,000.00 non-refundable Admission Enrollment & Program Registration fee(20% Advance Payment)',
    ],
    optional: [],
  },
  {
    step: 'Step 8',
    label: 'Agent Information',
    color: '#6B7280',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M15 20c0-2 1.5-3.5 4-3.5" />
      </svg>
    ),
    mandatory: [],
    optional: [
      'Agent / Company Name',
      'Agent Number',
      'Agent Contact Information',
      'Agent Email Address',
    ],
    note: 'Agent Information is entirely optional. Only complete this section if you were referred by a recruitment agent.',
  },
]

const FEE_INFO = {
  amount: 'GBP £5,000.00',
  includes: [
    'Admission Holding Fee',
    'Visa Processing & Documentation Charges',
    'Registration Fee',
  ],
}

// ─── component ───────────────────────────────────────────────────────────────

export default function StepRequirement() {
  return (
    <div className="space-y-6">

      {/* ── Section cards ──────────────────────────────────────────────────── */}
      {SECTIONS.map((sec) => (
        sec.step === 'Step 7' && (
<>
          {sec.mandatory.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#DC2626] uppercase tracking-wide mb-2">
                Required
              </p>
              <ul className="space-y-2">
                {sec.mandatory.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#0D1B2E]">
                    <StarIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </>
        )
      ))}


    </div>
  )
}
