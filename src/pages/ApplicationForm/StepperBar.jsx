import { STEP_META } from './formConfig.js'

export default function StepperBar({ currentStep }) {
  const total = STEP_META.length

  return (
    <div className="max-w-[1184px] mx-auto px-4 sm:px-6 md:px-8 mt-4 relative z-10 mb-6">
      <div className="overflow-x-auto -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center min-w-[560px] sm:min-w-0">
          {STEP_META.map((s, i) => {
            const idx = i + 1
            const state = idx < currentStep ? 'done' : idx === currentStep ? 'current' : 'upcoming'
            return (
              <div key={s.key} className="flex items-center flex-1 last:flex-none">
                <div
                  title={s.label}
                  className={`w-[42px] sm:w-[58px] md:w-[66px] h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition ${
                    state === 'done'
                      ? 'bg-[#39BE0C] text-white'
                      : state === 'current'
                      ? 'bg-[#0F4C81] text-white'
                      : 'bg-[#E1E1E1] text-[#939393]'
                  }`}
                >
                  {state === 'done' ? (
                    <svg width="14" height="11" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 6l5 5 9-10" />
                    </svg>
                  ) : (
                    idx
                  )}
                </div>
                {idx < total && (
                  <div className={`flex-1 h-[2px] mx-1.5 sm:mx-2 rounded-full ${idx < currentStep ? 'bg-[#39BE0C]' : 'bg-[#E1E1E1]'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="hidden md:flex justify-between mt-2 text-[11px] font-medium px-0">
        {STEP_META.map((s, i) => {
          const idx = i + 1
          return (
            <span
              key={s.key}
              className={`w-[66px] text-center leading-tight ${
                idx === currentStep ? 'text-[#0F4C81]' : idx < currentStep ? 'text-[#39BE0C]' : 'text-[#828282]'
              }`}
            >
              {s.label}
            </span>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-[#5A6A7E]">
          Step {currentStep} of {total} · <span className="font-medium text-[#0D1B2E]">{STEP_META[currentStep - 1].label}</span>
        </span>
        <span className="text-[#0F4C81] font-semibold">{STEP_META[currentStep - 1].percent}% Complete</span>
      </div>
    </div>
  )
}
