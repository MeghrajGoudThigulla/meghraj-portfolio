import SectionHeading from "./SectionHeading";

const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "Dart", "TypeScript", "JavaScript", "C++"],
  },
  {
    label: "Frameworks",
    items: ["FastAPI", "Flask", "Express", "Spring Boot", "Flutter", "React (MUI)", "Next.js"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firestore"],
  },
  {
    label: "Architecture",
    items: ["REST API Design", "RBAC", "JWT", "Rate Limiting", "Caching", "Background Workers"],
  },
  {
    label: "Tooling",
    items: ["SQLAlchemy", "Alembic", "Prisma", "Docker", "Git", "Firebase Admin"],
  },
];

export default function SkillsSnapshot() {
  return (
    <section
      className="relative overflow-hidden border-y border-brand-charcoal/10 bg-white py-20 sm:py-24 lg:py-28"
      id="skills"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-6 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills snapshot for fast recruiter scan."
          description="Grouped by what I build with most often in production systems."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.label}
              className="card fade-up space-y-3 px-4 py-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="badge-accent">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
