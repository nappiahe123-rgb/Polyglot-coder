import React, { useState } from 'react';
import { GeneratedResult, Language } from '../types';
import { Check, Copy, Terminal, Download } from 'lucide-react';

interface OutputSectionProps {
  result: GeneratedResult | null;
  language: Language;
  isLoading: boolean;
  error: string | null;
}

const OutputSection: React.FC<OutputSectionProps> = ({ result, language, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result?.code) return;
    
    const blob = new Blob([result.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated.${language.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
          <p className="text-brand-200 font-medium animate-pulse">Translating to {language.name}...</p>
        </div>
        <div className="p-4 space-y-3 opacity-20">
          <div className="h-4 bg-slate-600 rounded w-1/3"></div>
          <div className="h-4 bg-slate-600 rounded w-1/2"></div>
          <div className="h-4 bg-slate-600 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-red-900/50 overflow-hidden justify-center items-center p-6 text-center">
        <div className="bg-red-500/10 p-3 rounded-full text-red-400 mb-3">
            <Terminal size={32} />
        </div>
        <h3 className="text-red-400 font-semibold text-lg mb-2">Generation Failed</h3>
        <p className="text-slate-400 max-w-sm">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden justify-center items-center text-slate-600">
        <Terminal size={48} className="mb-4 opacity-50" />
        <p className="font-medium">Ready to code.</p>
        <p className="text-sm mt-1">Select a language and enter a prompt.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
           <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
           <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
           <span className="ml-3 text-sm font-mono text-slate-400">{language.name} Output</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
            title="Download Code"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar relative group">
        <pre className="p-4 font-mono text-sm leading-relaxed text-brand-50 tab-4">
            <code>{result.code}</code>
        </pre>
      </div>
      
      {result.explanation && (
        <div className="border-t border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
          <strong className="text-slate-300 block mb-1">Insight:</strong>
          {result.explanation}
        </div>
      )}
    </div>
  );
};

export default OutputSection;