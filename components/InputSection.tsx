import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputSectionProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, isLoading, onGenerate }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800">
        <h2 className="text-sm font-semibold text-slate-300">Input / Prompt</h2>
        <span className="text-xs text-slate-500 hidden sm:inline-block">Cmd + Enter to run</span>
      </div>
      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want the code to do (e.g., 'A GDScript player controller with jump mechanics')"
          className="w-full h-full p-4 bg-transparent text-slate-200 resize-none focus:outline-none font-sans leading-relaxed placeholder:text-slate-600"
          spellCheck={false}
        />
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onGenerate}
            disabled={isLoading || !input.trim()}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold shadow-lg transition-all transform active:scale-95
              ${isLoading || !input.trim() 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:shadow-brand-500/25 hover:from-brand-500 hover:to-indigo-500'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;