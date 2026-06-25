import globalImg from "../assets/image-3.jpeg";


const checklist = [
  'Employment-linked pathway for MSc Digital Health, MSc Health Management, MSc Nursing and allied programmes',
  'Live industry exposure through Telth AI Health Hubs',
  'Defined student work-rights boundaries — fully compliant',
  'Written MoU and partnership framework',
  'Ongoing regulatory alignment and due-diligence process',
  'Graduate-to-network-partner pipeline for eligible alumni',
]

export default function Universities() {
  return (
    <section id="universities" className="relative overflow-hidden py-[72px] bg-parchment">
      <img src={globalImg} alt="globalImg" className="absolute right-0 top-0 h-full w-[60%] object-cover" />
      <div className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-l from-transparent to-parchment" />
      <div className="relative z-10 max-w-site mx-auto px-6">
        {/* Two-col top */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-center mb-10">
          <div>
            <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3">For universities &amp; institutions</p>
            <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink mb-3">
              Join our Global Health Mobility Program.
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed mb-3">
              We are actively seeking universities and accredited education institutions worldwide to participate in the{' '}
              <strong className="text-ink">Telth-U Global Health Mobility Program</strong>.
            </p>
            <p className="text-ink-soft text-sm leading-relaxed mb-5">
              University partners gain access to a structured, industry-backed healthcare career pathway for their students — including permitted part-time roles in live healthcare settings, in line with applicable regulations.
            </p>
            <a
              href="#apply"
              onClick={() => window.activateTab?.('university')}
              className="inline-flex items-center border border-ink text-ink font-semibold text-sm px-5 py-2.5 rounded hover:bg-ink hover:text-parchment transition-all"
            >
              Discuss an institutional partnership
            </a>
          </div>

          <div className="bg-ink rounded-md px-7 py-7">
            <p className="text-brass font-bold text-[11px] tracking-[0.1em] uppercase mb-4">Why partner with us</p>
            <ul className="list-none space-y-3">
              {checklist.map(item => (
                <li key={item} className="relative pl-5 text-parchment/85 text-sm">
                  <span className="absolute left-0 top-2 w-2 h-2 rounded-[1px] bg-brass flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA block */}
        <div className="bg-teal-tint border border-teal rounded-md p-8">
          <div className="flex items-start gap-5">
            <span className="text-4xl flex-shrink-0 mt-1">🎓</span>
            <div>
              <h3 className="font-serif text-ink font-semibold text-[1.1rem] mb-2">
                Is your university ready to build the next generation of global healthcare professionals?
              </h3>
              <p className="text-ink-soft text-[0.9rem] mb-4">
                We are open to partnerships with universities in India, UK, USA, Europe, Middle East, Africa, and Southeast Asia. Reach out today to explore how the MedPass programme can be integrated with your curriculum.
              </p>
              <a
                href="#apply"
                onClick={() => window.activateTab?.('university')}
                className="inline-flex items-center bg-ink text-parchment font-semibold text-sm px-5 py-2.5 rounded hover:bg-brass-dark transition-colors"
              >
                Express University Interest
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
