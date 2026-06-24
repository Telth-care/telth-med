import { Card, Field, YesNo, Textarea } from '../ui/index.jsx'

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
  </svg>
)

export default function Step5CampusSecurity({ data, update }) {
  const cs = data.campusSecurity
  const needsExplanation = cs.criminalConviction || cs.academicDismissal

  return (
    <Card icon={<ShieldIcon />} title="Campus Security">
      <div className="space-y-7">
        <Field label="Have you ever been convicted or pleaded guilty to any criminal or military offense, excluding minor traffic violations?" required>
          <YesNo value={cs.criminalConviction} onChange={(v) => update('campusSecurity.criminalConviction', v)} />
        </Field>

        <Field
          label="Have you ever been academically dismissed from/ declared ineligible to attend/ incurred disciplinary action by any previous institution?"
          hint="Consistent with UK Campus Security Act. If you answer “yes” to either, please attach a letter of explanation."
          required
        >
          <YesNo value={cs.academicDismissal} onChange={(v) => update('campusSecurity.academicDismissal', v)} />
        </Field>

        {needsExplanation && (
          <Field label="Letter of Explanation" required>
            <Textarea
              rows={4}
              placeholder="Please provide your letter of explanation"
              value={cs.explanationLetter}
              onChange={(e) => update('campusSecurity.explanationLetter', e.target.value)}
            />
          </Field>
        )}
      </div>
    </Card>
  )
}
