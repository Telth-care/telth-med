import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ApplicationHero from './ApplicationHero.jsx'
import StepperBar from './StepperBar.jsx'
import FormFooterNav from './FormFooterNav.jsx'

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

const API_URL = 'https://harelybackend-production.up.railway.app/api/applications'
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

      if (resetOnSuccess) {
        setFormData(getInitialFormData())
        setCurrentStep(1)
        setNotice({ type: 'success', text: 'Application submitted successfully. The form has been reset for a new entry.' })
      } else {
        setNotice({ type: 'success', text: 'Draft saved successfully.' })
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setNotice({ type: 'error', text: `Could not reach the server (${API_URL}). ${err.message}` })
    } finally {
      setSaving(false)
    }
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

        <ActiveStep {...stepProps} />
      </div>

      <div className="mt-6">
        <FormFooterNav
          onBack={goBack}
          onSaveDraft={saveDraft}
          onNext={goNext}
          isFirst={currentStep === 2}
          isLast={currentStep === TOTAL_STEPS}
          saving={saving}
        />
      </div>
    </div>
  )
}
