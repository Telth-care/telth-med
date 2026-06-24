const tags = [
  'AI-enabled care', 'Remote patient monitoring', 'Biomarker-based care',
  'Longevity medicine', 'Medical aesthetics', 'Care plan operations',
  'IoMT devices', 'Telehealth coordination', 'Healthcare entrepreneurship',
]

export default function NextDecade() {
  return (
    <section className="py-[72px] bg-parchment">
      <div className="max-w-site mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3">
            Built for the next healthcare decade
          </p>
          <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink mb-2">
            Changing the life of the professional — one person at a time.
          </h2>
          <p className="font-serif italic text-teal text-[1.1rem] mb-3">Your training. Your career. Your global future.</p>
          <p className="text-ink-soft text-sm leading-relaxed mb-3">
            The Programme is positioned for healthcare professionals seeking advanced training, practical exposure and leadership pathways in the future healthcare economy.
          </p>
          <p className="text-ink-soft text-sm leading-relaxed">
            Across India, the UK, and the USA — the Telth-Harley Health ecosystem empowers professionals to{' '}
            <strong className="text-ink">Learn, Grow, Lead</strong> and <strong className="text-ink">Own</strong> the future of healthcare.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {tags.map(t => (
            <span key={t} className="bg-paper border border-line rounded-full px-4 py-2 text-[0.84rem] font-medium text-ink">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
