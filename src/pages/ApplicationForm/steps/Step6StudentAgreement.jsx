import { Card, DateInput, CheckRow } from '../ui/index.jsx'

const SignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 17l4-1 11-11a1.5 1.5 0 0 1 2 2L9 18l-6 1z" />
  </svg>
)

export default function Step6StudentAgreement({ data, update }) {
  const sa = data.studentAgreement

  return (
    <Card icon={<SignIcon />} title="Student Agreement">
      <p className="font-serif italic text-[#0D1B2E]/90 leading-relaxed mb-4 bg-[#F5F8FC] border border-[#0F4C81]/10 rounded-2xl p-4 text-sm">
        Harley Health System is committed to providing a drug–free environment. Because of those commitments
        Harley Health System expects each student to remain drug–free i.e. abstaining from the use of illegal drugs,
        alcoholic beverages, tobacco and prescription medicines. The manufacture, possession, distribution or use of
        illegal drugs, alcohol or tobacco is strictly prohibited.
      </p>
      <p className="text-sm text-[#0D1B2E] leading-relaxed mb-6">
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
          <label className="block text-sm font-medium text-[#0D1B2E] mb-1.5">Date</label>
          <DateInput required value={sa.signedDate} onChange={(e) => update('studentAgreement.signedDate', e.target.value)} />
        </div>
      </div>
    </Card>
  )
}
