import { Card, Field, TextInput, DateInput, Select, YesNo, AddAnotherButton } from '../ui/index.jsx'
import { emptyPreviousInstitution } from '../formConfig.js'

const SchoolIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1 3 3 6 3s6-2 6-3v-5" />
  </svg>
)
const LanguageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
  </svg>
)
const InstitutionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" />
  </svg>
)

const DEGREES = ['High School Diploma', "Bachelor's Degree", "Master's Degree", 'Diploma', 'Other']
const CERTS = ['Higher Secondary Certificate', 'GCE A-Level', 'IB Diploma', 'Other']

export default function Step3Academics({ data, update, updateArrayItem, addArrayItem }) {
  const hs = data.academics.highSchool
  const et = data.academics.englishTests
  const prev = data.academics.previousInstitutions

  const setHs = (f) => (e) => update(`academics.highSchool.${f}`, e.target.value)
  const setTest = (test, f) => (v) => update(`academics.englishTests.${test}.${f}`, v)

  return (
    <div className="space-y-6">
      <Card icon={<SchoolIcon />} title="High School Information">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Name of the School" className="sm:col-span-2" required>
            <TextInput required placeholder="Enter school name" value={hs.schoolName} onChange={setHs('schoolName')} />
          </Field>
          <Field label="City" required><TextInput required placeholder="Enter City" value={hs.city} onChange={setHs('city')} /></Field>
          <Field label="State/Province" required><TextInput required placeholder="Enter State/Province" value={hs.state} onChange={setHs('state')} /></Field>
          <Field label="Country" required><TextInput required placeholder="Enter Country" value={hs.country} onChange={setHs('country')} /></Field>
          <Field label="Date Of Graduation" required><DateInput required value={hs.graduationDate} onChange={setHs('graduationDate')} /></Field>
          <Field label="Other Secondary School Completion Certificates">
            <Select value={hs.completionCertificate} onChange={setHs('completionCertificate')}>
              <option value="">Select Certificates</option>
              {CERTS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
        </div>
      </Card>

      {/* English-language proficiency — separated out of High School Information */}
      <Card icon={<LanguageIcon />} title="English Language Proficiency">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          {[
            { key: 'ielts', label: 'Have you taken IELTS test?' },
            { key: 'toefl', label: 'Or Have you taken TOEFL?' },
            { key: 'oet', label: 'Or Have you taken OET?' },
          ].map(({ key, label }) => (
            <Field key={key} label={label} hint="(Required for International Students)">
              <div className="flex flex-wrap items-center gap-4">
                <YesNo value={et[key].taken} onChange={(v) => setTest(key, 'taken')(v)} />
                {et[key].taken && (
                  <TextInput
                    className="max-w-[180px]"
                    placeholder="Indicate Grade"
                    value={et[key].grade}
                    onChange={(e) => setTest(key, 'grade')(e.target.value)}
                  />
                )}
              </div>
            </Field>
          ))}
        </div>
      </Card>

      <Card icon={<InstitutionIcon />} title="Previous Institutions / Colleges / Universities Attended">
        <div className="space-y-6">
          {prev.map((p, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-x-6 gap-y-5 pb-6 border-b border-[#0F4C81]/10 last:border-0 last:pb-0">
              <Field label="Name of the Institution">
                <TextInput placeholder="Enter institution name" value={p.institutionName} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'institutionName', e.target.value)} />
              </Field>
              <Field label="State/Country">
                <TextInput placeholder="Enter State/Country" value={p.stateCountry} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'stateCountry', e.target.value)} />
              </Field>
              <Field label="City">
                <TextInput placeholder="Enter City" value={p.city} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'city', e.target.value)} />
              </Field>
              <Field label="Degree earned">
                <Select value={p.degreeEarned} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'degreeEarned', e.target.value)}>
                  <option value="">Select Degree</option>
                  {DEGREES.map((d) => <option key={d} value={d}>{d}</option>)}
                </Select>
              </Field>
              <Field label="Dates Attended">
                <div className="flex gap-3">
                  <DateInput value={p.fromDate} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'fromDate', e.target.value)} />
                  <DateInput value={p.toDate} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'toDate', e.target.value)} />
                </div>
              </Field>
              <Field label="Credits earned">
                <TextInput type="number" placeholder="Enter credits" value={p.creditsEarned} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'creditsEarned', e.target.value)} />
              </Field>
              <Field label="Major" className="sm:col-span-2">
                <TextInput placeholder="Enter Major" value={p.major} onChange={(e) => updateArrayItem('academics.previousInstitutions', i, 'major', e.target.value)} />
              </Field>
            </div>
          ))}
          <AddAnotherButton label="Add another institution" onClick={() => addArrayItem('academics.previousInstitutions', emptyPreviousInstitution())} />
        </div>
      </Card>
    </div>
  )
}
