export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-ink to-ink-700 text-parchment py-16 md:py-20 relative overflow-hidden">
      {/* decorative rings */}
      <span className="absolute -right-24 -top-24 w-96 h-96 border border-brass/15 rounded-full pointer-events-none" />
      <span className="absolute right-10 top-8 w-72 h-72 border border-brass/10 rounded-full pointer-events-none" />

      <div className="max-w-site mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr] gap-12 items-start">
        {/* Copy */}
        <div>
          <p className="text-brass-dark font-sans font-semibold text-[11px] tracking-[0.14em] uppercase mb-3">
            Harley Health Global Healthcare Ecosystem · India · UK · USA
          </p>
          <h1 className="font-serif font-semibold text-parchment leading-[1.08] tracking-[-0.01em] text-[clamp(2rem,4vw,3.2rem)] mb-5">
            Train globally.<br />
            Lead professionally.<br />
            <em className="text-brass-dark not-italic font-medium">Build healthcare organisations.</em>
          </h1>
          <p className="text-parchment/75 text-[1.05rem] max-w-lg mb-6">
            A structured workforce-mobility and professional-development programme for physicians, physician associates, nurses, and care-management professionals — built around accredited postgraduate education and a transparent pathway toward healthcare leadership and ownership.
          </p>
          <div className="flex items-center gap-5 mb-5 flex-wrap">
            <a
              href="#apply"
              className="bg-ink text-parchment font-semibold text-sm px-5 py-3 rounded hover:bg-brass-dark hover:-translate-y-px hover:shadow-lg transition-all"
            >
              Apply Now
            </a>
            <a href="#pathways" className="text-brass font-semibold text-sm hover:text-parchment transition-colors">
              View pathways →
            </a>
          </div>
          <div className="flex gap-2.5 mb-5 flex-wrap">
            {['🇮🇳 India', '🇬🇧 UK', '🇺🇸 USA'].map(f => (
              <span key={f} className="text-parchment/75 font-semibold text-xs border border-parchment/20 bg-parchment/[0.07] px-3 py-1 rounded-full">
                {f}
              </span>
            ))}
          </div>
          <p className="text-parchment/50 text-[0.8rem] border-t border-parchment/15 pt-3 max-w-md">
            Every stage of this programme is subject to eligibility, university admission, immigration rules, professional regulation and partner availability — full compliance notice below.
          </p>
        </div>

        {/* Panel */}
        <aside className="bg-paper text-ink rounded-md shadow-panel p-7 mt-2">
          <p className="text-teal font-bold text-[11px] tracking-[0.1em] uppercase mb-4">Programme at a glance</p>
          <ul className="grid grid-cols-2 gap-5 mb-5 list-none p-0">
            {[
              { num: '3',      label: 'Professional groups' },
              { num: '3',      label: 'Countries — India, UK, USA' },
              { num: '360°',   label: 'Care ecosystem exposure' },
              { num: 'Global', label: 'Mobility-minded design' },
            ].map(s => (
              <li key={s.label} className="border-l-2 border-brass pl-3">
                <span className="block font-serif font-semibold text-2xl text-ink">{s.num}</span>
                <span className="block text-ink-soft text-xs mt-0.5">{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-4">
            <p className="text-ink-soft text-sm mb-3">
              Delivered with Telth — a US-based health-technology platform — and Harley Health System, a UK healthcare delivery and training partner.
            </p>
            <a
              href="#apply"
              className="flex items-center justify-center w-full bg-ink text-parchment font-semibold text-sm px-4 py-3 rounded hover:bg-brass-dark transition-colors"
            >
              Register Interest →
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
