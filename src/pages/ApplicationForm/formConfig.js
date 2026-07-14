// Step metadata exactly as per design screens (label + completion % shown in stepper)
// Full ISO country list used for country dropdowns / multi-select across the form
export const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina',
  'Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados',
  'Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana',
  'Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon',
  'Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros',
  'Congo (Congo-Brazzaville)','Costa Rica','Croatia','Cuba','Cyprus','Czechia',
  'Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic',
  'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini',
  'Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana',
  'Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras',
  'Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
  'Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos',
  'Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg',
  'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania',
  'Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco',
  'Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua',
  'Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau',
  'Palestine State','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia',
  'Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe',
  'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia',
  'Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain',
  'Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Tanzania',
  'Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey',
  'Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam',
  'Yemen','Zambia','Zimbabwe',
]

export const STEP_META = [
  { key: 'requirement', label: 'Requirement',           percent: 0   },
  { key: 'program',     label: 'Program',               percent: 12  },
  { key: 'emergency',   label: 'Emergency Contact',     percent: 25  },
  { key: 'academics',   label: 'Academics Records',     percent: 37  },
  { key: 'personal',    label: 'Personal Statement',    percent: 50  },
  { key: 'security',    label: 'Campus Security',       percent: 62  },
  { key: 'agreement',   label: 'Student Agreement',     percent: 75  },
  { key: 'checklist',   label: 'Documents',   percent: 87  },
  { key: 'agent',       label: 'Agent Information',     percent: 100 },
]

// Application role — drives whether the "Choose the program" section appears at all.
// CM (Care Manager) has no programs; CCM and Physician do.
export const APPLICATION_ROLE_OPTIONS = [
  { value: 'cm', label: 'Care Manager (CM)' },
  // { value: 'ccm', label: 'Collaborative Care Manager (CCM)' },
  // { value: 'physician', label: 'Physician' },
]

export const PROGRAM_OPTIONS = [
  'Fellowship Program',
  'Post Graduate Program',
  'Post Graduate Diploma Program',
  'Post Graduate Certification Program',
  'Continuous Professional Development Program',
  "Master's Program",
]

// "High School Diploma" intentionally excluded — a previous institution/college
// is post-secondary, so High School Diploma doesn't belong in this dropdown.
export const PREVIOUS_INSTITUTION_DEGREES = ["Bachelor's Degree", "Master's Degree", 'Diploma', 'Other']

export const emptyEmergencyContact = () => ({
  fullName: '', phoneNumber: '', relation: '', email: '',
  addressLine: '', city: '', state: '', pincode: '', country: '',
})

export const emptyPreviousInstitution = () => ({
  institutionName: '', city: '', stateCountry: '',
  fromDate: '', toDate: '', creditsEarned: '', major: '', degreeEarned: '',
})

