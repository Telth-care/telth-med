import aiWorldImg from "../assets/image-4.jpeg";

const tags = [
  'AI-enabled care', 'Remote patient monitoring', 'Biomarker-based care',
  'Longevity medicine', 'Medical aesthetics', 'Care plan operations',
  'IoMT devices', 'Telehealth coordination', 'Healthcare entrepreneurship',
]

function Pill({ children }) {
  return (
    <span className="bg-paper/95 backdrop-blur-sm border border-line/70 rounded-full px-5 py-2.5 text-[0.85rem] font-semibold text-ink shadow-[0_6px_16px_rgba(15,23,42,0.10)] whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(15,23,42,0.16)] cursor-default">
      {children}
    </span>
  );
}

export default function NextDecade() {
  const leftCol = tags.filter((_, i) => i % 2 === 0);
  const rightCol = tags.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative py-[72px] bg-parchment overflow-hidden">
      {/* Full-bleed image — anchored to the right edge of the viewport, not the grid column */}
      <div className="absolute inset-y-0 right-0 w-[58%] hidden md:block">
        <img
          src={aiWorldImg}
          alt="Healthcare professional with global network overlay"
          className="absolute inset-0 w-full h-full object-cover object-right-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-parchment/30 to-parchment" />
      </div>

      <div className="relative z-10 max-w-site mx-auto px-6 gap-12 items-center">
        <div>
          <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3">
            Built for the next healthcare decade
          </p>
          <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink mb-2">
            Changing the life of the professional — one person at a time.
          </h2>
          <p className="font-serif italic text-teal text-[1.1rem] mb-3">Your training. Your career. Your global future.</p>
          <p className="text-black text-sm leading-relaxed mb-3">
            The Programme is positioned for healthcare professionals seeking advanced training, practical exposure and leadership pathways in the future healthcare economy.
          </p>
          <p className="text-black text-sm leading-relaxed">
            Across India, the UK, and the USA — the Telth-Harley Health ecosystem empowers professionals to{' '}
            <strong className="text-ink">Learn, Grow, Lead</strong> and <strong className="text-ink">Own</strong> the future of healthcare.
          </p>
        </div>

        {/* Staggered two-column pill layout */}
        <div className="flex gap-3 max-w-[460px]">
          <div className="flex flex-col gap-3">
            {leftCol.map(t => <Pill key={t}>{t}</Pill>)}
          </div>
          <div className="flex flex-col gap-3 mt-8 md:mt-10">
            {rightCol.map(t => <Pill key={t}>{t}</Pill>)}
          </div>
        </div>
      </div>
    </section>
  )
}