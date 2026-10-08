import type { Metadata } from "next";
import WorldClientWrapper from "@/components/WorldClientWrapper";

export const metadata: Metadata = {
  title: "The Architect’s Core · 3D System World | Meghraj Goud",
  description: "Interactive 3D WebGL space. Inspect distributed gateways, inference reactors, and fintech architectures in orbit.",
  alternates: {
    canonical: "/world",
  },
};

export default function WorldPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#06080e]">
      <WorldClientWrapper />
    </main>
  );
}
