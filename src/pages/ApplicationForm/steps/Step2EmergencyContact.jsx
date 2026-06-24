import { Card, Field, TextInput } from '../ui/index.jsx'

const ContactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.37a2 2 0 0 1-.45 2.11L8.09 9.31a16 16 0 0 0 6.6 6.6l1.11-1.11a2 2 0 0 1 2.11-.45c.77.24 1.56.42 2.37.54A2 2 0 0 1 22 16.92z" />
  </svg>
)

export default function Step2EmergencyContact({ data, updateArrayItem }) {
  const contacts = data.emergencyContacts

  return (
    <Card icon={<ContactIcon />} title="Emergency Contact">
      <div className="space-y-6">
        {contacts.map((c, i) => (
          <div key={i} className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
            <Field label="Full Name" required>
              <TextInput required placeholder="Enter Full name" value={c.fullName} onChange={(e) => updateArrayItem('emergencyContacts', i, 'fullName', e.target.value)} />
            </Field>
            <Field label="Phone number" required>
              <TextInput required type="tel" placeholder="Enter Phone Number" value={c.phoneNumber} onChange={(e) => updateArrayItem('emergencyContacts', i, 'phoneNumber', e.target.value)} />
            </Field>
            <Field label="Relation to student" required>
              <TextInput required placeholder="Enter Relation" value={c.relation} onChange={(e) => updateArrayItem('emergencyContacts', i, 'relation', e.target.value)} />
            </Field>
          </div>
        ))}
      </div>
    </Card>
  )
}
