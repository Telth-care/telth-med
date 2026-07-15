import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import tohomeImg from "../assets/image-1.jpeg";
import ApplicationForm from "../pages/ApplicationForm/ApplicationForm";
import { ClipboardList } from "lucide-react";

/* ─── shared field components ─────────────────────────────── */
function Field({ label, children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-[0.8rem] font-medium text-[#0D1B2E] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full font-sans text-[0.875rem] px-3.5 py-2.5 border border-line rounded-md bg-parchment text-ink placeholder-[#BCC3CA] focus:border-[rgba(15,76,129,0.5)] focus:bg-paper focus:outline-none transition-colors";

function Input(props) {
  return <input className={inputCls} {...props} />;
}
function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        className={`${inputCls} appearance-none pr-8 text-[#505050]`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="#0F4C81"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
function Textarea(props) {
  return <textarea className={`${inputCls} resize-y`} {...props} />;
}

function Consent({ children }) {
  return (
    <label className="flex gap-3 items-start cursor-pointer text-[0.82rem] text-[#505F7D] mb-5">
      <input
        type="checkbox"
        required
        className="mt-0.5 accent-brass flex-shrink-0 w-5 h-5 border border-line rounded"
      />
      <span>{children}</span>
    </label>
  );
}

/* ─── API-backed form submission hook ─────────────────────── */
function useApiFormSubmit(endpoint, buildPayload, successMsg) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const payload = buildPayload(formData);

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("done");
      setTimeout(() => {
        setStatus("idle");
        form.reset();
      }, 3500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong submitting your interest. Please try again.",
      );
    }
  };

  const btnLabel =
    status === "submitting"
      ? "Submitting…"
      : status === "done"
        ? `✓ ${successMsg}`
        : undefined;

  return { status, handle, btnLabel, errorMsg };
}

/* ─── Payload builders ─────────────────────────────────────── */
function buildUniversityPayload(formData) {
  const accreditedVal = formData.get("accredited");
  return {
    institutionIdentity: {
      fullLegalInstitutionName: formData.get("institutionName"),
      country: formData.get("country"),
      city: formData.get("city"),
      institutionType: formData.get("institutionType"),
      websiteUrl: formData.get("websiteUrl"),
      accredited: accreditedVal === "Yes",
      accreditationBody: formData.get("accreditationBody"),
    },
    contactPerson: {
      fullName: formData.get("contactName"),
      designation: formData.get("contactRole"),
      officialEmail: formData.get("email"),
      phoneNumber: formData.get("phone"),
      whatsappNumber: formData.get("whatsapp"),
    },
    status: "pending",
    notes: buildUniversityNotes(formData),
  };
}

function buildUniversityNotes(formData) {
  const parts = [];
  const interest = formData.get("partnershipInterest");
  const timeline = formData.get("timeline");
  const details = formData.get("details");
  if (interest) parts.push(`Primary partnership interest: ${interest}.`);
  if (timeline) parts.push(`Timeline: ${timeline}.`);
  if (details) parts.push(details);
  return parts.join(" ");
}

function buildEmployerPayload(formData) {
  const countriesRaw = formData.get("countriesOfOperation") || "";
  const countriesOfOperation = countriesRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const workforceTypesSelected = formData.getAll("workforceTypes");
  return {
    identity: {
      fullLegalName: formData.get("agencyName"),
      countryOfRegistration: formData.get("country"),
      countriesOfOperation,
      websiteUrl: formData.get("websiteUrl"),
      isLicensedAgency: formData.get("isLicensedAgency"),
    },
    contact: {
      fullName: formData.get("contactName"),
      designation: formData.get("contactRole"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp"),
    },
    status: "pending",
    notes: buildEmployerNotes(formData, workforceTypesSelected),
  };
}

function buildEmployerNotes(formData, workforceTypesSelected) {
  const parts = [];
  if (workforceTypesSelected.length)
    parts.push(
      `Workforce types represented: ${workforceTypesSelected.join(", ")}.`,
    );
  const size = formData.get("workforceSize");
  if (size) parts.push(`Approx. workforce size: ${size}.`);
  const details = formData.get("details");
  if (details) parts.push(details);
  return parts.join(" ");
}

/* ─── CANDIDATE FORM - Navigates to Application Form ────── */
function CandidateForm() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const applicationRoles = [
    { value: "cm", label: "Care Manager (CM)" },
    { value: "ccm", label: "Collaborative Care Manager (CCM)" },
    { value: "physician", label: "Physician" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update dropdown position when opened
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isDropdownOpen]);

  const handleRoleSelect = (roleValue) => {
    setIsDropdownOpen(false);
    navigate(`/application-form?role=${roleValue}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
      {/* Left info panel */}
      <div>
        <p className="text-brass-dark font-semibold text-[11px] tracking-[0.14em] uppercase mb-2">
          Candidate Application
        </p>
        <h3 className="font-serif text-[1.4rem] font-semibold text-ink mb-3">
          Request a candidate eligibility review
        </h3>
        <p className="text-ink-soft text-sm mb-4">
          Tell us where you are today. A member of the admissions team will
          confirm which pathway, if any, fits your qualification and goals.
        </p>
        <div className="border-t border-line pt-4 space-y-1.5 mb-6">
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">Programme:</strong> TELTH-U MedPass
            Global Healthcare Mobility Programme
          </p>
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">Partners:</strong> Telth · Harley
            Health System · NSDC Skill India (India)
          </p>
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">Available in:</strong> India · UK · USA
            (pathway-dependent)
          </p>
        </div>
        <img
          src={tohomeImg}
          alt="Healthcare professional"
          className="hidden lg:block w-full rounded-md object-cover"
          style={{ aspectRatio: "493 / 589", maxHeight: "589px" }}
        />
      </div>

      {/* Right: Navigation card to Application Form */}
      <div className="bg-paper rounded-[10px] overflow-visible shadow-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center max-w-sm mx-auto w-full">
          <ClipboardList
            size={56}
            style={{ color: "#0F4C81" }}
            className="mb-6 mx-auto"
          />
          <h3 className="text-xl font-bold text-ink mb-3">
            Start Your Application
          </h3>
          <p className="text-ink-soft text-sm mb-6">
            Fill out our comprehensive application form to begin your journey in
            the Global Healthcare Mobility Programme.
          </p>

          {/* Dropdown Button */}
          <div className="relative w-full">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              className="w-full bg-ink text-parchment font-semibold text-sm py-3.5 rounded-lg hover:bg-brass-dark hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Open Application Form
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <p className="text-ink-soft/60 text-xs mt-4">
            Takes approximately 10-15 minutes to complete
          </p>
        </div>
      </div>

      {/* Dropdown Portal - renders outside the container */}
      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 999999,
            }}
            className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
          >
            {applicationRoles.map((role, index) => (
              <button
                key={role.value}
                onClick={() => handleRoleSelect(role.value)}
                className={`w-full text-left px-4 py-3.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 ${
                  index < applicationRoles.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

/* ─── UNIVERSITY FORM ──────────────────────────────────────── */
function UniversityForm() {
  const { status, handle, btnLabel, errorMsg } = useApiFormSubmit(
    "https://api.medpassedu.org/api/institutions",
    buildUniversityPayload,
    "University interest received",
  );
  const submitting = status === "submitting";
  const done = status === "done";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
      <div>
        <p className="text-brass-dark font-semibold text-[11px] tracking-[0.14em] uppercase mb-2">
          University Partnership
        </p>
        <h3 className="font-serif text-[1.4rem] font-semibold text-ink mb-3">
          Express interest in the Global Health Mobility Program
        </h3>
        <p className="text-ink-soft text-sm mb-4">
          We are actively seeking university partners to integrate the MedPass
          pathway with your student and graduate communities.
        </p>
        <div className="border-t border-line pt-4 space-y-1.5">
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">What we offer:</strong>{" "}
            Employment-linked placement framework, MoU, industry exposure at
            Telth AI Health Hubs, and a graduate-to-career pipeline.
          </p>
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">Eligible programmes:</strong> MSc
            Digital Health, MSc Health Management, MSc Nursing, MBA Healthcare,
            PG Diploma Health Informatics and allied healthcare postgraduate
            programmes.
          </p>
        </div>
      </div>

      <div className="bg-paper rounded-[10px] overflow-hidden shadow-panel">
        <form onSubmit={handle} className="p-8">
          <Field label="University / Institution name *">
            <Input
              name="institutionName"
              type="text"
              required
              placeholder="Full institutional name"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Country *">
              <Select name="country" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {[
                  "India",
                  "United Kingdom",
                  "United States",
                  "UAE / Gulf",
                  "Europe",
                  "Southeast Asia",
                  "Africa",
                  "Other",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="City">
              <Input name="city" type="text" placeholder="e.g. London" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Institution type">
              <Select name="institutionType" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {[
                  "Public University",
                  "Private University",
                  "Medical College",
                  "Nursing College",
                  "Online University",
                  "Accredited Training Body",
                  "Other",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Website URL">
              <Input
                name="websiteUrl"
                type="url"
                placeholder="https://www.university.ac.uk"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Accredited institution?">
              <Select name="accredited" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </Field>
            <Field label="Accreditation body">
              <Input
                name="accreditationBody"
                type="text"
                placeholder="e.g. QAA"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact person name *">
              <Input
                name="contactName"
                type="text"
                required
                placeholder="Head of Partnerships / Dean"
              />
            </Field>
            <Field label="Role / Title">
              <Input
                name="contactRole"
                type="text"
                placeholder="e.g. Director of International Relations"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Institutional email *">
              <Input
                name="email"
                type="email"
                required
                placeholder="contact@university.ac.uk"
              />
            </Field>
            <Field label="Phone">
              <Input name="phone" type="tel" placeholder="+44 / +91..." />
            </Field>
          </div>
          <Field label="WhatsApp number">
            <Input name="whatsapp" type="tel" placeholder="+44 7700 900123" />
          </Field>
          <Field label="Tell us about your institution and why you'd be a good fit for the MedPass Global Health Mobility Program *">
            <Textarea
              name="details"
              rows={5}
              required
              placeholder="Tell us about the programmes you offer, the student profile you serve, existing industry placements, and why you think MedPass would be a good fit for your students and graduates..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary partnership interest">
              <Select name="partnershipInterest" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {[
                  "Student placements & industry exposure",
                  "Graduate employment pipeline",
                  "Co-branded / joint programme",
                  "Research collaboration",
                  "All of the above",
                  "Not sure — exploring options",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Timeline">
              <Select name="timeline" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {[
                  "Immediate — ready to proceed",
                  "Within 6 months",
                  "Next academic year",
                  "Exploratory / long-term",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
          </div>
          <Consent>
            I confirm I am authorised to explore partnership discussions on
            behalf of my institution. This submission is an expression of
            interest only — not a binding agreement.
          </Consent>
          <button
            type="submit"
            disabled={submitting || done}
            className={`w-full font-semibold text-sm py-3 rounded transition-colors ${
              done
                ? "bg-teal/80 text-parchment opacity-75 cursor-not-allowed"
                : submitting
                  ? "bg-ink/70 text-parchment cursor-wait"
                  : "bg-ink text-parchment hover:bg-brass-dark"
            }`}
          >
            {btnLabel || "Submit University Interest"}
          </button>
          {status === "error" && (
            <p className="text-[0.8rem] text-red-600 text-center mt-3">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ─── EMPLOYER FORM ────────────────────────────────────────── */
const workforceTypes = [
  "Care Workers / Caregivers",
  "Registered Nurses",
  "Healthcare Assistants",
  "Community Health Workers",
  "Allied Health Professionals",
  "Other",
];

function EmployerForm() {
  const { status, handle, btnLabel, errorMsg } = useApiFormSubmit(
    "https://api.medpassedu.org/api/organisations",
    buildEmployerPayload,
    "Partnership interest received",
  );
  const submitting = status === "submitting";
  const done = status === "done";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
      <div>
        <p className="text-brass-dark font-semibold text-[11px] tracking-[0.14em] uppercase mb-2">
          Employment Agent Partnership
        </p>
        <h3 className="font-serif text-[1.4rem] font-semibold text-ink mb-3">
          Partner with us to place your care workforce
        </h3>
        <p className="text-ink-soft text-sm mb-4">
          We are open to working with employment agencies and staffing
          organisations to provide structured employment and career development
          pathways through the Telth AI Hub network.
        </p>
        <div className="border-t border-line pt-4 space-y-1.5">
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">What we offer:</strong> Structured
            placement within Telth AI Health Hubs, NSDC-aligned skills training,
            care management certifications and international mobility pathways
            (subject to eligibility).
          </p>
          <p className="text-[0.86rem] text-ink-soft">
            <strong className="text-ink">Workforce types:</strong> Care workers,
            caregivers, healthcare assistants, community health workers, nurses
            and allied health professionals.
          </p>
        </div>
      </div>

      <div className="bg-paper rounded-[10px] overflow-hidden shadow-panel">
        <form onSubmit={handle} className="p-8">
          <Field label="Agency / Organisation name *">
            <Input
              name="agencyName"
              type="text"
              required
              placeholder="Full organisation name"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Country of registration *">
              <Select name="country" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {[
                  "India",
                  "United Kingdom",
                  "United States",
                  "UAE / Gulf",
                  "Other",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Workforce size (approx.)">
              <Select name="workforceSize" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {[
                  "Under 50",
                  "50 – 200",
                  "200 – 500",
                  "500 – 1,000",
                  "1,000+",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Countries of operation">
              <Input
                name="countriesOfOperation"
                type="text"
                placeholder="e.g. United Kingdom, Canada, Australia"
              />
            </Field>
            <Field label="Website URL">
              <Input
                name="websiteUrl"
                type="url"
                placeholder="https://www.agency.com"
              />
            </Field>
          </div>
          <Field label="Licensed employment agency?">
            <Select name="isLicensedAgency" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact person name *">
              <Input
                name="contactName"
                type="text"
                required
                placeholder="Your name"
              />
            </Field>
            <Field label="Role / Title">
              <Input
                name="contactRole"
                type="text"
                placeholder="e.g. Director, Partner Manager"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email *">
              <Input
                name="email"
                type="email"
                required
                placeholder="contact@agency.com"
              />
            </Field>
            <Field label="Phone *">
              <Input
                name="phone"
                type="tel"
                required
                placeholder="+44 / +91..."
              />
            </Field>
          </div>
          <Field label="WhatsApp number">
            <Input name="whatsapp" type="tel" placeholder="+44 7700 111222" />
          </Field>
          <Field label="Workforce types you represent">
            <div className="grid grid-cols-2 gap-2 mt-1">
              {workforceTypes.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 text-ink-soft text-[0.84rem] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="workforceTypes"
                    value={t}
                    className="accent-brass"
                  />
                  {t}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Tell us about your workforce and how you'd like to partner *">
            <Textarea
              name="details"
              rows={4}
              required
              placeholder="Tell us about your agency, the type of care workers you represent, current placement activities, and what kind of partnership you're looking for with the Telth AI Hub network..."
            />
          </Field>
          <Consent>
            I confirm I am authorised to explore partnership discussions on
            behalf of my organisation. This is an expression of interest only —
            not a binding agreement or guarantee of placement.
          </Consent>
          <button
            type="submit"
            disabled={submitting || done}
            className={`w-full font-semibold text-sm py-3 rounded transition-colors ${
              done
                ? "bg-teal/80 text-parchment opacity-75 cursor-not-allowed"
                : submitting
                  ? "bg-ink/70 text-parchment cursor-wait"
                  : "bg-ink text-parchment hover:bg-brass-dark"
            }`}
          >
            {btnLabel || "Submit Partnership Interest"}
          </button>
          {status === "error" && (
            <p className="text-[0.8rem] text-red-600 text-center mt-3">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ─── TABS WRAPPER ─────────────────────────────────────────── */
const TABS = [
  {
    id: "candidate",
    label: "Individual Candidate",
    icon: "🩺",
    Form: CandidateForm,
  },
  {
    id: "university",
    label: "University / Institution",
    icon: "🎓",
    Form: UniversityForm,
  },
  {
    id: "employer",
    label: "Employment Agent / Partner",
    icon: "🤝",
    Form: EmployerForm,
  },
];

export default function Apply({ activeTab, setActiveTab }) {
  return (
    <section id="apply" className="py-[72px] bg-parchment-2">
      <div className="max-w-site mx-auto px-6">
        {/* Section eyebrow + heading */}
        <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3 text-center">
          Apply
        </p>
        <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink text-center mb-3">
          Submit your application
        </h2>
        <p className="text-ink-soft text-[0.97rem] text-center max-w-xl mx-auto mb-8">
          Complete the form below. Our admissions team will review your details
          and confirm which pathway fits your qualification and goals.
        </p>

        {/* Tab switcher — styled to match PDF: active = dark navy fill, inactive = white outlined */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-9">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? "bg-ink text-parchment border-ink"
                  : "bg-paper text-ink-soft border-line hover:border-brass hover:text-ink"
              }`}
            >
              {/* Icon housed in a small wrapper */}
              <span
                className={`inline-flex items-center justify-center w-[18px] h-[18px] ${
                  activeTab === t.id ? "opacity-90" : "opacity-60"
                }`}
              >
                {/* SVG icon per tab */}
                {t.id === "candidate" && (
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M9 2a3 3 0 1 1 0 6A3 3 0 0 1 9 2ZM3 14c0-3 2.7-5 6-5s6 2 6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {t.id === "university" && (
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M9 2L2 6l7 4 7-4-7-4ZM2 10v4M16 10v4M5 11v3M13 11v3M5 14h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {t.id === "employer" && (
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M2 14v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Active form */}
        {TABS.map((t) => activeTab === t.id && <t.Form key={t.id} />)}
      </div>
    </section>
  );
}
