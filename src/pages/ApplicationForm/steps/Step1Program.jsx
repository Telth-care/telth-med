import { Card, Field, TextInput, DateInput, MonthYearSelect, PillUpload, RadioCircle, YesNo } from '../ui/index.jsx'
import { PROGRAM_OPTIONS } from '../formConfig.js'

const GenderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="5" /><path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
  </svg>
)
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" />
  </svg>
)
const IdIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><path d="M14 10h6M14 14h4" />
  </svg>
)
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
  </svg>
)
const ReceiptIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2z" /><path d="M9 7h6M9 11h6" />
  </svg>
)

export default function Step1Program({ data, update }) {
  const s1 = data.step1

  const set = (field) => (e) => update(`step1.${field}`, e?.target ? e.target.value : e)
  const setAddr = (field) => (e) => update(`step1.currentMailingAddress.${field}`, e.target.value)
  const setBill = (field) => (e) => update(`step1.billingInformation.${field}`, e.target.value)

  return (
    <div className="space-y-6">
      {/* Entering Session */}
      <Card icon={<CalendarIcon />} title="Entering Session">
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <Field label="Joining Session" required>
            <MonthYearSelect value={s1.joiningDate} onChange={set('joiningDate')} />
          </Field>
        </div>
        <Field label="Choose the program" required>
          <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mt-2">
            {PROGRAM_OPTIONS.map((p) => (
              <RadioCircle key={p} label={p} selected={s1.program === p} onSelect={() => update('step1.program', p)} />
            ))}
          </div>
        </Field>
      </Card>

      {/* Applicant Information */}
      <Card icon={<IdIcon />} title="Applicant Information">
        <div className="mb-6">
          <Field label="Upload Recent Passport Size Photo" required>
            <PillUpload
              label="Upload Recent Passport Size Photo"
              onFile={(file) => update('step1.photoUrl', file)}
            />
          </Field>
          {s1.photoUrl && <p className="text-xs text-[#0F4C81] mt-2 text-center">Selected: {s1.photoUrl.name}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="First Name" required><TextInput required placeholder="Enter first name" value={s1.firstName} onChange={set('firstName')} /></Field>
          <Field label="Last Name (as in passport)" required><TextInput required placeholder="Enter last name" value={s1.lastName} onChange={set('lastName')} /></Field>
          <Field label="Middle Name"><TextInput placeholder="Enter middle name" value={s1.middleName} onChange={set('middleName')} /></Field>
          <Field label="Passport Number (IND/INT) or Aadhar Card/PAN Number" required>
            <TextInput required placeholder="Enter Passport or Aadhar number" value={s1.passportNumber} onChange={set('passportNumber')} />
          </Field>

          <Field label="Gender" required>
            <div className="flex gap-3">
              {['Male', 'Female', 'Others'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => update('step1.gender', g)}
                  className={`px-4 py-2.5 rounded-2xl border text-sm font-medium transition ${
                    s1.gender === g ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-[#F5F8FC] text-[#0D1B2E] border-[#0F4C81]/15'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Age" required><TextInput required type="number" min="0" placeholder="Enter age" value={s1.age} onChange={set('age')} /></Field>

          <Field label="Current Mailing Address (Number and Street)" required>
            <TextInput required placeholder="Enter current address" value={s1.currentMailingAddress.street} onChange={setAddr('street')} />
          </Field>
          <Field label="State/Province" required><TextInput required placeholder="Enter State/Province" value={s1.currentMailingAddress.state} onChange={setAddr('state')} /></Field>

          <Field label="Postal/Zip Code" required><TextInput required placeholder="Enter Postal/Zip Code" value={s1.currentMailingAddress.postalCode} onChange={setAddr('postalCode')} /></Field>
          <Field label="Country" required><TextInput required placeholder="Enter Country" value={s1.currentMailingAddress.country} onChange={setAddr('country')} /></Field>

          <Field label="Mobile Phone" required><TextInput required type="tel" placeholder="Enter Mobile Phone" value={s1.mobilePhone} onChange={set('mobilePhone')} /></Field>
          <Field label="Home Phone"><TextInput type="tel" placeholder="Enter Home Phone" value={s1.homePhone} onChange={set('homePhone')} /></Field>

          <Field label="Date of Birth" required><DateInput required value={s1.dateOfBirth} onChange={set('dateOfBirth')} /></Field>
          <Field label="Student's Email Address" required><TextInput required type="email" placeholder="Enter Student's email address" value={s1.studentEmail} onChange={set('studentEmail')} /></Field>

          <Field label="Parent's Email Address"><TextInput type="email" placeholder="Enter Parent's email address" value={s1.parentEmail} onChange={set('parentEmail')} /></Field>
          <Field label="City/State/Country of Birth" required><TextInput required placeholder="Enter City/State/Country of birth" value={s1.cityStateCountryOfBirth} onChange={set('cityStateCountryOfBirth')} /></Field>
        </div>
      </Card>

      {/* Citizenship Status */}
      <Card icon={<ShieldIcon />} title="Citizenship Status">
        <Field label="UK Citizens" required>
          <YesNo value={s1.citizenshipStatus === 'Yes' ? true : s1.citizenshipStatus === 'No' ? false : null} onChange={(v) => update('step1.citizenshipStatus', v ? 'Yes' : 'No')} />
        </Field>

        <p className="text-sm text-[#0D1B2E] mt-6 mb-3">Fill the below details</p>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Permanent Resident" className="sm:col-span-2">
            <TextInput placeholder="Enter permanent resident address" value={s1.permanentResident} onChange={set('permanentResident')} />
          </Field>
          <Field label="Alien Reg."><TextInput placeholder="Enter Alien Reg" value={s1.alienRegistration} onChange={set('alienRegistration')} /></Field>
          <Field label="Visa Type"><TextInput placeholder="Select visa type" value={s1.visaType} onChange={set('visaType')} /></Field>
          {s1.citizenshipStatus === 'No' && (
            <Field label="Country of Citizenship if not UK" required>
              <TextInput required placeholder="Select Country" value={s1.countryOfCitizenship} onChange={set('countryOfCitizenship')} />
            </Field>
          )}
          <Field label="Date of UK Entry"><DateInput value={s1.ukEntryDate} onChange={set('ukEntryDate')} /></Field>
        </div>
      </Card>

      {/* Billing */}
      <Card icon={<ReceiptIcon />} title="To Whom Should The Bill Be Sent">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="First Name"><TextInput placeholder="Enter first name" value={s1.billingInformation.firstName} onChange={setBill('firstName')} /></Field>
          <Field label="Last Name"><TextInput placeholder="Enter last name" value={s1.billingInformation.lastName} onChange={setBill('lastName')} /></Field>
          <Field label="Middle Name"><TextInput placeholder="Enter middle name" value={s1.billingInformation.middleName} onChange={setBill('middleName')} /></Field>
          <Field label="Mailing Address (Number and Street)">
            <TextInput placeholder="Enter address" value={s1.billingInformation.address} onChange={setBill('address')} />
          </Field>
          <Field label="City"><TextInput placeholder="Enter City" value={s1.billingInformation.city} onChange={setBill('city')} /></Field>
          <Field label="State/Province"><TextInput placeholder="Enter State/Province" value={s1.billingInformation.state} onChange={setBill('state')} /></Field>
        </div>
      </Card>
    </div>
  )
}
