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
      <h2 className="max-w-2xl text-3xl font-bold leading-[1.08] text-brand-navy sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-brand-charcoal sm:text-base lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
