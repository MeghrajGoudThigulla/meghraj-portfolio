'use client';

type PrintButtonProps = {
  label?: string;
  className?: string;
  pdfUrl?: string;
  downloadName?: string;
  onPrint?: () => void;
};

export default function PrintButton({
  label = "Print / Save PDF",
  className = "btn btn-primary gap-2",
  pdfUrl,
  downloadName,
  onPrint,
}: PrintButtonProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      onPrint?.();
      if (pdfUrl) {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute("download", downloadName || "Thigulla_Meghraj_Goud_Resume.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={className}
    >
      {pdfUrl ? <DownloadIcon /> : <PrintIcon />}
      {label}
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M6 9V4h12v5" />
      <path d="M6 14h12v7H6z" />
      <path d="M9 4h6" />
      <path d="M9 18h6" />
    </svg>
  );
}

