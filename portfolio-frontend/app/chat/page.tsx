import type { Metadata } from "next";
import ChatInterface from "@/components/ChatInterface";

export const metadata: Metadata = {
  title: "The Operator // AI Architectural Assistant | Meghraj Goud",
  description: "Direct conversational console with The Operator, grounded in verified engineering history across high-concurrency backends and ML gateways.",
  alternates: {
    canonical: "/chat",
  },
};

export default function ChatPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#06080e]">
      <ChatInterface />
    </main>
  );
}
