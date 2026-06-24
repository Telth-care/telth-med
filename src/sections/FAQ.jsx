import { useState } from 'react'

const faqs = [
  { q: 'Who is this programme for?', a: 'The programme is open to licensed physicians, physician associates, nurses, foreign medical graduates, care managers, healthcare workers, fresh life-science graduates and healthcare entrepreneurs. Specific eligibility depends on qualification level, English proficiency, and the pathway applied for.' },
  { q: 'Can I work during study?', a: 'Work rights depend on the destination country, visa type, institution rules and current immigration regulations. Candidates must follow the exact conditions stated on their visa and university guidance.' },
  { q: 'Is there a guaranteed job?', a: 'Career progression depends on eligibility, academic performance, regulatory compliance, interview outcomes, employer requirements, and available Telth or partner openings. Employment is not guaranteed at enrolment.' },
  { q: 'Can I become a network partner or franchise owner?', a: 'Network-partner and franchise opportunities are available to eligible candidates on completion of relevant training, subject to commercial agreement, due diligence, licensing, territory availability and applicable regulation.' },
  { q: 'What is the Skill India NSDC training?', a: 'For candidates in India, select Care Manager and healthcare worker pathways may be aligned with Skill India NSDC training frameworks — providing government-recognised skill certifications in care management, telehealth, IoMT devices and digital health platforms.' },
  { q: 'How does the university partnership work?', a: 'Universities partner with Telth-U MedPass through a formal MoU. Partner universities gain access to the Telth ecosystem for student placements, industry exposure and graduate-to-career pathways. All student engagement is governed by applicable regulations and institutional policies.' },
]

function Item({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border-b border-line py-1">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between text-left py-4 pr-8 relative font-serif font-semibold text-ink text-[1.02rem] hover:text-brass-dark transition-colors"
      >
        {q}
        <span className="absolute right-0 top-4 text-brass-dark text-xl leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pb-5 pr-7">
          <p className="text-ink-soft text-[0.92rem] m-0">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-[72px] bg-parchment">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">FAQ</p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-9">
          Important candidate questions
        </h2>
        <div className="max-w-2xl mx-auto">
          {faqs.map((f, i) => <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />)}
        </div>
      </div>
    </section>
  )
}
