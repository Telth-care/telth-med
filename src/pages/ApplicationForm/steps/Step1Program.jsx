import { Card, Field, TextInput, DateInput, MonthYearSelect, PillUpload, RadioCircle, CountrySelect, MultiCountrySelect } from '../ui/index.jsx'
import { PROGRAM_OPTIONS, APPLICATION_ROLE_OPTIONS, COUNTRIES } from '../formConfig.js'

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

export default function Step1Program({ data, update }) {
  const s1 = data.step1

  const set = (field) => (e) => update(`step1.${field}`, e?.target ? e.target.value : e)
  const setAddr = (field) => (e) => update(`step1.currentMailingAddress.${field}`, e.target.value)

  return (
    <div className="space-y-6">
      {/* Entering Session */}
      <Card icon={<CalendarIcon />} title="Entering Session">
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <Field label="Joining Session" required>
            <MonthYearSelect value={s1.joiningDate} onChange={set('joiningDate')} />
          </Field>
        </div>
        <Field label="Choose your Application Role" required>
          <div className="flex flex-wrap gap-3 mt-2">
            {APPLICATION_ROLE_OPTIONS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => {
                  update('step1.applicationRole', r.value)
                  // CM has no programs — clear any previously selected program
                  if (r.value === 'cm' && s1.program) update('step1.program', '')
                }}
                className={`px-4 py-2.5 rounded-2xl border text-sm font-medium transition ${
                  s1.applicationRole === r.value ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-[#F5F8FC] text-[#0D1B2E] border-[#0F4C81]/15'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </Field>

        {s1.applicationRole && s1.applicationRole !== 'cm' && (
          <Field label="Choose the program" required className="mt-6">
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mt-2">
              {PROGRAM_OPTIONS.map((p) => (
                <RadioCircle key={p} label={p} selected={s1.program === p} onSelect={() => update('step1.program', p)} />
              ))}
            </div>
          </Field>
        )}
      </Card>

      {/* Applicant Information */}
      <Card icon={<IdIcon />} title="Applicant Information">
        <div className="mb-6">
          <Field label="Upload Recent Passport Size Photo" required>
            <PillUpload
              label="Upload Recent Passport Size Photo"
              accept=".png,.jpg,.jpeg"
              sublabel="PNG, JPG, JPEG only"
              onFile={(file) => update('step1.photoUrl', file)}
            />
          </Field>
          {s1.photoUrl && <p className="text-xs text-[#0F4C81] mt-2 text-center">Selected: {s1.photoUrl.name}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="First Name" required><TextInput required placeholder="Enter first name" value={s1.firstName} onChange={set('firstName')} /></Field>
          <Field label="Last Name (as in passport)" required><TextInput required placeholder="Enter last name" value={s1.lastName} onChange={set('lastName')} /></Field>
          <Field label="Middle Name"><TextInput placeholder="Enter middle name" value={s1.middleName} onChange={set('middleName')} /></Field>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 sm:col-span-2">
            <Field label="Passport Number" required>
              <TextInput
                required
                pattern="[A-Za-z0-9]{6,12}"
                title="Enter a valid passport number (6-12 alphanumeric characters)"
                placeholder="Enter Passport Number (IND/INT)"
                value={s1.passportNumber}
                onChange={set('passportNumber')}
              />
            </Field>
            <Field label="Aadhar Card / PAN Number" hint="(for Indian Applicants)">
              <TextInput
                pattern="[A-Za-z0-9]{6,12}"
                title="Enter a valid Aadhar / PAN number"
                placeholder="Enter Aadhar Card / PAN Number"
                value={s1.aadharPanNumber}
                onChange={set('aadharPanNumber')}
              />
            </Field>
          </div>

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
          <Field label="Age" required>
            <TextInput required type="number" min="16" max="100" placeholder="Enter age" value={s1.age} onChange={set('age')} />
            {(() => {
              const ageNum = Number(s1.age)
              const dob = s1.dateOfBirth
              if (!ageNum || !dob) return null
              const birth = new Date(dob)
              const today = new Date()
              let dobAge = today.getFullYear() - birth.getFullYear()
              const m = today.getMonth() - birth.getMonth()
              if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) dobAge--
              if (Math.abs(dobAge - ageNum) > 1) {
                return (
                  <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    Age ({ageNum}) doesn't match Date of Birth — calculated age is {dobAge}
                  </p>
                )
              }
              return null
            })()}
          </Field>

          <Field label="Current Mailing Address (Number and Street)" required>
            <TextInput required placeholder="Enter current address" value={s1.currentMailingAddress.street} onChange={setAddr('street')} />
          </Field>
          <Field label="State/Province" required><TextInput required placeholder="Enter State/Province" value={s1.currentMailingAddress.state} onChange={setAddr('state')} /></Field>

          <Field label="Postal/Zip Code" required>
            <TextInput
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4,10}"
              maxLength={10}
              title="Enter a valid postal/zip code (digits only)"
              placeholder="Enter Postal/Zip Code"
              value={s1.currentMailingAddress.postalCode}
              onChange={setAddr('postalCode')}
            />
          </Field>
          <Field label="Country" required><TextInput required placeholder="Enter Country" value={s1.currentMailingAddress.country} onChange={setAddr('country')} /></Field>

          <Field label="Mobile Phone" required>
            <TextInput
              required
              type="tel"
              inputMode="tel"
              pattern="[0-9+\-\s()]{7,15}"
              title="Enter a valid phone number (7-15 digits)"
              placeholder="Enter Mobile Phone"
              value={s1.mobilePhone}
              onChange={set('mobilePhone')}
            />
          </Field>
          <Field label="Home Phone">
            <TextInput
              type="tel"
              inputMode="tel"
              pattern="[0-9+\-\s()]{7,15}"
              title="Enter a valid phone number (7-15 digits)"
              placeholder="Enter Home Phone"
              value={s1.homePhone}
              onChange={set('homePhone')}
            />
          </Field>

          <Field label="Date of Birth" required><DateInput required value={s1.dateOfBirth} onChange={set('dateOfBirth')} /></Field>
          <Field label="Student's Email Address" required>
            <TextInput
              required
              type="email"
              title="Enter a valid email address"
              placeholder="Enter Student's email address"
              value={s1.studentEmail}
              onChange={set('studentEmail')}
            />
          </Field>

          <Field label="Parent's Email Address" required>
            <TextInput
              required
              type="email"
              title="Enter a valid email address"
              placeholder="Enter Parent's email address"
              value={s1.parentEmail}
              onChange={set('parentEmail')}
            />
          </Field>
          <Field label="State & Country of Birth" required><TextInput required placeholder="Enter State & Country of birth" value={s1.cityStateCountryOfBirth} onChange={set('cityStateCountryOfBirth')} /></Field>
        </div>
      </Card>

      {/* Citizenship Status — redesigned to match the official form screenshot */}
      <Card icon={<ShieldIcon />} title="Citizenship Status for International Applicants">
        {(() => {
          const isUK = s1.primaryCountryOfCitizenship?.trim().toLowerCase() === 'united kingdom'
          return (
            <>
              {/* Primary Country of Citizenship */}
              <Field label="Primary Country of Citizenship" required>
                <div className="flex flex-col gap-2">
                  <RadioCircle
                    label="United Kingdom"
                    selected={s1.primaryCitizenshipChoice === 'UK'}
                    onSelect={() => {
                      update('step1.primaryCitizenshipChoice', 'UK')
                      update('step1.primaryCountryOfCitizenship', 'United Kingdom')
                    }}
                  />
                  <RadioCircle
                    label="Other"
                    selected={s1.primaryCitizenshipChoice === 'Other'}
                    onSelect={() => {
                      update('step1.primaryCitizenshipChoice', 'Other')
                      // Clear the auto-filled "United Kingdom" value so the user picks their actual country
                      if (s1.primaryCountryOfCitizenship === 'United Kingdom') {
                        update('step1.primaryCountryOfCitizenship', '')
                      }
                    }}
                  />
                </div>

                {/* Dynamic box — only shown when "Other" is selected */}
                {s1.primaryCitizenshipChoice === 'Other' && (
                  <div className="mt-3">
                    <CountrySelect
                      countries={COUNTRIES}
                      value={s1.primaryCountryOfCitizenship}
                      onChange={(e) => update('step1.primaryCountryOfCitizenship', e.target.value)}
                      required
                    />
                  </div>
                )}
              </Field>

              {/* Everything below is only shown for non-UK ("Other") applicants */}
              {!isUK && (
              <>
              {/* Dual/Multiple Citizenship */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-[#0D1B2E] mb-2">
                  Do you hold citizenship in any other country <span className="italic">(Dual/Multiple Citizenship)</span>?
                  <span className="text-red-500"> *</span>
                </p>
                <div className="flex flex-col gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={s1.dualCitizenship === opt}
                        onChange={() => update('step1.dualCitizenship', opt)}
                        className="w-4 h-4 rounded border-[#0F4C81] text-[#0F4C81] focus:ring-[#0F4C81]"
                      />
                      <span className="text-sm text-[#0D1B2E]">
                        {opt === 'Yes' ? 'Yes – Please specify all countries of citizenship:' : 'No'}
                      </span>
                    </label>
                  ))}
                </div>
                {s1.dualCitizenship === 'Yes' && (
                  <div className="mt-3">
                    <MultiCountrySelect
                      countries={COUNTRIES}
                      value={s1.dualCitizenshipCountries}
                      onChange={(val) => update('step1.dualCitizenshipCountries', val)}
                    />
                  </div>
                )}
              </div>

              <div className="border-t border-[#0F4C81]/10 my-5" />

              {/* Current Country of Residence */}
              <Field label="Current Country of Residence" required>
                <CountrySelect
                  countries={COUNTRIES}
                  value={s1.currentCountryOfResidence}
                  onChange={(e) => update('step1.currentCountryOfResidence', e.target.value)}
                  required
                />
              </Field>

              {/* Previously travelled to UK */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-[#0D1B2E] mb-2">
                  Have you previously travelled to or stayed in the United Kingdom?
                  <span className="text-red-500"> *</span>
                </p>
                <div className="flex flex-col gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={s1.previouslyInUK === opt}
                        onChange={() => update('step1.previouslyInUK', opt)}
                        className="w-4 h-4 rounded border-[#0F4C81] text-[#0F4C81] focus:ring-[#0F4C81]"
                      />
                      <span className="text-sm text-[#0D1B2E]">{opt}</span>
                    </label>
                  ))}
                </div>
                {s1.previouslyInUK === 'Yes' && (
                  <div className="mt-3 pl-4 border-l-2 border-[#0F4C81]/20 flex flex-col gap-3">
                    <Field label="Visa Type(s) Held" required>
                      <TextInput placeholder="Enter visa type(s) held" value={s1.ukVisaTypesHeld} onChange={set('ukVisaTypesHeld')} />
                    </Field>
                    <Field label="Duration of Stay" required>
                      <TextInput placeholder="e.g. 3 months, 1 year" value={s1.ukDurationOfStay} onChange={set('ukDurationOfStay')} />
                    </Field>
                  </div>
                )}
              </div>

              {/* Refused UK Visa */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-[#0D1B2E] mb-2">
                  Have you ever <span className="underline">been refused</span> a UK visa or entry into the UK?
                  <span className="text-red-500"> *</span>
                </p>
                <div className="flex flex-col gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={s1.refusedUKVisa === opt}
                        onChange={() => update('step1.refusedUKVisa', opt)}
                        className="w-4 h-4 rounded border-[#0F4C81] text-[#0F4C81] focus:ring-[#0F4C81]"
                      />
                      <span className="text-sm text-[#0D1B2E]">
                        {opt === 'Yes' ? 'Yes – If yes, provide details:' : 'No'}
                      </span>
                    </label>
                  ))}
                </div>
                {s1.refusedUKVisa === 'Yes' && (
                  <TextInput required className="mt-3" placeholder="Provide details of refusal" value={s1.refusedUKVisaDetails} onChange={set('refusedUKVisaDetails')} />
                )}
              </div>

              <div className="border-t border-[#0F4C81]/10 my-5" />

              {/* Currently in the UK */}
              <p className="text-sm font-semibold text-[#0D1B2E] mb-3">If currently in the UK <span className="font-normal text-[#5A6A7E]">(if applicable)</span>:</p>
              <div className="flex flex-col gap-3 pl-1">
                <Field label="Date of Most Recent UK Entry">
                  <DateInput value={s1.ukRecentEntryDate} onChange={set('ukRecentEntryDate')} />
                </Field>
                <Field label="Current UK Visa / Immigration Status">
                  <TextInput placeholder="e.g. Student Visa, Skilled Worker" value={s1.ukCurrentVisaImmigrationStatus} onChange={set('ukCurrentVisaImmigrationStatus')} />
                </Field>
                <Field label="Visa Expiry Date">
                  <DateInput value={s1.ukVisaExpiryDate} onChange={set('ukVisaExpiryDate')} />
                </Field>
              </div>
              </>
              )}
            </>
          )
        })()}
      </Card>
    </div>
  )
}