import {
  Stethoscope,
  Syringe,
  HeartHandshake,
  GraduationCap,
  BriefcaseMedical,
} from "lucide-react";

const groups = [
  {
    icon: Stethoscope,
    title: "For Physicians & Medical Doctors",
    headerClass: "bg-brass-dark",
    iconColor: "#D4A017",
    items: [
      "Healthcare Management Programmes",
      "AI in Healthcare Programmes",
      "Biomarker Medicine Programmes",
      "Precision & Preventive Medicine Fellowships",
      "Longevity Medicine Fellowships",
      "Medical Aesthetics Programmes",
      "IoMT (Internet of Medical Things) Technology",
      "AI Health Hub Operations & Management",
    ],
  },
  {
    icon: Syringe,
    title: "For Nurses, PAs & FMGs",
    headerClass: "bg-teal",
    iconColor: "#14B8A6",
    items: [
      "Postgraduate Programmes in Health Sciences",
      "Professional Fellowships in Care Management",
      "AI in Healthcare Training",
      "Biomarker-Based Care Programmes",
      "Healthcare Management Programmes",
      "IoMT Device Training",
      "AI Health Hub Operations Training",
      "MSc Digital Health",
    ],
  },
  {
    icon: HeartHandshake,
    title: "For Care Workers & Care Managers",
    headerClass: "bg-ink",
    iconColor: "#F97316",
    items: [
      "Skill India NSDC-Aligned Training",
      "Care Management Certification",
      "Community Health & Telehealth Operations",
      "Patient Engagement & Health Screening",
      "IoMT Device Operations",
      "Care Plan Management",
      "Home Care Services Operations",
      "Digital Health Platform Training",
    ],
  },
];

const eligCards = [
  {
    icon: GraduationCap,
    title: "Postgraduate Students",
    color: "#8B5CF6",
    items: [
      "MSc Digital Health",
      "MSc Health Management",
      "MSc Public Health",
      "MSc Nursing",
      "MSc Biomedical Science",
      "MBA Healthcare Management",
      "PG Diploma Health Informatics",
    ],
  },
  {
    icon: Stethoscope,
    title: "Clinical Professionals",
    color: "#10B981",
    items: [
      "MBBS / MBChB Graduates",
      "MD / Specialist Doctors",
      "Physician Associates (PA)",
      "Foreign Medical Graduates (FMG)",
      "Registered Nurses (RN)",
      "Community Nurses",
      "Paramedics & Allied Health",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Care & Support Workers",
    color: "#F97316",
    items: [
      "Healthcare Workers",
      "Caregivers",
      "Community Health Workers",
      "Healthcare Assistants",
      "Telehealth Assistants",
      "Phlebotomy Aspirants",
      "Fresh Graduates (Life Sciences)",
    ],
  },
  {
    icon: BriefcaseMedical,
    title: "Healthcare Entrepreneurs",
    color: "#06B6D4",
    items: [
      "Licensed Physicians seeking ownership",
      "Healthcare Business Operators",
      "Clinic & Diagnostic Centre Owners",
      "Pharmacists & Health Retailers",
      "Healthcare Franchise Seekers",
      "Investors in Health Infrastructure",
    ],
  },
];

export default function Programmes() {
  return (
    <section id="programmes" className="py-[72px] bg-parchment">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">
          Academic &amp; Training Programmes
        </p>

        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-3">
          Upgrade your qualifications within the network
        </h2>

        <p className="text-ink-soft text-[0.98rem] text-center max-w-xl mx-auto mb-10">
          Access accredited postgraduate programmes, professional fellowships,
          and industry-aligned training through our university and training
          partners.
        </p>

        {/* Programme Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {groups.map((g) => {
            const Icon = g.icon;

            return (
              <div
                key={g.title}
                className="bg-paper border border-line rounded-md overflow-hidden shadow-card"
              >
                <div
                  className={`flex items-center gap-2.5 px-5 py-4 ${g.headerClass}`}
                >
                  <Icon
                    size={22}
                    style={{ color: g.iconColor }}
                    strokeWidth={2}
                  />
                  <h3 className="text-parchment font-serif font-semibold text-[0.95rem] m-0">
                    {g.title}
                  </h3>
                </div>

                <ul className="list-none p-5 space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-ink-soft text-[0.87rem]"
                    >
                      <span className="absolute left-0 text-brass-dark font-bold">
                        ›
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Eligibility */}
        <div className="bg-parchment-2 border border-line rounded-md p-10">
          <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-2 text-center">
            Who can apply
          </p>

          <h3 className="font-serif font-semibold text-[1.4rem] text-ink text-center mb-2">
            Eligibility across all programmes
          </h3>

          <p className="text-ink-soft text-[0.97rem] text-center max-w-xl mx-auto mb-7">
            The MedPass programme welcomes applications from a wide range of
            healthcare and allied-health professionals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eligCards.map((c) => {
              const Icon = c.icon;

              return (
                <div
                  key={c.title}
                  className="bg-paper border border-line rounded-md shadow-card p-5"
                >
                  <div className="mb-3">
                    <Icon
                      size={32}
                      style={{ color: c.color }}
                      strokeWidth={2}
                    />
                  </div>

                  <h4 className="font-serif font-semibold text-ink text-[0.95rem] mb-2.5">
                    {c.title}
                  </h4>

                  <ul className="list-none space-y-1.5">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="relative pl-3.5 text-ink-soft text-[0.82rem]"
                      >
                        <span className="absolute left-0 text-brass-dark font-bold">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}