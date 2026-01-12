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
    "mb-10 flex flex-col gap-3",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} id={anchor}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <span aria-hidden className="h-0.5 w-10 bg-brand-blue/60" />
      <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
