import { useState, useEffect } from 'react'

const inputCls =
  'w-full bg-[#F5F8FC] border border-[#0F4C81]/15 rounded-2xl px-3.5 py-2.5 text-sm text-[#0D1B2E] placeholder-[#9AAFC4] outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81]/40 transition'

// ── Shared client-side file-size guard (mirrors the backend's 5MB limit) ──
export const MAX_FILE_SIZE_MB = 5
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.ceil(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function isFileTooLarge(file) {
  return !!file && file.size > MAX_FILE_SIZE_BYTES
}

export function fileTooLargeMessage(file) {
  return `"${file.name}" is ${formatFileSize(file.size)}. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
}

export function Card({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.10)] ring-1 ring-[#0F4C81]/10 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-[#F5F8FC] to-white border-b border-[#0F4C81]/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-[#0F4C81] font-semibold text-base">{title}</h3>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  )
}

export function Field({ label, required, hint, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[#0D1B2E] mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
          {hint && <span className="text-xs text-[#0D1B2E]/70 font-medium"> {hint}</span>}
        </label>
      )}
      {children}
    </div>
  )
}

export function TextInput({ className = '', ...props }) {
  return <input className={`${inputCls} ${className}`} {...props} />
}

export function DateInput({ className = '', ...props }) {
  return <input type="date" className={`${inputCls} ${className}`} {...props} />
}

export function Textarea({ className = '', rows = 5, ...props }) {
  return <textarea rows={rows} className={`${inputCls} resize-y ${className}`} {...props} />
}

export function Select({ children, className = '', ...props }) {
  return (
    <select className={`${inputCls} appearance-none ${className}`} {...props}>
      {children}
    </select>
  )
}

export function PillUpload({ label, sublabel, accept = '.png,.jpg,.jpeg', onFile }) {
  const [error, setError] = useState('')

  // Derive badge labels from accept string e.g. ".pdf,.png" → ['PDF','PNG']
  const badges = accept.split(',').map((s) => s.replace('.', '').toUpperCase())

  const handleChange = (e) => {
    const file = e.target.files?.[0] || null
    if (isFileTooLarge(file)) {
      setError(fileTooLargeMessage(file))
      e.target.value = ''
      onFile?.(null)
      return
    }
    setError('')
    onFile?.(file)
  }

  return (
    <div>
      <label className="flex flex-col items-center justify-center gap-2 p-8 rounded-2xl ring-2 ring-[#0F4C81]/20 cursor-pointer text-center hover:ring-[#0F4C81]/40 transition">
        <div className="w-16 h-16 rounded-2xl bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <path d="M8 6l1.5-2.5h5L16 6" />
            <circle cx="12" cy="13" r="3.2" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-[#0D1B2E]">{label}</span>
        <span className="text-xs text-[#5A6A7E]">{sublabel || 'Drag and drop or click to browse'}</span>
        <span className="flex gap-2 pt-1">
          {badges.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-[#E8EFF7] text-[#0F4C81] text-[10px] font-semibold">{t}</span>
          ))}
        </span>
        <span className="text-[10px] text-[#9AAFC4]">Max {MAX_FILE_SIZE_MB} MB</span>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {error && <p className="text-xs text-red-600 font-medium mt-2 text-center">{error}</p>}
    </div>
  )
}

export function YesNo({ value, onChange, name }) {
  return (
    <div className="flex gap-3">
      {[{ v: true, t: 'Yes' }, { v: false, t: 'No' }].map((opt) => {
        const active = value === opt.v
        return (
          <button
            type="button"
            key={opt.t}
            name={name}
            onClick={() => onChange(opt.v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-medium transition ${
              active ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-[#F5F8FC] text-[#0D1B2E] border-[#0F4C81]/15 hover:border-[#0F4C81]/30'
            }`}
          >
            <span className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center ${active ? 'bg-white border-white' : 'bg-white border-[#D2DEE9]'}`}>
              {active && <span className="w-2.5 h-2.5 rounded-sm bg-[#0F4C81]" />}
            </span>
            {opt.t}
          </button>
        )
      })}
    </div>
  )
}

export function RadioCircle({ label, selected, onSelect }) {
  return (
    <button type="button" onClick={onSelect} className="flex items-center gap-3 text-left py-1">
      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${selected ? 'border-[#0F4C81]' : 'border-[#0F4C81]/30'}`}>
        {selected && <span className="w-3 h-3 rounded-full bg-[#0F4C81]" />}
      </span>
      <span className="text-sm font-medium text-[#0D1B2E]">{label}</span>
    </button>
  )
}

