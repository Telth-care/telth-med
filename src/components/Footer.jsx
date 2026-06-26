const navLinks = ['Pathways','Programmes','Journey','Mobility','Universities','Employers','Apply']
const hrefs    = ['#pathways','#programmes','#architecture','#model','#universities','#employers','#apply']

export default function Footer() {
  return (
    <footer className="bg-ink-700 text-parchment/65 pt-10">
      <div className="max-w-site mx-auto px-6 flex flex-wrap items-center justify-between gap-5 pb-7 border-b border-parchment/10">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 border border-brass rounded-full flex items-center justify-center font-serif font-semibold text-brass text-sm">TU</span>
          <div>
            <p className="font-serif text-parchment font-semibold m-0">TELTH-U MedPass</p>
            <p className="text-[0.76rem] text-parchment/50 mt-0.5 m-0">Global Healthcare Mobility Programme · India · UK · USA</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-4 text-[0.82rem]">
          {navLinks.map((l, i) => (
            <a key={l} href={hrefs[i]} className="hover:text-parchment transition-colors">{l}</a>
          ))}
        </nav>
      </div>
      <div className="max-w-site mx-auto px-6 py-5 text-[0.74rem] text-parchment/40">
        <p className="m-0 mb-2 text-parchment/55">
          Centurion House, London Road, Staines upon Thames, United Kingdom – TW1B 4AX
        </p>
        <p className="m-0 mb-1 text-parchment/55">
          Info line:{' '}
          <a href="tel:+447554469843" className="hover:text-parchment transition-colors">+44 7554 469843</a>
          {' · '}
          <a href="tel:+12345644564" className="hover:text-parchment transition-colors">+1 234 564 4564</a>
          {' · '}
          Email:{' '}
          <a href="mailto:admin@harleyhealth.com" className="hover:text-parchment transition-colors">admin@harleyhealth.com</a>
        </p>
        <p className="m-0 mb-2 text-parchment/55">
          <a href="https://harleyhealthsystem.com/" target="_blank" rel="noopener noreferrer" className="hover:text-parchment transition-colors">harleyhealthsystem.com</a>
          {' · '}
          <a href="https://www.medpassedu.org/" target="_blank" rel="noopener noreferrer" className="hover:text-parchment transition-colors">medpassedu.org</a>
        </p>
        <p className="m-0">© {new Date().getFullYear()} Telth &amp; Harley Health System. For informational purposes only — not an offer, admission, employment contract or guarantee of any outcome.</p>
      </div>
    </footer>
  )
}
