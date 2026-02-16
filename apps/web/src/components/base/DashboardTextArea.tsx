"use client";

import { useState, useEffect } from "react";

const PROMPTS = [
  "Make a chess game with AI opponent",
  "Build a todo app with dark theme",
  "Create a weather dashboard with animations",
  "Design a music player with playlist support",
  "Develop a chat app with real-time messaging"
];

const MODELS = [
  { id: "gemini", name: "Gemini", description: "Google's latest AI model" },
  { id: "gpt-4o", name: "GPT-4o", description: "OpenAI's advanced model" }
];

const MAX_CHARACTERS = 500;

interface DashboardTextAreaProps {
  onSubmit: (prompt: string, model: string) => void;
}

export function DashboardTextArea({ onSubmit }: DashboardTextAreaProps) {
  const [prompt, setPrompt] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  useEffect(() => {
    if (prompt) return;

    let charIndex = 0;
    setIsTyping(true);
    setTypingText("");

    const typingInterval = setInterval(() => {
      const currentPrompt = PROMPTS[currentPromptIndex];
      
      if (!currentPrompt) return;
      
      if (charIndex < currentPrompt.length) {
        setTypingText(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIsTyping(false);
          setTypingText("");
          setCurrentPromptIndex((prev) => (prev + 1) % PROMPTS.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentPromptIndex, prompt, isTyping]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setPrompt(value);
    }
  };

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt, selectedModel);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const selectedModelData = MODELS.find(m => m.id === selectedModel) ?? MODELS[0];

  return (
    <div className="relative">
      <div
        className="
          relative overflow-hidden
          bg-white/8 backdrop-blur-2xl
          rounded-2xl border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        "
      >
        <div className="p-4 pb-12">
          <textarea
            value={prompt}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={typingText || ""}
            rows={3}
            className="
              w-full bg-transparent resize-none
              text-white placeholder:text-white/50
              text-base outline-none
              transition-all duration-300
            "
          />
        </div>

        {/* Model Selector - Bottom Left */}
        <div className="absolute bottom-3 left-3">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="
              flex items-center gap-2 px-3 py-1.5 rounded-lg
              bg-white/8 backdrop-blur-2xl
              border border-white/20 hover:border-white/30
              transition-all duration-300
              min-w-[120px] justify-between
            "
          >
            <span className="text-xs font-medium text-white/90">
              {selectedModelData?.name}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-white/70 transition-transform duration-200 ${isModelDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {isModelDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsModelDropdownOpen(false)}
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
                      setSelectedModel(model.id);
                      setIsModelDropdownOpen(false);
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

        {/* Submit Button - Bottom Right */}
        <button
          onClick={handleSubmit}
          disabled={!prompt.trim()}
          className="
            absolute bottom-3 right-3
            flex items-center justify-center
            w-8 h-8 rounded-lg
            bg-white/10 hover:bg-white/20
            border border-white/20
            transition-all duration-300
            disabled:opacity-30 disabled:cursor-not-allowed
          "
          aria-label="Submit"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
