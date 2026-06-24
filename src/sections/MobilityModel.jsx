const steps = [
  { n: '1', title: 'Profile Review',             body: 'Qualification, English-language level, experience, financial readiness and career-goal assessment.' },
  { n: '2', title: 'Programme Matching',          body: 'Selection of a suitable postgraduate, CPD or fellowship route with a university or industry partner.' },
  { n: '3', title: 'Admission & Visa Process',   body: 'Documentation, compliance checks and application support, in line with applicable rules.' },
  { n: '4', title: 'Study & Permitted Work',     body: 'Participants may work only within the limits allowed by their visa and local regulations.' },
  { n: '5', title: 'Telth Ecosystem Progression', body: 'Eligible candidates may be considered for employment, network-partner or franchise pathways.' },
]

export default function MobilityModel() {
  return (
    <section id="model" className="py-[72px] bg-parchment-2">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">Mobility model</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-6">
          From admission to future healthcare leadership
        </h2>

        <div className="max-w-2xl mx-auto bg-paper border border-line rounded text-center px-5 py-3.5 mb-10">
          <p className="text-ink-soft text-[0.88rem] m-0">
            This model is a guided pathway, not a guarantee. Every stage depends on eligibility, performance, regulatory compliance and available partner opportunities.
          </p>
        </div>

        <ol className="max-w-2xl mx-auto list-none p-0 mb-12 relative">
          <span className="absolute left-[21px] top-1.5 bottom-1.5 w-px bg-line" />
          {steps.map(s => (
            <li key={s.n} className="flex gap-6 mb-7 last:mb-0 relative">
              <div className="w-11 h-11 rounded-full bg-ink text-parchment flex items-center justify-center font-serif font-semibold text-base flex-shrink-0 z-10">
                {s.n}
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-ink font-semibold text-[1rem] mb-1">{s.title}</h3>
                <p className="text-ink-soft text-[0.9rem] m-0">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center max-w-md mx-auto">
          <h3 className="font-serif text-ink font-semibold text-[1.35rem] mb-2">Learn. Grow. Lead. Own the future of healthcare.</h3>
          <p className="text-ink-soft text-sm mb-5">
            Designed for ambitious healthcare professionals who want global exposure and future ownership possibilities.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center justify-center bg-ink text-parchment font-semibold text-sm px-6 py-3 rounded hover:bg-brass-dark transition-colors"
          >
            Start Application Review
          </a>
        </div>
      </div>
    </section>
  )
}
