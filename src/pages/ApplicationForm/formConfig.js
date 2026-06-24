// Step metadata exactly as per design screens (label + completion % shown in stepper)
// Order: Checklist now comes first (Step 1) so applicants see what to gather/upload
// before going through the rest of the application.
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

export const PROGRAM_OPTIONS = [
  'Fellowship Program',
  'Post Graduate Program',
  'Post Graduate Diploma Program',
  'Post Graduate Certification Program',
  'Continuous Professional Development Program',
  "Master's Program",
]

export const emptyEmergencyContact = () => ({ fullName: '', phoneNumber: '', relation: '' })

export const emptyPreviousInstitution = () => ({
  institutionName: '', city: '', stateCountry: '',
  fromDate: '', toDate: '', creditsEarned: '', major: '', degreeEarned: '',
})

// Initial / reset shape — mirrors the backend POST /api/applications payload exactly
export const getInitialFormData = () => ({
  step1: {
    joiningDate: '', program: '', photoUrl: '',
    firstName: '', lastName: '', middleName: '',
    passportNumber: '', gender: '', age: '',
    currentMailingAddress: { street: '', state: '', country: '', postalCode: '' },
    mobilePhone: '', homePhone: '', dateOfBirth: '',
    studentEmail: '', parentEmail: '', cityStateCountryOfBirth: '',
    citizenshipStatus: '', permanentResident: '', alienRegistration: '',
    countryOfCitizenship: '', visaType: '', ukEntryDate: '',
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
  campusSecurity: { criminalConviction: null, academicDismissal: null, explanationLetter: '' },
  studentAgreement: { agreed: false, signedDate: '' },
  checklist: {
    files: {
      passportPhotos: null,
      passportCopy: null,
      recommendationLetters: null,
      personalStatementSubmitted: null,
      transcriptsSubmitted: null,
      highSchoolDiplomaSubmitted: null,
    },
    documentsConfirmed: false,
  },
  agentInformation: { name: '', contactInformation: '', agentNumber: '' },
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

const CHECKLIST_LABELS = {
  passportPhotos: 'Three (3) recent passport-size photos',
  passportCopy: 'Passport Copy',
  recommendationLetters: 'Two Letters of Recommendation',
  personalStatementSubmitted: 'Personal Statement (typed and double spaced)',
  transcriptsSubmitted: 'Certified or Notarized copies of transcripts & Degree',
  highSchoolDiplomaSubmitted: 'Certified copies of High School Diploma in English',
}

function validateChecklist(d) {
  const missing = []
  const files = d.checklist.files
  Object.keys(CHECKLIST_LABELS).forEach((key) => {
    if (!files[key]) missing.push(CHECKLIST_LABELS[key])
  })
  if (!d.checklist.documentsConfirmed) missing.push('Document-confirmation checkbox')
  return missing
}

function validateProgram(d) {
  const s1 = d.step1
  const missing = []
  if (!s1.joiningDate) missing.push('Joining date')
  if (!s1.program) missing.push('Program selection')
  if (!s1.photoUrl) missing.push('Passport size photo upload')
  if (!s1.firstName) missing.push('First Name')
  if (!s1.lastName) missing.push('Last Name')
  if (!s1.passportNumber) missing.push('Passport / Aadhar Number')
  if (!s1.gender) missing.push('Gender')
  if (!String(s1.age || '').trim()) missing.push('Age')
  if (!s1.currentMailingAddress.street) missing.push('Current Mailing Address')
  if (!s1.currentMailingAddress.state) missing.push('State/Province')
  if (!s1.currentMailingAddress.postalCode) missing.push('Postal/Zip Code')
  if (!s1.currentMailingAddress.country) missing.push('Country')
  if (!s1.mobilePhone) missing.push('Mobile Phone')
  if (!s1.dateOfBirth) missing.push('Date of Birth')
  if (!s1.studentEmail) missing.push("Student's Email Address")
  if (!s1.cityStateCountryOfBirth) missing.push('City/State/Country of Birth')
  if (!s1.citizenshipStatus) missing.push('Citizenship Status (UK Citizens)')
  if (s1.citizenshipStatus === 'No' && !s1.countryOfCitizenship) missing.push('Country of Citizenship if not UK')
  return missing
}

function validateEmergencyContact(d) {
  const c = d.emergencyContacts[0]
  const missing = []
  if (!c.fullName) missing.push('Emergency Contact: Full Name')
  if (!c.phoneNumber) missing.push('Emergency Contact: Phone Number')
  if (!c.relation) missing.push('Emergency Contact: Relation to student')
  return missing
}

function validateAcademics(d) {
  const hs = d.academics.highSchool
  const missing = []
  if (!hs.schoolName) missing.push('Name of the School')
  if (!hs.city) missing.push('High School City')
  if (!hs.state) missing.push('High School State/Province')
  if (!hs.country) missing.push('High School Country')
  if (!hs.graduationDate) missing.push('Date Of Graduation')
  return missing
}

function validatePersonalStatement(d) {
  return d.personalStatement && d.personalStatement.trim() ? [] : ['Personal Statement']
}

function validateCampusSecurity(d) {
  const cs = d.campusSecurity
  const missing = []
  if (cs.criminalConviction === null || cs.criminalConviction === undefined) missing.push('Criminal/military offense question')
  if (cs.academicDismissal === null || cs.academicDismissal === undefined) missing.push('Academic dismissal question')
  if ((cs.criminalConviction || cs.academicDismissal) && !cs.explanationLetter) missing.push('Letter of Explanation')
  return missing
}

function validateStudentAgreement(d) {
  const sa = d.studentAgreement
  const missing = []
  if (!sa.agreed) missing.push('Agreement to the Student Agreement')
  if (!sa.signedDate) missing.push('Date')
  return missing
}

// Agent Information is intentionally optional — not every applicant applies through an agent.
function validateAgent() {
  return []
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
