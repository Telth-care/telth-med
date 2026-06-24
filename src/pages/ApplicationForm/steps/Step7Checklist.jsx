import { Card, FileChecklistRow, MultiFileChecklistRow, CheckRow } from '../ui/index.jsx'

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
)

// Items with a 3rd element get rendered with that many independent upload slots.
const ITEMS = [
  ['passportPhotos', 'Three (3) recent passport-size photos', 3],
  ['passportCopy', 'Passport Copy'],
  ['recommendationLetters', 'Two Letters of Recommendation', 2],
  ['personalStatementSubmitted', 'Personal Statement (typed and double spaced)'],
  ['transcriptsSubmitted', 'Certified or Notarized copies of transcripts & Degree of your Undergraduate studies in English'],
  ['highSchoolDiplomaSubmitted', 'Certified copies of High School Diploma in English'],
]

export default function Step7Checklist({ data, update }) {
  const cl = data.checklist

  return (
    <Card icon={<ListIcon />} title="Documents">
      <p className="text-sm text-[#0D1B2E] mb-5">
        Note: Your application will NOT be reviewed unless all the applicable sections are completely answered and
        include all required items listed below.
      </p>
      <p className="text-sm font-semibold text-[#0D1B2E] mb-3">
        Please enclose or forward the following items along with your application
      </p>

      <div className="mb-6">
        {ITEMS.map(([key, label, count]) =>
          count ? (
            <MultiFileChecklistRow
              key={key}
              label={label}
              count={count}
              files={cl.files[key] || []}
              onFile={(i, file) => {
                const arr = [...(cl.files[key] || [])]
                arr[i] = file
                update(`checklist.files.${key}`, arr)
              }}
            />
          ) : (
            <FileChecklistRow
              key={key}
              label={label}
              file={cl.files[key]}
              onFile={(file) => update(`checklist.files.${key}`, file)}
            />
          )
        )}
      </div>

      <div className="pt-4 border-t border-[#0F4C81]/10">
        <CheckRow
          label="I confirm that I have submitted all original documents required."
          checked={cl.documentsConfirmed}
          onChange={(v) => update('checklist.documentsConfirmed', v)}
        />
      </div>
    </Card>
  )
}