// Initial / reset shape — mirrors the backend POST /api/applications payload exactly
export const getInitialFormData = () => ({
  step1: {
    joiningDate: '', applicationRole: '', program: '', photoUrl: '',
    firstName: '', lastName: '', middleName: '',
    passportNumber: '', aadharPanNumber: '', gender: '', age: '',
    currentMailingAddress: { street: '', state: '', country: '', postalCode: '' },
    mobilePhone: '', homePhone: '', dateOfBirth: '',
    studentEmail: '', parentEmail: '', cityStateCountryOfBirth: '',
    citizenshipStatus: '', permanentResident: '', alienRegistration: '',
    countryOfCitizenship: '', visaType: '', ukEntryDate: '',
    // Redesigned citizenship section fields (matches screenshot)
    primaryCitizenshipChoice: '', // 'UK' | 'Other' — drives whether the country box below shows
    primaryCountryOfCitizenship: '',
    dualCitizenship: '',          // 'Yes' | 'No'
    dualCitizenshipCountries: '',
    currentCountryOfResidence: '',
    previouslyInUK: '',           // 'Yes' | 'No'
    ukVisaTypesHeld: '',
    ukDurationOfStay: '',
    refusedUKVisa: '',            // 'Yes' | 'No'
    refusedUKVisaDetails: '',
    currentlyInUK: '',            // 'Yes' | 'No' — drives the bottom section
    ukRecentEntryDate: '',
    ukCurrentVisaImmigrationStatus: '',
    ukVisaExpiryDate: '',
    billingInformation: { firstName: '', lastName: '', middleName: '', address: '', city: '', state: '' },
    useSameAddressForBilling: false,
  },
  emergencyContacts: [emptyEmergencyContact()],
  academics: {
    highSchool: { schoolName: '', city: '', state: '', country: '', graduationDate: '', completionCertificate: '' },
    englishTests: {
      ielts: { taken: false, grade: '', date: '' },
      toefl: { taken: false, grade: '', date: '' },
      oet:   { taken: false, grade: '', date: '' },
    },
    previousInstitutions: [emptyPreviousInstitution()],
  },
  personalStatement: '',
  personalStatementMethod: 'type',
  personalStatementFileUrl: '',
  campusSecurity: { criminalConviction: false, academicDismissal: false, explanationLetter: '' },
  studentAgreement: { agreed: false, signatureUrl: '', signedDate: '' },
  checklist: {
    passportPhotos: false, registrationFeePaid: false, passportCopy: false,
    healthCertificate: false, policeClearanceCertificate: false, recommendationLetters: false,
    personalStatementSubmitted: false, transcriptsSubmitted: false,
    highSchoolDiplomaSubmitted: false, documentsConfirmed: false,
    feesDetails: false,
    // File slots used by Step7Checklist (FileChecklistRow / MultiFileChecklistRow).
    // Without this, cl.files[key] crashes the Documents step on load.
    files: {
      passportPhotos: [],
      passportCopy: null,
      recommendationLetters: [],
      personalStatementSubmitted: null,
      transcriptsSubmitted: null,
      highSchoolDiplomaSubmitted: null,
      feesDetails: null,
    },
  },
  agentInformation: {
    name: '', agentNumber: '', contactInformation: '',
    hearAboutUs: { facebook: false, instagram: false, google: false, others: false, othersSpecify: '' },
  },
  status: 'draft',
})

// Generic deep getter/setter helpers so steps can update nested fields with a dot path
export function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)
}

export function setPath(obj, path, value) {
  const clone = structuredClone(obj)
  const keys = path.split('.')
  let cur = clone
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]]
  cur[keys[keys.length - 1]] = value
  return clone
}

// ── Mandatory-field validators, one per step (in the new step order) ──
// Each returns an array of human-readable labels for anything still missing.
// Fields that are situational (e.g. "Country of Citizenship if not UK" only
// applies when the answer is "No", Agent Information may not apply to every
// applicant) are validated conditionally / left optional rather than forced.

// ── Format validators (the app has no native <form>/submit event, every button
// is type="button" + manual fetch — so HTML5 `pattern`/`type` constraints never
// actually run. These regexes are the real validation, checked in JS below). ──
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/
const PINCODE_RE = /^[0-9]{4,10}$/
const PASSPORT_RE = /^[A-Za-z0-9]{6,12}$/

