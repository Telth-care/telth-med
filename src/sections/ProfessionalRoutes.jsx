const routes = [
  {
    num: '1',
    accent: 'brass',
    kicker: 'Physicians & Healthcare Entrepreneurs',
    title: 'Physician Pathway',
    body: 'For MBBS, MBChB, MD and internationally trained doctors seeking to own and operate a Telth AI Health Hub Franchise and participate in the future of healthcare ownership.',
    tags: ['AI Health Hub Ownership', 'Eterna Longevity Centre', 'Medical Aesthetic Centre', 'Care-at-Home Network'],
    avail: 'India · UK',
  },
  {
    num: '2',
    accent: 'teal',
    kicker: 'Physician Associates, FMGs & Nurses',
    title: 'Collaborative Care Leadership',
    body: 'Join as a Collaborative Care Manager or Community Care Manager — overseeing operations and care delivery. Progress to Regional Care Manager and AI Hub Operations Manager.',
    tags: ['Collaborative Care Manager', 'Care-to-Home Coordinator', 'Chronic Disease Manager', 'Remote Patient Monitoring'],
    avail: 'India · UK',
  },
  {
    num: '3',
    accent: 'slate',
    kicker: 'Care Managers & Healthcare Workers',
    title: 'Care-to-Home Pathway',
    body: 'Join as a Care Manager and build a Care-to-Home practice within the structured Telth network. Skill India NSDC-aligned training available for eligible candidates.',
    tags: ['Care Management', 'Community Health', 'Telehealth Operations', 'IoMT Devices'],
    avail: 'India only',
  },
]

const accentMap = {
  brass: { border: 'border-t-brass', numBg: 'bg-brass-tint text-brass-dark' },
  teal:  { border: 'border-t-teal',  numBg: 'bg-teal-tint text-teal' },
  slate: { border: 'border-t-ink-soft', numBg: 'bg-[#EEF1F6] text-ink-soft' },
}

export default function ProfessionalRoutes() {
  return (
    <section id="routes" className="py-[72px] bg-parchment-2">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">Professional routes</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-3">
          Three ways into the network
        </h2>
        <p className="text-ink-soft text-[0.98rem] text-center max-w-xl mx-auto mb-9">
          Each route reflects a different professional starting point. Select the pathway that best matches your qualification and ambition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {routes.map(r => {
            const ac = accentMap[r.accent]
            return (
              <article
                key={r.num}
                className={`bg-paper border border-line border-t-[3px] ${ac.border} rounded-md shadow-card p-7 flex flex-col`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-base mb-3 ${ac.numBg}`}>
                  {r.num}
                </div>
                <p className="text-ink-soft font-bold text-[10.5px] tracking-[0.1em] uppercase mb-1">{r.kicker}</p>
                <h3 className="font-serif text-ink font-semibold text-[1.08rem] mb-2">{r.title}</h3>
                <p className="text-ink-soft text-[0.88rem] flex-1 mb-3">{r.body}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.tags.map(t => (
                    <span key={t} className="text-[0.74rem] font-semibold bg-parchment-2 border border-line text-ink-soft px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-teal text-[0.78rem] mb-3">Available in: <strong>{r.avail}</strong></p>
                <a href="#apply" className="text-brass-dark font-semibold text-[0.84rem] hover:text-ink transition-colors mt-auto">
                  Apply now →
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
