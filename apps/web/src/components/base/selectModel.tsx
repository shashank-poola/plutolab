"use client";

import { useState } from "react";

const MODELS = [
  { id: "gemini", name: "Gemini", description: "Google's latest AI model" },
  { id: "gpt-4o", name: "GPT-4o", description: "OpenAI's advanced model" }
];

interface SelectModelProps {
  onModelSelect: (modelId: string) => void;
  selectedModel: string;
}

export function SelectModel({ onModelSelect, selectedModel }: SelectModelProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedModelData = MODELS.find(m => m.id === selectedModel) || MODELS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-white/8 backdrop-blur-2xl
          border border-white/20 hover:border-white/30
          transition-all duration-300
          min-w-[140px] justify-between
        "
      >
        <span className="text-sm font-medium text-white/90">
          {selectedModelData.name}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="
            absolute bottom-full left-0 mb-2
            bg-white/10 backdrop-blur-2xl
            border border-white/20 rounded-lg
            shadow-[0_8px_32px_rgba(0,0,0,0.24)]
            overflow-hidden z-20
            min-w-[180px]
          ">
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelSelect(model.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-3 py-2.5 text-left
                  transition-all duration-200
                  hover:bg-white/10
                  ${selectedModel === model.id ? 'bg-white/15' : ''}
                `}
              >
                <div className="text-sm font-medium text-white/90">
                  {model.name}
                </div>
                <div className="text-xs text-white/60 mt-0.5">
                  {model.description}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
