"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardTextArea } from "./DashboardTextArea";
import { SelectModel } from "./selectModel";

export function Dashboard() {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState("gemini");

  const handleSubmit = (prompt: string) => {
    router.push(`/playground?prompt=${encodeURIComponent(prompt)}&model=${selectedModel}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex flex-col gap-4">
        <DashboardTextArea onSubmit={handleSubmit} />
        
        <div className="flex justify-start">
          <SelectModel
            onModelSelect={setSelectedModel}
            selectedModel={selectedModel}
          />
        </div>
      </div>
    </div>
  );
}
