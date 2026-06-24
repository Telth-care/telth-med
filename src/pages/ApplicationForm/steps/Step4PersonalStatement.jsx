import { Card, Textarea } from '../ui/index.jsx'

const PenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
  </svg>
)

export default function Step4PersonalStatement({ data, update }) {
  return (
    <Card icon={<PenIcon />} title="Personal Statement">
      <p className="text-sm text-[#0D1B2E] mb-4 leading-relaxed">
        On a separate page, type your personal statement (double spaced). Your statement represents your
        opportunity to communicate to the Admissions Committee anything that you feel is important for the
        Committee to know about you that might not be sufficiently covered by this application. This information
        would give the Committee greater insight about the applicant&apos;s unique qualifications, experiences and
        aspirations.
      </p>
      <Textarea
        rows={8}
        required
        placeholder="Type your personal statement here…"
        value={data.personalStatement}
        onChange={(e) => update('personalStatement', e.target.value)}
      />
    </Card>
  )
}
