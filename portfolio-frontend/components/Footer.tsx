import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-brand-charcoal/10 bg-white py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-navy">
            Meghraj Goud
          </p>
          <p className="text-sm text-brand-charcoal">
            Engineering strategy for finance and consulting teams.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-brand-blue">
          <Link href="mailto:meghraj.thigulla@outlook.com" className="hover:text-brand-navy">
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/meghraj-goud-thigulla"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-navy"
          >
            LinkedIn
          </Link>
          <Link
            href="/resume"
            className="hover:text-brand-navy"
          >
            Résumé
          </Link>
        </div>
      </div>
    </footer>
  );
}
