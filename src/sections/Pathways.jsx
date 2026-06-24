const pathways = [
  {
    num: '01',
    title: 'Care Managers & Healthcare Workers',
    for: 'For healthcare workers and community care professionals — India only.',
    items: [
      'Skill India NSDC-aligned training',
      'Telehealth and care coordination',
      'IoMT device-enabled screening',
      'Care plan management',
      'Care Manager → Community Care Coordinator → Care-to-Home Executive',
    ],
    variant: 'default',
  },
  {
    num: '02',
    title: 'Nurses, FMGs & Physician Associates',
    for: 'For clinical support professionals seeking postgraduate or fellowship-aligned development — India & UK.',
    items: [
      'AI medical-care exposure',
      'Chronic-disease management',
      'Collaborative care management',
      'Pathway to Telth Hub roles',
      'Clinical Professional → CCM → Regional Care Manager → Franchise Partner',
    ],
    variant: 'mid',
  },
  {
    num: '03',
    title: 'Physicians & Healthcare Entrepreneurs',
    for: 'For MBBS, MBChB, MD and internationally trained doctors — India, UK & USA.',
    items: [
      'Biomarker and precision medicine',
      'Longevity and preventive medicine',
      'AI Health Hub leadership & franchise',
      'Eterna Longevity Centre participation',
      'Medical Aesthetic Centre ownership',
    ],
    variant: 'lead',
  },
]

const variantClasses = {
  default: 'border-line',
  mid:     'border-t-[3px] border-t-teal',
  lead:    'border-t-[3px] border-t-brass bg-gradient-to-b from-brass-tint to-paper',
}

export default function Pathways() {
  return (
    <section id="pathways" className="py-[72px] bg-parchment-2">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">Pathways</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-3">
          Choose the route that matches your qualification
        </h2>
        <p className="text-ink-soft text-[0.98rem] text-center max-w-xl mx-auto mb-9">
          Each pathway is subject to eligibility, university admission standards, immigration rules, professional regulation and partner availability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pathways.map(p => (
            <article
              key={p.num}
              className={`bg-paper border rounded-md shadow-card px-7 py-8 relative ${variantClasses[p.variant]}`}
            >
              <span className="absolute top-4 right-5 font-serif font-semibold text-[2.1rem] text-line leading-none">
                {p.num}
              </span>
              <h3 className="font-serif text-ink font-semibold text-[1.18rem] mt-1 mb-2">{p.title}</h3>
              <p className="text-ink-soft text-[0.88rem] mb-4">{p.for}</p>
              <ul className="list-none space-y-2">
                {p.items.map(item => (
                  <li key={item} className="relative pl-5 text-ink-soft text-[0.88rem]">
                    <span className="absolute left-0 text-brass-dark">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
