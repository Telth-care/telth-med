import caretoworldImg from "../assets/image-9.jpeg";


const items = [
  { label: 'Admissions',            body: 'Subject to university and institutional decision' },
  { label: 'Visa & work rights',    body: 'Subject to immigration rules in force' },
  { label: 'Employment',            body: 'Subject to employer requirements & vacancies' },
  { label: 'Licensure',             body: 'Subject to relevant regulator (GMC, NMC, MCI)' },
  { label: 'Partnership / Franchise', body: 'Subject to commercial agreement & due diligence' },
  { label: 'Income',                body: 'Not guaranteed or projected on this site' },
]

export default function ComplianceLedger() {
  return (
    <section id="compliance" className="relative overflow-hidden bg-ink py-14 border-t-4 border-brass">
      <img src={caretoworldImg} alt="caretoworldImg" className="absolute inset-0 w-full h-full object-cover opacity-[0.13]" />
      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex items-start gap-4 mb-5">
          <span className="w-10 h-10 rounded-full border border-brass text-brass flex items-center justify-center text-base flex-shrink-0">✓</span>
          <div>
            <p className="font-serif text-parchment font-semibold text-[1.2rem] mb-0.5">Compliance Notice</p>
            <p className="text-parchment/50 text-[0.82rem] m-0">Read in full before registering interest or making any decision</p>
          </div>
        </div>

        <p className="text-parchment/75 text-[0.9rem] leading-[1.7] max-w-3xl mb-7">
          All admissions, work rights, visa routes, employment, income and partnership opportunities referenced on this page are subject to eligibility, written agreements, university rules, immigration regulations, professional licensing and partner availability. Nothing on this page constitutes a guarantee of admission, employment, sponsorship, visa approval, licensure, income or business ownership. Nothing on this page is legal, immigration or financial advice; independent professional advice is recommended before any relocation, study or financial commitment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 border-t border-parchment/15 pt-7">
          {items.map(i => (
            <div key={i.label}>
              <span className="block text-brass font-bold text-[0.74rem] tracking-[0.04em] uppercase mb-1">{i.label}</span>
              <span className="text-parchment/65 text-[0.82rem]">{i.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
