const tiles = [
  { icon: '🏥', label: 'Telth AI Health Hubs' },
  { icon: '🧬', label: 'Eterna Longevity Centres' },
  { icon: '✨', label: 'Medical Aesthetic Centres' },
  { icon: '🏠', label: 'Care-at-Home Services' },
  { icon: '📡', label: 'Telehealth Networks' },
  { icon: '📊', label: 'Remote Patient Monitoring' },
  { icon: '🔬', label: 'Biomarker-Based Healthcare' },
  { icon: '🤖', label: 'AI-Powered Care Coordination' },
  { icon: '📱', label: 'IoMT-Enabled Delivery' },
]

export default function EcosystemBanner() {
  return (
    <section className="bg-ink-700 py-6 border-b border-brass/20">
      <div className="max-w-site mx-auto px-6">
        <p className="text-brass font-bold text-[10.5px] tracking-[0.12em] uppercase text-center mb-3.5">
          The Telth–Harley Health Ecosystem
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {tiles.map(t => (
            <div
              key={t.label}
              className="flex items-center gap-2 bg-parchment/[0.07] border border-parchment/[0.14] rounded px-3 py-1.5 text-parchment/80 font-medium text-[0.8rem]"
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