export function CheckRow({ label, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer py-1.5">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-5 h-5 rounded-md border-2 border-[#0F4C81] text-[#0F4C81] focus:ring-[#0F4C81] flex-shrink-0"
      />
      <span className="text-sm text-[#0D1B2E] font-medium">{label}</span>
    </label>
  )
}

export function AddAnotherButton({ label = 'Add another', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl ring-1 ring-[#0F4C81]/15 text-[#0F4C81] text-sm font-medium hover:bg-[#0F4C81]/5 transition"
    >
      <span className="text-lg leading-none">+</span> {label}
    </button>
  )
}

// ── Calendly inline embed widget ──
// Loads Calendly's widget.js once, renders the inline scheduler for `url`,
// and reports back via onScheduled(eventUri, inviteeUri) when the visitor
// actually books a slot (Calendly fires a postMessage, not a normal DOM event).
export function CalendlyInlineWidget({ url, onScheduled, height = 700 }) {
  const containerRef = (el) => {
    if (!el || el.dataset.calendlyInit) return
    el.dataset.calendlyInit = '1'

    const init = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({ url, parentElement: el, prefill: {}, utm: {} })
      }
    }

    if (window.Calendly) {
      init()
    } else if (!document.getElementById('calendly-widget-script')) {
      const script = document.createElement('script')
      script.id = 'calendly-widget-script'
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = init
      document.body.appendChild(script)
    } else {
      document.getElementById('calendly-widget-script').addEventListener('load', init)
    }
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        const eventUri = e.data.payload?.event?.uri || ''
        const inviteeUri = e.data.payload?.invitee?.uri || ''
        onScheduled?.(eventUri, inviteeUri)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  })

  return (
    <div
      ref={containerRef}
      style={{ minWidth: '320px', height: `${height}px` }}
      className="rounded-2xl overflow-hidden ring-1 ring-[#0F4C81]/15"
    />
  )
}

// ── Single country dropdown ──
export function CountrySelect({ value, onChange, placeholder = 'Select Country', required, countries = [] }) {
  return (
    <Select value={value} onChange={onChange} required={required}>
      <option value="">{placeholder}</option>
      {countries.map((c) => <option key={c} value={c}>{c}</option>)}
    </Select>
  )
}

// ── Multi-country select ──
// Stores selection as a comma-separated string (e.g. "India, Nigeria")
// so payload shape stays a plain string, exactly as the backend expects.
export function MultiCountrySelect({ value = '', onChange, countries = [] }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Parse current string value → array
  const selected = value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []

  const toggle = (country) => {
    const next = selected.includes(country)
      ? selected.filter((c) => c !== country)
      : [...selected, country]
    onChange(next.join(', '))
    setSearch('')
  }

  const remove = (country) => {
    const next = selected.filter((c) => c !== country)
    onChange(next.join(', '))
  }

  const filtered = countries.filter(
    (c) => c.toLowerCase().includes(search.toLowerCase()) && !selected.includes(c)
  )

  return (
    <div className="relative">
      {/* Tag pills + search input */}
      <div
        onClick={() => setOpen(true)}
        className={`min-h-[44px] w-full bg-[#F5F8FC] border rounded-2xl px-3 py-2 flex flex-wrap gap-1.5 cursor-text transition ${
          open ? 'border-[#0F4C81]/40 ring-2 ring-[#0F4C81]/20' : 'border-[#0F4C81]/15'
        }`}
      >
        {selected.map((c) => (
          <span key={c} className="flex items-center gap-1 px-2 py-0.5 bg-[#0F4C81] text-white text-xs font-medium rounded-lg">
            {c}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remove(c) }}
              className="hover:text-red-300 leading-none ml-0.5"
            >×</button>
          </span>
        ))}
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder={selected.length === 0 ? 'Search and select countries…' : ''}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-[#0D1B2E] placeholder-[#9AAFC4] outline-none py-0.5"
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <>
          {/* Click-outside overlay */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full bg-white rounded-2xl shadow-lg ring-1 ring-[#0F4C81]/15 max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-xs text-[#9AAFC4] px-4 py-3">No countries found</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggle(c)}
                  className="w-full text-left text-sm px-4 py-2.5 hover:bg-[#F5F8FC] text-[#0D1B2E] transition"
                >
                  {c}
                </button>
              ))
            )}
          </div>
        </>
      )}

      {selected.length > 0 && (
        <p className="text-[10px] text-[#9AAFC4] mt-1 ml-1">
          {selected.length} countr{selected.length === 1 ? 'y' : 'ies'} selected
        </p>
      )}
    </div>
  )
}

