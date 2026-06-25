export default function ApplicationHero() {
  return (
    <section className="bg-[#0B355E] text-white">
      <div className="max-w-[1184px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14">
        <div className="flex items-center gap-3 mb-7 flex-wrap">
          <div className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="20" fill="white" />
              <rect x="2" y="9" width="20" height="6" fill="white" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">Harley Health System</p>
            <p className="text-white/70 text-xs font-medium tracking-wide">Healthcare Education Division</p>
          </div>
          <span className="ml-0 sm:ml-auto inline-flex items-center gap-2 bg-white text-black/90 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-[#C6A50B]">
            <span className="w-2 h-2 rounded-full bg-[#F4B400]" /> Applications Open
          </span>
        </div>

        <h1 className="text-2xl sm:text-[30px] font-bold leading-tight max-w-2xl">
          Application for Collaborative Care Managers Admission
        </h1>
        <p className="text-white/70 text-sm mt-3">
          Global Employment Mobility &amp; Healthcare Workforce Development Program
        </p>
      </div>
    </section>
  )
}
