import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, RobotDesign } from "../types";
import { Send, User, MessageCircle, HelpCircle } from "lucide-react";

interface SmeConsultationProps {
  messages: ChatMessage[];
  loading: boolean;
  onSendMessage: (text: string) => void;
  design: RobotDesign;
}

export default function SmeConsultation({ messages, loading, onSendMessage, design }: SmeConsultationProps) {
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Suggestions that change dynamically depending on current selections!
  const getSuggestions = () => {
    const list = [
      `How does ${design.mobility} handle ${design.environment === "Moon" ? "sharp Lunar regolith" : "fine Martian sand"}?`,
      `Is a ${design.powerSource} completely safe inside habitat pressurized sectors?`,
      `How does '${design.aiPersonality}' affect crew cognitive fatigue?`,
      `What materials shielding should I add to my robot's joints?`
    ];
    return list;
  };

  const handleSend = () => {
    if (!inputText.trim() || loading) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-neutral-800 flex flex-col h-[520px] overflow-hidden">
      {/* Consultant profile banner */}
      <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-sky-900/60 border border-sky-500/35 flex items-center justify-center font-display text-sky-400 font-bold">
              EV
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-neutral-950 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-100 font-display">Dr. Evelyn Vance</h4>
            <p className="text-[10px] text-neutral-400 font-mono">NASA Senior Scientist & Human-Robot Teaming Subject Matter Expert</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-900 text-neutral-404 text-neutral-300 font-mono border border-neutral-800 uppercase tracking-wider">
            NASA Lab Sync
          </span>
        </div>
      </div>

      {/* Suggestion prompt chips */}
      <div className="bg-neutral-950/80 px-4 py-2 border-b border-neutral-800/80 overflow-x-auto flex gap-2 no-scrollbar">
        {getSuggestions().map((tip, idx) => (
          <button
            key={idx}
            disabled={loading}
            onClick={() => onSendMessage(tip)}
            className="shrink-0 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-full py-1 px-3 text-[10.5px] font-sans text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 max-w-[280px] truncate"
          >
            <HelpCircle className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="truncate">{tip}</span>
          </button>
        ))}
      </div>

      {/* Messages body area scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950/20">
        {messages.map((message) => {
          const isUser = message.sender === "user";
          const isSystem = message.sender === "system";

          if (isSystem) {
            return (
              <div key={message.id} className="flex justify-center my-1.5">
                <span className="bg-sky-950/40 text-sky-300 text-[10.5px] font-mono py-1 px-3.5 rounded-lg border border-sky-850/60 text-center max-w-sm leading-relaxed">
                  {message.text}
                </span>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                  isUser
                    ? "bg-slate-800 text-slate-300 border-slate-700"
                    : "bg-sky-950 text-sky-400 border-sky-900"
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <MessageCircle className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`p-3 rounded-xl border leading-relaxed text-xs ${
                  isUser
                    ? "bg-sky-600/10 border-sky-500/20 text-sky-100 rounded-tr-none"
                    : "bg-neutral-900 border-neutral-800 text-neutral-200 rounded-tl-none whitespace-pre-line"
                }`}
              >
                {message.text}
                <div
                  className={`text-[9px] text-neutral-500 mt-1 font-mono text-right ${
                    isUser ? "text-sky-300/60" : "text-neutral-500"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
            <div className="w-7 h-7 rounded-full bg-sky-950 border border-sky-900 flex items-center justify-center shrink-0 animate-pulse">
              <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-xl rounded-tl-none flex items-center gap-1.5 self-center">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-200" />
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input container */}
      <div className="bg-neutral-950 p-3 border-t border-neutral-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Consult Dr. Vance on planetary design issues..."
          className="flex-1 bg-neutral-900 text-xs rounded-lg border border-neutral-850 px-3 py-2 text-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim() || loading}
          className="bg-sky-600 hover:bg-sky-500 disabled:bg-neutral-800 text-white p-2.5 rounded-lg cursor-pointer transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
