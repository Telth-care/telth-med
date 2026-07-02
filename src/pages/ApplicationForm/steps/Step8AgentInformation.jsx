import { Card, Field, TextInput, CheckRow } from '../ui/index.jsx'

const AgentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" />
    <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M15 20c0-2 1.5-3.5 4-3.5" />
  </svg>
)

const SOURCE_OPTIONS = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'google', label: 'Google' },
]

export default function Step8AgentInformation({ data, update }) {
  const a = data.agentInformation
  const h = a.hearAboutUs

  return (
    <>
    <Card icon={<AgentIcon />} title="Agent Information">
      <p className="text-sm text-[#0D1B2E] mb-5">
        Please indicate the details of the individual or company that counseled you.
      </p>
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        <Field label="Name">
          <TextInput placeholder="Enter agent / company name" value={a.name} onChange={(e) => update('agentInformation.name', e.target.value)} />
        </Field>
        <Field label="Agent Number">
          <TextInput placeholder="Enter agent ID / number" value={a.agentNumber} onChange={(e) => update('agentInformation.agentNumber', e.target.value)} />
        </Field>
        <Field label="Contact Email Address" className="sm:col-span-2">
          <TextInput
            type="email"
            title="Enter a valid email address"
            placeholder="Enter agent's email address"
            value={a.contactInformation}
            onChange={(e) => update('agentInformation.contactInformation', e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-8 pt-6 border-t border-[#0F4C81]/10">
        <p className="text-sm font-semibold text-[#0D1B2E] mb-1">If not through an agent — how did you hear about us?</p>
        <p className="text-xs text-[#5A6A7E] mb-3">Select all that apply.</p>

        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-3">
          {SOURCE_OPTIONS.map(({ key, label }) => (
            <CheckRow
              key={key}
              label={label}
              checked={h[key]}
              onChange={(v) => update(`agentInformation.hearAboutUs.${key}`, v)}
            />
          ))}
          <CheckRow
            label="Others (specify)"
            checked={h.others}
            onChange={(v) => update('agentInformation.hearAboutUs.others', v)}
          />
        </div>

        {h.others && (
          <Field label="Please specify">
            <TextInput
              placeholder="Tell us how you heard about us"
              value={h.othersSpecify}
              onChange={(e) => update('agentInformation.hearAboutUs.othersSpecify', e.target.value)}
            />
          </Field>
        )}
      </div>
    </Card>
    </>
  )
}