// Calculate age in full years from a 'YYYY-MM-DD' string
function calcAgeFromDOB(dob) {
  if (!dob) return null
  const birth = new Date(dob)
  if (isNaN(birth)) return null
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const CHECKLIST_LABELS = {
  passportPhotos: 'Three (3) recent passport-size photos',
  passportCopy: 'Passport Copy',
  recommendationLetters: 'Two Letters of Recommendation',
  personalStatementSubmitted: 'Personal Statement (typed and double spaced)',
  transcriptsSubmitted: 'Certified or Notarized copies of transcripts & Degree',
  highSchoolDiplomaSubmitted: 'Certified copies of High School Diploma in English',
  feesDetails: 'US$5,000.00 non-refundable Admission Enrollment & Program Registration fee(20% Advance Payment)',
}

function hasFile(val) {
  // A value counts as "provided" if it's a non-null File, or a non-empty array of Files.
  if (!val) return false
  if (Array.isArray(val)) return val.filter(Boolean).length > 0
  return true
}

function validateChecklist(d) {
  const missing = []
  const files = d.checklist.files
  Object.keys(CHECKLIST_LABELS).forEach((key) => {
    if (!hasFile(files[key])) missing.push(CHECKLIST_LABELS[key])
  })
  if (!d.checklist.documentsConfirmed) missing.push('Document-confirmation checkbox')
  return missing
}

function validateProgram(d) {
  const s1 = d.step1
  const missing = []

  // ── Session & Role ──
  if (!s1.joiningDate) missing.push('Joining date')
  if (!s1.applicationRole) missing.push('Application Role (CM / CCM / Physician)')
  if (s1.applicationRole && s1.applicationRole !== 'cm' && !s1.program) missing.push('Program selection')

  // ── Photo ──
  if (!s1.photoUrl) missing.push('Passport size photo upload')

  // ── Name ──
  if (!s1.firstName) missing.push('First Name')
  if (!s1.lastName) missing.push('Last Name')

  // ── Identity ──
  if (!s1.passportNumber) missing.push('Passport / Aadhar Number')
  else if (!PASSPORT_RE.test(s1.passportNumber)) missing.push('Passport Number must be 6–12 letters/digits')
  if (s1.aadharPanNumber && !PASSPORT_RE.test(s1.aadharPanNumber)) missing.push('Aadhar/PAN Number must be 6–12 letters/digits')

  // ── Gender ──
  if (!s1.gender) missing.push('Gender')

  // ── Age — presence, range, then DOB cross-check ──
  const ageStr = String(s1.age || '').trim()
  if (!ageStr) {
    missing.push('Age')
  } else {
    const ageNum = Number(ageStr)
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
      missing.push('Age must be between 16 and 100')
    } else if (s1.dateOfBirth) {
      const dobAge = calcAgeFromDOB(s1.dateOfBirth)
      if (dobAge !== null && Math.abs(dobAge - ageNum) > 1) {
        missing.push(`Age (${ageNum}) does not match Date of Birth — calculated age is ${dobAge}`)
      }
    }
  }

  // ── Date of Birth ──
  if (!s1.dateOfBirth) {
    missing.push('Date of Birth')
  } else {
    const dobAge = calcAgeFromDOB(s1.dateOfBirth)
    if (dobAge !== null && (dobAge < 16 || dobAge > 100)) {
      missing.push('Date of Birth results in an invalid age (must be 16–100)')
    }
  }

  // ── Contact ──
  if (!s1.mobilePhone) missing.push('Mobile Phone')
  else if (!PHONE_RE.test(s1.mobilePhone)) missing.push('Mobile Phone — must be 7–15 digits')
  if (s1.homePhone && !PHONE_RE.test(s1.homePhone)) missing.push('Home Phone — must be 7–15 digits')

  // ── Emails ──
  if (!s1.studentEmail) missing.push("Student's Email Address")
  else if (!EMAIL_RE.test(s1.studentEmail)) missing.push("Student's Email Address — invalid format")
  if (!s1.parentEmail) missing.push("Parent's Email Address")
  else if (!EMAIL_RE.test(s1.parentEmail)) missing.push("Parent's Email Address — invalid format")

  // ── Address ──
  if (!s1.currentMailingAddress.street) missing.push('Current Mailing Address')
  if (!s1.currentMailingAddress.state) missing.push('State/Province')
  if (!s1.currentMailingAddress.country) missing.push('Country')
  if (!s1.currentMailingAddress.postalCode) missing.push('Postal/Zip Code')
  else if (!PINCODE_RE.test(s1.currentMailingAddress.postalCode)) missing.push('Postal/Zip Code — digits only, 4–10 characters')

  // ── Birth place ──
  if (!s1.cityStateCountryOfBirth) missing.push('State & Country of Birth')

  // ── Citizenship Status for International Applicants ──
  // Primary country is always required. If it's "United Kingdom" the sub-questions
  // are optional (UK citizens don't need to fill in the international traveller section).
  // Any other country → all sub-questions become mandatory.
  if (!s1.primaryCountryOfCitizenship) {
    missing.push('Primary Country of Citizenship')
  } else {
    const isUK = s1.primaryCountryOfCitizenship.trim().toLowerCase() === 'united kingdom'
    if (!isUK) {
      // Dual / multiple citizenship
      if (!s1.dualCitizenship) missing.push('Dual/Multiple Citizenship (Yes / No)')
      else if (s1.dualCitizenship === 'Yes' && !s1.dualCitizenshipCountries) missing.push('Dual Citizenship — please specify all countries')

      // Country of residence
      if (!s1.currentCountryOfResidence) missing.push('Current Country of Residence')

      // Previously in UK
      if (!s1.previouslyInUK) missing.push('Previously travelled to / stayed in the UK (Yes / No)')
      else if (s1.previouslyInUK === 'Yes') {
        if (!s1.ukVisaTypesHeld) missing.push('UK Visa Type(s) Held')
        if (!s1.ukDurationOfStay) missing.push('Duration of Stay in the UK')
      }

      // Refused UK visa
      if (!s1.refusedUKVisa) missing.push('UK visa refusal question (Yes / No)')
      else if (s1.refusedUKVisa === 'Yes' && !s1.refusedUKVisaDetails) missing.push('UK Visa Refusal — please provide details')
    }
  }

  return missing
}

