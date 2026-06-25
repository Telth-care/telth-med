// ProfessionalRoutes.tsx
import React from "react";

// Import your images (adjust paths as needed)
import physicianImg from "../assets/image-7.jpeg";
import careleaderImg from "../assets/image-6.jpeg";
import caretohomeImg from "../assets/image-5.jpeg";

const routes = [
  {
    accent: "blue",
    img: physicianImg,
    kicker: "PHYSICIANS & HEALTHCARE ENTREPRENEURS",
    title: "Physician Pathway",
    body: "For MBBS, MBChB, MD and internationally trained doctors seeking to own and operate a Telth AI Health Hub Franchise and participate in the future of healthcare ownership.",
    tags: [
      "AI Health Hub Ownership",
      "Eterna Longevity Centre",
      "Medical Aesthetic Centre",
      "Care-at-Home Network",
    ],
    avail: "India · UK",
  },
  {
    accent: "purple",
    img: careleaderImg,
    kicker: "PHYSICIAN ASSOCIATES, FMGS & NURSES",
    title: "Collaborative Care Leadership",
    body: "Join as a Collaborative Care Manager or Community Care Manager — overseeing operations and care delivery. Progress to Regional Care Manager and AI Hub Operations Manager.",
    tags: [
      "Collaborative Care Manager",
      "Care-to-Home Coordinator",
      "Chronic Disease Manager",
      "Remote Patient Monitoring",
    ],
    avail: "India · UK",
  },
  {
    accent: "green",
    img: caretohomeImg,
    kicker: "CARE MANAGERS & HEALTHCARE WORKERS",
    title: "Care-to-Home Pathway",
    body: "Join as a Care Manager and build a Care-to-Home practice within the structured Telth network. Skill India NSDC-aligned training available for eligible candidates.",
    tags: [
      "IoMT Devices",
      "Community Health",
      "Care Management",
      "Telehealth Operations",
    ],
    avail: "India only",
  },
];

const accentMap = {
  blue: {
    border: "border-t-blue-500",
    badge: "bg-blue-500 text-white",
    tag: "bg-yellow-300/40 border-yellow-400/60",
    cta: "text-yellow-600/90  hover:text-yellow-600/90 ",
  },
  purple: {
    border: "border-t-purple-500",
    badge: "bg-purple-500 text-white",
    tag: "bg-yellow-300/40 border-yellow-400/60",
    cta: "text-yellow-600/90  hover:text-yellow-600/90 ",
  },
  green: {
    border: "border-t-green-500",
    badge: "bg-green-500 text-white",
    tag: "bg-yellow-300/40 border-yellow-400/60",
    cta: "text-yellow-600/90 hover:text-yellow-600/90 ",
  },
};

export default function ProfessionalRoutes() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brass-dark font-semibold text-sm tracking-wider uppercase">
            Professional routes
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">
            Three ways into the network
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each route reflects a different professional starting point. Select the pathway that best matches your qualification and ambition.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((r) => {
            const ac = accentMap[r.accent];
            return (
              <div
                key={r.num}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={r.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Kicker */}
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {r.kicker}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {r.title}
                  </h3>
                  
                  {/* Body */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                    {r.body}
                  </p>

                  {/* Tags - Properly aligned */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className={`${ac.tag} text-xs font-small px-1 py-1 rounded-full border`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-sm font-medium text-gray-700">
                      {r.avail}
                    </span>
                    <a
                      href="#apply"
                      className={`${ac.cta} font-semibold text-sm transition-colors inline-flex items-center gap-1`}
                    >
                      Apply now →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}