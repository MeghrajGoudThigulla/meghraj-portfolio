type ResumeHighlight = {
  label: string;
  value: string;
};

const resumeHighlights: ResumeHighlight[] = [
  { label: "APIs Delivered", value: "286" },
  { label: "FastAPI Endpoints", value: "273" },
  { label: "Data Models", value: "61+" },
  { label: "Migrations", value: "30+" },
];

export default function ResumeHighlightsBar() {
  return (
    <section
      aria-label="Resume highlights"
      className="resume-highlights rounded-2xl border border-brand-charcoal/10 bg-white px-4 py-4 shadow-sm"
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {resumeHighlights.map((highlight) => (
          <li key={highlight.label} className="rounded-lg border border-brand-charcoal/10 bg-brand-bg px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {highlight.label}
            </p>
            <p className="mt-2 text-xl font-bold text-brand-blue">{highlight.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