function validateEmergencyContact(d) {
  const c = d.emergencyContacts[0]
  const missing = []
  if (!c.fullName) missing.push('Emergency Contact: Full Name')
  if (!c.phoneNumber) missing.push('Emergency Contact: Phone Number')
  else if (!PHONE_RE.test(c.phoneNumber)) missing.push('Emergency Contact: Phone Number (must be a valid phone number)')
  if (!c.relation) missing.push('Emergency Contact: Relation to student')
  if (!c.email) missing.push('Emergency Contact: Email Address')
  else if (!EMAIL_RE.test(c.email)) missing.push('Emergency Contact: Email Address (invalid format)')
  if (!c.addressLine) missing.push('Emergency Contact: Address (Door No / Street)')
  if (c.pincode && !PINCODE_RE.test(c.pincode)) missing.push('Emergency Contact: Pincode (digits only, 4-10 characters)')
  return missing
}

function validateAcademics(d) {
  const hs = d.academics.highSchool
  const missing = []

  // High school is required
  if (!hs.schoolName) missing.push('Name of the School')
  if (!hs.city) missing.push('High School City')
  if (!hs.state) missing.push('High School State/Province')
  if (!hs.country) missing.push('High School Country')
  if (!hs.graduationDate) missing.push('Date Of Graduation')

  // Previous institutions — dates must be logically ordered if both are filled
  d.academics.previousInstitutions.forEach((inst, i) => {
    const label = `Previous Institution ${i + 1}`
    if (inst.institutionName || inst.degreeEarned || inst.major) {
      // If the user started filling this institution, validate its dates
      if (inst.fromDate && inst.toDate && inst.fromDate >= inst.toDate) {
        missing.push(`${label}: "From" date must be before "To" date`)
      }
      if (inst.creditsEarned && (Number(inst.creditsEarned) < 0 || Number(inst.creditsEarned) > 999)) {
        missing.push(`${label}: Credits earned must be between 0 and 999`)
      }
    }
  })

  return missing
}

function validatePersonalStatement(d) {
  const hasTyped = !!(d.personalStatement && d.personalStatement.trim())
  const hasUpload = !!d.personalStatementFileUrl
  return hasTyped || hasUpload ? [] : ['Personal Statement (type it or upload a document)']
}

function validateCampusSecurity(d) {
  const cs = d.campusSecurity
  const missing = []
  // Values start as `false` (No by default). We treat false as a valid explicit answer.
  // Only flag if the value is still the empty string / undefined (never touched).
  const unanswered = (v) => v === '' || v === null || v === undefined
  if (unanswered(cs.criminalConviction)) missing.push('Criminal/military offense question (Yes / No)')
  if (unanswered(cs.academicDismissal)) missing.push('Academic dismissal question (Yes / No)')
  const needsLetter =
    cs.criminalConviction === true || cs.criminalConviction === 'true' ||
    cs.academicDismissal  === true || cs.academicDismissal  === 'true'
  if (needsLetter && !cs.explanationLetter) missing.push('Letter of Explanation (required when answering Yes above)')
  return missing
}

function validateStudentAgreement(d) {
  const sa = d.studentAgreement
  const missing = []
  if (!sa.agreed) missing.push('Agreement to the Student Agreement (checkbox must be checked)')
  if (!sa.signedDate) {
    missing.push('Signature Date')
  } else {
    const signed = new Date(sa.signedDate)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    if (signed > today) missing.push('Signature Date cannot be a future date')
  }
  return missing
}

// Agent Information is intentionally optional — not every applicant applies through an agent.
// (Calendly booking now happens AFTER successful submit, via the create-link API, not here.)
function validateAgent(d) {
  const missing = []
  const email = d.agentInformation?.contactInformation
  if (email && !EMAIL_RE.test(email)) missing.push("Agent's Contact Email (invalid format)")
  return missing
}

// Step 1 (Requirement overview) needs no validation — it's read-only.
// Validators index 0..7 correspond to steps 2..9 (after the user clicks Continue on step 1).
export const STEP_VALIDATORS = [
  validateProgram,          // step 2
  validateEmergencyContact, // step 3
  validateAcademics,        // step 4
  validatePersonalStatement,// step 5
  validateCampusSecurity,   // step 6
  validateStudentAgreement, // step 7
  validateChecklist,        // step 8
  validateAgent,            // step 9
]