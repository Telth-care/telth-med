import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ApplicationHero from './ApplicationHero.jsx'
import StepperBar from './StepperBar.jsx'
import FormFooterNav from './FormFooterNav.jsx'
import { Card, CalendlyInlineWidget } from './ui/index.jsx'

import StepRequirement from './steps/StepRequirement.jsx'
import Step1Program from './steps/Step1Program.jsx'
import Step2EmergencyContact from './steps/Step2EmergencyContact.jsx'
import Step3Academics from './steps/Step3Academics.jsx'
import Step4PersonalStatement from './steps/Step4PersonalStatement.jsx'
import Step5CampusSecurity from './steps/Step5CampusSecurity.jsx'
import Step6StudentAgreement from './steps/Step6StudentAgreement.jsx'
import Step7Checklist from './steps/Step7Checklist.jsx'
import Step8AgentInformation from './steps/Step8AgentInformation.jsx'

import { STEP_META, STEP_VALIDATORS, getInitialFormData, setPath } from './formConfig.js'

const API_URL = 'https://api.medpassedu.org/api/applications'
const CALENDLY_CREATE_LINK_URL = 'https://api.medpassed.org/api/calendly/create-link'
const TOTAL_STEPS = STEP_META.length

// Flattens the nested formData object into a FormData instance so File objects
// (photo, checklist documents, etc.) are sent as real multipart parts instead
// of being lost to JSON.stringify — this is what fixes "only name is sending".
function appendToFormData(fd, value, path) {
  if (value instanceof File) {
    fd.append(path, value, value.name)
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => appendToFormData(fd, item, `${path}[${i}]`))
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => appendToFormData(fd, v, path ? `${path}.${k}` : k))
  } else if (value !== undefined && value !== null) {
    fd.append(path, String(value))
  }
}

// Steps in their new order — Checklist first, everything else unchanged after it.
const STEPS = [
  StepRequirement,       // Step 1 — read-only requirement overview (no validation needed)
  Step1Program,          // Step 2 — Program & Personal Info
  Step2EmergencyContact, // Step 3
  Step3Academics,        // Step 4
  Step4PersonalStatement,// Step 5
  Step5CampusSecurity,   // Step 6
  Step6StudentAgreement, // Step 7
  Step7Checklist,        // Step 8 — document uploads checklist
  Step8AgentInformation, // Step 9
]

