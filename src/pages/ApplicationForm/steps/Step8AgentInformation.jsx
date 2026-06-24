import { Card, Field, TextInput } from '../ui/index.jsx'

const AgentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" />
    <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M15 20c0-2 1.5-3.5 4-3.5" />
  </svg>
)

export default function Step8AgentInformation({ data, update }) {
  const a = data.agentInformation

  return (
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
        <Field label="Contact Information" className="sm:col-span-2">
          <TextInput placeholder="Enter Phone Number" value={a.contactInformation} onChange={(e) => update('agentInformation.contactInformation', e.target.value)} />
        </Field>
      </div>
    </Card>
  )
}
