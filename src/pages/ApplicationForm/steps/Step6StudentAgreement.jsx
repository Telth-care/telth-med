import { useEffect, useState } from 'react'
import { Card, DateInput, CheckRow, isFileTooLarge, fileTooLargeMessage } from '../ui/index.jsx'

const SignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 17l4-1 11-11a1.5 1.5 0 0 1 2 2L9 18l-6 1z" />
  </svg>
)
const UploadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
)

const todayISO = () => new Date().toISOString().slice(0, 10)

export default function Step6StudentAgreement({ data, update }) {
  const sa = data.studentAgreement
  const [sigError, setSigError] = useState('')

  // Default the date to today the first time this step is shown — but never
  // overwrite a date the applicant already picked/edited.
  useEffect(() => {
    if (!sa.signedDate) update('studentAgreement.signedDate', todayISO())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignature = (e) => {
    const file = e.target.files?.[0] || null
    if (isFileTooLarge(file)) {
      setSigError(fileTooLargeMessage(file))
      e.target.value = ''
      update('studentAgreement.signatureUrl', '')
      return
    }
    setSigError('')
    update('studentAgreement.signatureUrl', file || '')
  }

  const signatureName = sa.signatureUrl ? (sa.signatureUrl.name || sa.signatureUrl) : ''

  return (
    <Card icon={<SignIcon />} title="Student Agreement">
      <p className="font-serif italic text-[#0D1B2E]/90 leading-relaxed mb-4 bg-[#F5F8FC] border border-[#0F4C81]/10 rounded-2xl p-4 text-sm text-justify">
        Harley Health System is committed to providing a drug–free environment. Because of those commitments
        Harley Health System expects each student to remain drug–free i.e. abstaining from the use of illegal drugs,
        alcoholic beverages, tobacco and prescription medicines. The manufacture, possession, distribution or use of
        illegal drugs, alcohol or tobacco is strictly prohibited.
      </p>
      <p className="text-sm text-[#0D1B2E] leading-relaxed mb-6 text-justify">
        I certify that the information given in this application is true and correct to the best of my knowledge. I
        recognize that withholding or misrepresenting information may result in the cancellation of my acceptance.
        By my signature, I pledge to adhere to and respect the Principles and Regulation of Harley Health System, as
        stated in the Academic Bulletin in the Substance Abuse Policy.
      </p>

      <div className="mb-5">
        <CheckRow
          label="I have read and agree to the Student Agreement above."
          checked={sa.agreed}
          onChange={(v) => update('studentAgreement.agreed', v)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label className="block text-sm font-medium text-[#0D1B2E] mb-1.5">Signature of Applicant</label>
          <label className="flex items-center justify-between gap-2 h-[42px] px-4 rounded-2xl ring-1 ring-[#0F4C81]/15 bg-[#F5F8FC] text-sm cursor-pointer hover:ring-[#0F4C81]/30 transition">
            <span className={`truncate ${signatureName ? 'text-[#0F4C81] font-medium' : 'text-[#9AAFC4]'}`}>
              {signatureName || 'Upload E-Signature'}
            </span>
            <UploadIcon />
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleSignature}
            />
          </label>
          {sigError && <p className="text-xs text-red-600 font-medium mt-1.5">{sigError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0D1B2E] mb-1.5">Date</label>
          <DateInput value={sa.signedDate} onChange={(e) => update('studentAgreement.signedDate', e.target.value)} />
        </div>
      </div>
    </Card>
  )
}