export default function ApplicationForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(getInitialFormData)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState(null) // { type: 'success' | 'error', text }
  // Post-submit Calendly booking step: null = not there yet, 'loading' | 'ready' | 'error'
  const [booking, setBooking] = useState({ stage: null, url: '', error: '' })
  // null = not answered, true = spoke to agent (skip Calendly), false = didn't speak (show Calendly)
  const [spokeToAgent, setSpokeToAgent] = useState(null)

  // ── generic state updaters, shared with every step (this is what keeps data
  //    intact when the user clicks Back/Continue — the data lives here, not
  //    inside each step component, so nothing resets between steps) ──
  const update = (path, value) => setFormData((prev) => setPath(prev, path, value))

  const updateArrayItem = (path, index, field, value) => {
    setFormData((prev) => {
      const clone = structuredClone(prev)
      const arr = path.split('.').reduce((o, k) => o[k], clone)
      arr[index][field] = value
      return clone
    })
  }

  const addArrayItem = (path, template) => {
    setFormData((prev) => {
      const clone = structuredClone(prev)
      const arr = path.split('.').reduce((o, k) => o[k], clone)
      arr.push(template)
      return clone
    })
  }

  const stepProps = { data: formData, update, updateArrayItem, addArrayItem }
  const ActiveStep = STEPS[currentStep - 1]

  const goBack = () => {
    setNotice(null)
    setCurrentStep((s) => Math.max(1, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goNext = async () => {
    if (currentStep === 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const missing = STEP_VALIDATORS[currentStep - 2]?.(formData) || []
    if (missing.length) {
      setNotice({ type: 'error', text: `Please complete before continuing: ${missing.join(', ')}.` })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (currentStep < TOTAL_STEPS) {
      setNotice(null)
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // last step → final submit
    await postApplication('submitted', { resetOnSuccess: true })
  }

  const saveDraft = async () => {
    await postApplication('draft', { resetOnSuccess: false })
  }

  async function postApplication(status, { resetOnSuccess }) {
    setSaving(true)
    setNotice(null)

    const fd = new FormData()
    appendToFormData(fd, { ...formData, status }, '')

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        // No Content-Type header on purpose — the browser sets
        // multipart/form-data with the correct boundary automatically.
        body: fd,
      })

      if (!res.ok) throw new Error(`Server responded with ${res.status}`)

      const json = await res.json().catch(() => null)

      if (resetOnSuccess) {
        const applicationId = json?.data?._id
        setNotice({ type: 'success', text: 'Application submitted successfully.' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (applicationId) {
          await fetchBookingLink(applicationId)
        } else {
          // Submitted fine, but no id came back to build a booking link with —
          // don't block the user, just skip straight to a fresh form.
          setFormData(getInitialFormData())
          setCurrentStep(1)
        }
      } else {
        setNotice({ type: 'success', text: 'Draft saved successfully.' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      setNotice({ type: 'error', text: `Could not reach the server (${API_URL}). ${err.message}` })
    } finally {
      setSaving(false)
    }
  }

  // Called right after a successful submit — exchanges the new applicationId
  // for a Calendly scheduling link, then shows it inline so the applicant can
  // book their review call before leaving the page.
  async function fetchBookingLink(applicationId) {
    setBooking({ stage: 'loading', url: '', error: '' })
    try {
      const res = await fetch(CALENDLY_CREATE_LINK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId }),
      })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const data = await res.json()
      if (!data?.bookingUrl) throw new Error('No booking link was returned')
      setBooking({ stage: 'ready', url: data.bookingUrl, error: '' })
    } catch (err) {
      setBooking({ stage: 'error', url: '', error: err.message })
    }
  }

  function startNewApplication() {
    setFormData(getInitialFormData())
    setCurrentStep(1)
    setBooking({ stage: null, url: '', error: '' })
    setSpokeToAgent(null)
    setNotice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#F3F6FA] min-h-screen">
      <ApplicationHero />
      <StepperBar currentStep={currentStep} />

      <div className="max-w-[1184px] mx-auto px-4 sm:px-6 md:px-8">
        {notice && (
          <div
            className={`mb-6 rounded-2xl px-4 py-3 text-sm font-medium ${
              notice.type === 'success' ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200'
            }`}
          >
            {notice.text}
          </div>
        )}

        {booking.stage ? (
          <Card title="Book Your Appointment">
            {booking.stage === 'loading' && (
              <p className="text-sm text-[#5A6A7E]">Setting up your scheduling link, one moment…</p>
            )}

            {(booking.stage === 'ready' || booking.stage === 'error') && (
              <>
                {/* Step 1: Ask if they already spoke to an agent */}
                {spokeToAgent === null && (
                  <div>
                    <p className="text-sm font-semibold text-[#0D1B2E] mb-4">
                      Your application has been submitted successfully. Before booking, please confirm:
                    </p>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-2xl ring-1 ring-[#0F4C81]/15 hover:ring-[#0F4C81]/30 transition">
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => setSpokeToAgent(true)}
                          className="mt-0.5 w-5 h-5 rounded border-[#0F4C81] text-[#0F4C81] focus:ring-[#0F4C81] flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#0D1B2E]">Yes, I have already spoken to an agent</p>
                          <p className="text-xs text-[#5A6A7E] mt-0.5">No need to book a Calendly call — your agent will guide you further.</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-2xl ring-1 ring-[#0F4C81]/15 hover:ring-[#0F4C81]/30 transition">
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => setSpokeToAgent(false)}
                          className="mt-0.5 w-5 h-5 rounded border-[#0F4C81] text-[#0F4C81] focus:ring-[#0F4C81] flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#0D1B2E]">No, I have not spoken to an agent yet</p>
                          <p className="text-xs text-[#5A6A7E] mt-0.5">Please book a slot below to schedule your application review call.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Already spoke to agent → skip Calendly, show done screen */}
                {spokeToAgent === true && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      <p className="text-sm font-semibold text-green-700">Application submitted — your agent will guide you on next steps.</p>
                    </div>
                    <button type="button" onClick={startNewApplication} className="mt-4 px-5 py-2.5 rounded-2xl bg-[#0F4C81] text-white text-sm font-medium">
                      Start New Application
                    </button>
                  </div>
                )}

                {/* Did not speak to agent → show Calendly */}
                {spokeToAgent === false && booking.stage === 'error' && (
                  <div>
                    <p className="text-sm text-red-700 mb-4">
                      Your application was submitted, but we couldn't set up the booking link ({booking.error}). You can pick a slot later from your confirmation email.
                    </p>
                    <button type="button" onClick={startNewApplication} className="px-5 py-2.5 rounded-2xl bg-[#0F4C81] text-white text-sm font-medium">
                      Start New Application
                    </button>
                  </div>
                )}

                {spokeToAgent === false && booking.stage === 'ready' && (
                  <>
                    <p className="text-sm text-[#0D1B2E] mb-4">
                      Please pick a slot below to schedule your application review call.
                    </p>
                    <CalendlyInlineWidget url={booking.url} />
                    <button type="button" onClick={startNewApplication} className="mt-5 px-5 py-2.5 rounded-2xl bg-[#0F4C81] text-white text-sm font-medium">
                      Start New Application
                    </button>
                  </>
                )}
              </>
            )}
          </Card>
        ) : (
          <ActiveStep {...stepProps} />
        )}
      </div>

      {!booking.stage && (
        <div className="mt-6">
          <FormFooterNav
            onBack={goBack}
            onSaveDraft={saveDraft}
            onNext={goNext}
            isFirst={currentStep === 1}
            isLast={currentStep === TOTAL_STEPS}
            saving={saving}
          />
        </div>
      )}
    </div>
  )
}
