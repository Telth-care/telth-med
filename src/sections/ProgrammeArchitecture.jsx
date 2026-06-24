const steps = [
  { label: 'Healthcare Students',        sub: 'Training & part-time opportunities', accent: false },
  { label: 'Graduates & Professionals',  sub: 'Fellowship — precision, biomarkers & AI', accent: false },
  { label: 'Workforce Readiness',        sub: 'Permitted-work preparation', accent: false },
  { label: 'Network Partnership',        sub: 'Hub ownership orientation', accent: true },
]

const programs = [
  'MSc Healthcare Leadership',
  'MSc Healthcare Management',
  'MSc Healthcare Administration',
  'MSc Public Health',
  'MSc Digital Health',
  'MSc Healthcare Innovation',
  'MSc Global Healthcare Management',
  'Postgraduate Diplomas in Healthcare Leadership',
];

export default function ProgrammeArchitecture() {
  return (
    <section id="architecture" className="py-[72px] bg-parchment-2">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">Programme architecture</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-8">
          From study to network leadership
        </h2>

        {/* Flow */}
        <div className="flex flex-wrap md:flex-nowrap items-stretch justify-center mb-8">
          {steps.map((s, i) => (
            <>
              <div
                key={s.label}
                className={`flex-1 min-w-[160px] text-center py-5 px-4 rounded border shadow-card ${
                  s.accent
                    ? 'border-brass bg-brass-tint'
                    : 'border-line bg-paper'
                }`}
              >
                <span className="block font-serif font-semibold text-ink text-[0.96rem] mb-1">{s.label}</span>
                <small className="text-ink-soft text-[0.76rem] leading-snug">{s.sub}</small>
              </div>
              {i < steps.length - 1 && (
                <div key={`arr-${i}`} className="flex items-center justify-center w-10 text-brass-dark text-lg flex-shrink-0">
                  →
                </div>
              )}
            </>
          ))}
        </div>

        <p className="text-center max-w-[640px] mx-auto mb-4 text-black font-bold text-[1.02rem]">Our programmes </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-paper border border-line rounded-card p-5 text-center shadow-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-200"
            >
              <span className="block font-serif font-semibold text-ink text-[0.95rem] leading-[1.3]">
                {program}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
