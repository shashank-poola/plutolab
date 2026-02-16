"use client";

import { useRouter } from "next/navigation";
import { DashboardTextArea } from "./DashboardTextArea";

export function Dashboard() {
  const router = useRouter();

  const handleSubmit = (prompt: string, model: string) => {
    router.push(`/playground?prompt=${encodeURIComponent(prompt)}&model=${model}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <DashboardTextArea onSubmit={handleSubmit} />
    </div>
  );
}
