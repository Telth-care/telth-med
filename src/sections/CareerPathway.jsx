const steps = [
  { icon: '🩺', title: 'Clinical Professional',      sub: 'Your starting point',       highlight: false },
  { icon: '👥', title: 'Collaborative Care Manager', sub: 'CCM role within Telth',      highlight: false },
  { icon: '🗺️', title: 'Regional Care Manager',      sub: 'Lead regional operations',   highlight: false },
  { icon: '🤖', title: 'AI Hub Operations Manager',  sub: 'Manage an AI Health Hub',    highlight: false },
  { icon: '🏆', title: 'Franchise Partner',          sub: 'Own your health hub',        highlight: true  },
]

export default function CareerPathway() {
  return (
    <section className="py-[72px] bg-ink">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">Career pathway</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-parchment text-center mb-3">
          From clinical professional to franchise partner
        </h2>
        <p className="text-parchment/60 text-[0.97rem] text-center max-w-xl mx-auto mb-8">
          The structured pathway for Physician Associates, FMGs &amp; Nurses progressing through the Collaborative Care Leadership track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {steps.map((s, i) => (
            <>
              <div
                key={s.title}
                className={`flex flex-col items-center text-center rounded-md px-4 py-5 min-w-[110px] max-w-[140px] ${
                  s.highlight
                    ? 'bg-brass/20 border border-brass'
                    : 'bg-parchment/[0.07] border border-parchment/15'
                }`}
              >
                <span className="text-2xl mb-2">{s.icon}</span>
                <strong className="block font-sans font-bold text-parchment text-[0.8rem] mb-1">{s.title}</strong>
                <small className="text-parchment/50 text-[0.72rem]">{s.sub}</small>
              </div>
              {i < steps.length - 1 && (
                <span key={`arr-${i}`} className="text-brass font-bold text-xl">→</span>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
