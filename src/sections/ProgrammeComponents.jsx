const components = [
  { index: 'A', title: 'International Education',     body: 'Access suitable postgraduate, CPD and fellowship routes through approved university and training partners across India, UK and globally.' },
  { index: 'B', title: 'Professional Fellowship',     body: 'Structured exposure to AI healthcare, biomarkers, longevity, medical aesthetics and chronic-disease care models.' },
  { index: 'C', title: 'Telth Industry Exposure',    body: 'Orientation to Telth AI Health Hubs, remote care, IoMT devices, care plans and patient-acquisition operations across the ecosystem.' },
  { index: 'D', title: 'Workforce Readiness',        body: 'Preparation for permitted work opportunities — subject to visa conditions, regulatory rules and employer requirements.' },
  { index: 'E', title: 'Network Partnership',        body: 'Selected candidates may progress toward Telth network partner, care hub, franchise or ownership opportunities.' },
  { index: 'F', title: 'Healthcare Entrepreneurship', body: 'Build the business competency to participate in future healthcare-delivery organisations — not only clinical employment.' },
]

export default function ProgrammeComponents() {
  return (
    <section className="py-[72px] bg-parchment">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">Programme components</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-9">
          What the pathway is built from
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map(c => (
            <div key={c.index} className="flex gap-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-full border border-brass flex items-center justify-center font-serif font-semibold text-brass-dark">
                {c.index}
              </div>
              <div>
                <h3 className="font-serif text-ink font-semibold text-[1rem] mb-1">{c.title}</h3>
                <p className="text-ink-soft text-[0.88rem] m-0">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
