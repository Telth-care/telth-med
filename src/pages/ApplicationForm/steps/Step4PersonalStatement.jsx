import { Card, Textarea, PillUpload } from '../ui/index.jsx'

const PenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
  </svg>
)

export default function Step4PersonalStatement({ data, update }) {
  const method = data.personalStatementMethod || 'type' // 'type' | 'upload'

  const TabBtn = ({ value, children }) => (
    <button
      type="button"
      onClick={() => update('personalStatementMethod', value)}
      className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${
        method === value
          ? 'bg-[#0F4C81] text-white'
          : 'bg-[#F5F8FC] text-[#0D1B2E] ring-1 ring-[#0F4C81]/15 hover:ring-[#0F4C81]/30'
      }`}
    >
      {children}
    </button>
  )

  return (
    <Card icon={<PenIcon />} title="Personal Statement">
      <p className="text-sm text-[#0D1B2E] mb-4 leading-relaxed text-justify">
        On a separate page, type your personal statement (double spaced). Your statement represents your
        opportunity to communicate to the Admissions Committee anything that you feel is important for the
        Committee to know about you that might not be sufficiently covered by this application. This information
        would give the Committee greater insight about the applicant&apos;s unique qualifications, experiences and
        aspirations.
      </p>

      {/* Choose how to provide the statement */}
      <div className="flex flex-wrap gap-3 mb-5">
        <TabBtn value="type">Type it here</TabBtn>
        <TabBtn value="upload">Upload a document</TabBtn>
      </div>

      {method === 'type' ? (
        <Textarea
          rows={8}
          placeholder="Type your personal statement here…"
          value={data.personalStatement}
          onChange={(e) => update('personalStatement', e.target.value)}
        />
      ) : (
        <div>
          <PillUpload
            label="Upload Personal Statement"
            sublabel="Drag and drop or click to browse"
            accept=".pdf,.doc,.docx"
            onFile={(file) => update('personalStatementFileUrl', file || '')}
          />
          {data.personalStatementFileUrl && (
            <p className="text-xs text-[#0F4C81] mt-2 text-center">
              Selected: {data.personalStatementFileUrl.name || data.personalStatementFileUrl}
            </p>
          )}
        </div>
      )}
    </Card>
  )
}
