"use client";

import { useState, useEffect } from "react";

const PROMPTS = [
  "Make a chess game with AI opponent",
  "Build a todo app with dark theme",
  "Create a weather dashboard with animations",
  "Design a music player with playlist support",
  "Develop a chat app with real-time messaging"
];

const MAX_CHARACTERS = 500;

interface DashboardTextAreaProps {
  onSubmit: (prompt: string) => void;
}

export function DashboardTextArea({ onSubmit }: DashboardTextAreaProps) {
  const [prompt, setPrompt] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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
      onSubmit(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

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
