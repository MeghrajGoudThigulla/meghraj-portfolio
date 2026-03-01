type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  anchor?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  anchor,
  className,
}: SectionHeadingProps) {
  const containerClassName = [
    "mb-10 flex max-w-3xl flex-col gap-3 lg:mb-12",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} id={anchor}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <span aria-hidden className="h-0.5 w-12 rounded-full bg-brand-blue/70" />
      <h2 className="text-3xl font-bold leading-[1.1] text-brand-navy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-prose text-base leading-relaxed text-brand-charcoal/95 lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
