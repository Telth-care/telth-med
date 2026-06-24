export default function FormFooterNav({ onBack, onSaveDraft, onNext, isFirst, isLast, saving }) {
  return (
    <div className="max-w-[1184px] mx-auto px-4 sm:px-6 md:px-8 pb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className="order-3 sm:order-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl ring-1 ring-[#0F4C81]/20 text-[#0F4C81] text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0F4C81]/5 transition"
      >
        <span aria-hidden>←</span> Back
      </button>

      <div className="order-1 sm:order-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={saving}
          className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl ring-1 ring-[#0F4C81]/20 text-[#5A6A7E] text-sm font-semibold hover:bg-black/5 disabled:opacity-50 transition"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={saving}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-[#0F4C81] text-white text-sm font-semibold shadow-[0_2px_4px_-2px_rgba(15,76,129,0.20),0_4px_6px_-1px_rgba(15,76,129,0.20)] hover:bg-[#0d3f6e] disabled:opacity-60 transition"
        >
          {saving ? 'Please wait…' : isLast ? 'Submit' : 'Continue'} {!saving && <span aria-hidden>→</span>}
        </button>
      </div>
    </div>
  )
}
