type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  anchor?: string;
  className?: string;
  titleId?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  anchor,
  className,
  titleId,
}: SectionHeadingProps) {
  const containerClassName = [
    "mb-9 flex max-w-3xl flex-col gap-3 sm:mb-10 lg:mb-12",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} id={anchor}>
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-blue" aria-hidden="true" />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2 
        id={titleId}
        className="max-w-2xl font-black leading-[1.08] text-brand-navy tracking-tight"
        style={{ fontSize: "clamp(1.85rem, 1.55rem + 1.35vw, 3.1rem)" }}
      >
        {title}
      </h2>
      {description ? (
        <p 
          className="max-w-2xl leading-relaxed text-brand-charcoal"
          style={{ fontSize: "clamp(0.88rem, 0.85rem + 0.12vw, 1.05rem)" }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
