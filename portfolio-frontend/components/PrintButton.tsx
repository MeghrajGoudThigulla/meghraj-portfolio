'use client';

export default function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="btn btn-primary gap-2"
    >
      <PrintIcon />
      Print / Save PDF
    </button>
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
    >
      <path d="M6 9V4h12v5" />
      <path d="M6 14h12v7H6z" />
      <path d="M9 4h6" />
      <path d="M9 18h6" />
    </svg>
  );
}
