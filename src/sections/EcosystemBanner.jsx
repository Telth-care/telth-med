// EcosystemBanner.jsx - List Type Design
import { useState, useEffect, useRef } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-12 bg-gradient-to-br from-[#0B1A2E] via-[#1A2D45] to-[#0B1A2E] border-y border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/60">
              The Telth–Harley Health Ecosystem
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white/90">
            Integrated Healthcare <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ecosystem</span>
          </h3>
        </div>

        {/* List View - Desktop: 3 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-5xl mx-auto">
          {tiles.map((t, index) => (
            <div
              key={t.label}
              className={`
                group flex items-center gap-3
                border-b border-white/5 last:border-b-0
                md:border-b md:last:border-b-0
                lg:border-b lg:last:border-b-0
                px-3 py-3 hover:bg-white/5 rounded-lg
                transition-all duration-300
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              `}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Icon with circular background */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                <span>{t.icon}</span>
              </div>
              
              {/* Label */}
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 flex-1">
                {t.label}
              </span>
              
              {/* Arrow indicator */}
              <span className="text-white/20 group-hover:text-white/40 transition-colors duration-300 text-xs">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}