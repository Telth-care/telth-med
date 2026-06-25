// Employers.jsx
import caredoctorImg from "../assets/image-2.jpeg"
import {
  Handshake,
  TrendingUp,
  Globe,
  Hospital,
} from "lucide-react"

const cards = [
  { icon: Handshake,  color: "#8B5CF6", title: 'Care Workforce Placement',  body: 'Place your registered care workers and support staff into structured roles within the Telth Care-at-Home and Telehealth networks — with skills upgrading built in.' },
  { icon: TrendingUp, color: "#10B981", title: 'Upskilling & CPD Pipeline', body: 'We provide access to NSDC-aligned training, IoMT device training, telehealth coordination and care management certifications to elevate your workforce value.' },
  { icon: Globe,      color: "#06B6D4", title: 'Global Mobility Pathways',  body: 'Eligible care workers can access structured pathways toward international roles in the UK and beyond — subject to visa rules, regulatory compliance and employer requirements.' },
  { icon: Hospital,   color: "#F97316", title: 'AI Hub Integration',        body: 'Connect your workforce to Telth AI Health Hubs as Care Managers, Community Health Workers or Patient Engagement Specialists.' },
]

export default function Employers() {
  return (
    <section id="employers" className="relative overflow-hidden py-[72px] bg-parchment-2">
      <img src={caredoctorImg} alt="caredoctorImg" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="relative z-10 max-w-site mx-auto px-6">
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">
          For employment agents &amp; staffing partners
        </p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-3">
          Partner with us to unlock global healthcare careers for your workforce.
        </h2>
        <p className="text-ink-soft text-[0.97rem] text-center max-w-xl mx-auto mb-9">
          Are you an employment agency, staffing firm or care workforce provider? We are open to partnering with you to provide structured employment and professional development opportunities through our AI Hub network.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {cards.map(c => {
            const Icon = c.icon // ← component ref from card
            return (
              <div key={c.title} className="bg-paper border border-line rounded-md shadow-card p-6">
                {/* Icon with per-card color */}
                <Icon size={32} style={{ color: c.color }} className="mb-3" />
                <h3 className="font-serif text-ink font-semibold text-[1rem] mb-2">{c.title}</h3>
                <p className="text-ink-soft text-[0.88rem] m-0">{c.body}</p>
              </div>
            )
          })}
        </div>

        {/* CTA bar */}
        <div className="bg-ink rounded-md px-8 py-7 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-parchment font-semibold text-[1.2rem] mb-1">We are open to partnership.</h3>
            <p className="text-parchment/65 text-[0.9rem] m-0 max-w-lg">
              If you represent an employment agency or staffing organisation and would like to explore how we can provide structured healthcare career pathways to your workforce, we would like to hear from you.
            </p>
          </div>
          <a
            href="#apply"
            onClick={() => window.activateTab?.('employer')}
            className="whitespace-nowrap bg-parchment text-ink font-semibold text-sm px-5 py-2.5 rounded hover:bg-brass-tint transition-colors"
          >
            Partner with us →
          </a>
        </div>
      </div>
    </section>
  )
}