const MONTHS = [
  'September - 2026', 'January - 2027', 'May - 2027', 
]

// Joining date as Month + Year dropdowns (intakes run month-wise, not by exact day).
// Stores/accepts a 'YYYY-MM' string so it slots into the same formData path as before.
export function MonthYearSelect({ value, onChange, yearsAhead = 3 }) {
  const [year = '', month = ''] = value ? value.split('-') : []
  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: yearsAhead + 1 }, (_, i) => thisYear + i)

  const setMonth = (m) => onChange(`${year || thisYear}-${m}`)

  return (
    <div className="grid grid-cols-2 gap-3">
      <Select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Month</option>
        {MONTHS.map((m, i) => {
          const mm = String(i + 1).padStart(2, '0')
          return <option key={mm} value={mm}>{m}</option>
        })}
      </Select>
    </div>
  )
}

// Compact upload row used in the Checklist step — one document per row,
// stores the actual File so it can be sent as multipart/form-data.
export function FileChecklistRow({ label, file, onFile, accept = '.pdf,.png,.jpg,.jpeg' }) {
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const f = e.target.files?.[0] || null
    if (isFileTooLarge(f)) {
      setError(fileTooLargeMessage(f))
      e.target.value = ''
      onFile(null)
      return
    }
    setError('')
    onFile(f)
  }

  return (
    <div className="flex flex-col gap-1.5 py-3 border-b border-[#0F4C81]/10 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        <span className="text-sm text-[#0D1B2E] font-medium pr-3">{label}</span>
        <label className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-3.5 py-2 rounded-xl ring-1 ring-[#0F4C81]/20 bg-[#F5F8FC] text-xs font-semibold text-[#0F4C81] cursor-pointer hover:ring-[#0F4C81]/40 transition max-w-full">
          {file ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="truncate max-w-[160px]">{file.name}</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Upload
            </>
          )}
          <input type="file" accept={accept} className="hidden" onChange={handleChange} />
        </label>
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  )
}


// Like FileChecklistRow, but renders `count` independent upload slots for a single
// requirement (e.g. 3 passport photos, 2 recommendation letters). Stores an array
// of Files at the same formData path so it can still be sent as multipart/form-data.
export function MultiFileChecklistRow({ label, count, files = [], onFile, accept = '.pdf,.png,.jpg,.jpeg' }) {
  const [errors, setErrors] = useState({})

  const handleChange = (i, e) => {
    const f = e.target.files?.[0] || null
    if (isFileTooLarge(f)) {
      setErrors((prev) => ({ ...prev, [i]: fileTooLargeMessage(f) }))
      e.target.value = ''
      onFile(i, null)
      return
    }
    setErrors((prev) => ({ ...prev, [i]: '' }))
    onFile(i, f)
  }

  return (
    <div className="flex flex-col gap-2.5 py-3 border-b border-[#0F4C81]/10 last:border-0">
      <span className="text-sm text-[#0D1B2E] font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }, (_, i) => {
          const file = files[i]
          return (
            <label
              key={i}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl ring-1 ring-[#0F4C81]/20 bg-[#F5F8FC] text-xs font-semibold text-[#0F4C81] cursor-pointer hover:ring-[#0F4C81]/40 transition max-w-full"
            >
              {file ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="truncate max-w-[110px]">{file.name}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  {`Upload ${i + 1}`}
                </>
              )}
              <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => handleChange(i, e)}
              />
            </label>
          )
        })}
      </div>
      {Object.entries(errors).some(([, msg]) => msg) && (
        <div className="flex flex-col gap-0.5">
          {Object.entries(errors).map(([i, msg]) => msg && (
            <p key={i} className="text-xs text-red-600 font-medium">Slot {Number(i) + 1}: {msg}</p>
          ))}
        </div>
      )}
    </div>
  )
}