import React, { useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, INITIAL_INPUT } from './constants';
import { Language, GeneratedResult, GenerationStatus } from './types';
import { generateCodeFromPrompt } from './services/geminiService';
import LanguageSelector from './components/LanguageSelector';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { Boxes } from 'lucide-react';

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [input, setInput] = useState<string>(() => {
    return localStorage.getItem('polyglot_input') || INITIAL_INPUT;
  });
  
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const savedLangId = localStorage.getItem('polyglot_lang_id');
    return SUPPORTED_LANGUAGES.find(l => l.id === savedLangId) || SUPPORTED_LANGUAGES[0];
  });

  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Persist input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('polyglot_input', input);
  }, [input]);

  // Persist selected language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('polyglot_lang_id', selectedLanguage.id);
  }, [selectedLanguage]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setStatus(GenerationStatus.LOADING);
    setError(null);

    try {
      const data = await generateCodeFromPrompt(input, selectedLanguage.name);
      setResult(data);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setStatus(GenerationStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-500/30 selection:text-brand-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-brand-500 to-indigo-600 p-2 rounded-lg shadow-lg shadow-brand-500/20">
              <Boxes size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Polyglot Coder
              </h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
             <span>Powered by Gemini 2.5</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
            <LanguageSelector 
              selectedLanguage={selectedLanguage} 
              onSelect={setSelectedLanguage} 
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
          {/* Left: Input */}
          <div className="h-full">
            <InputSection 
              input={input} 
              setInput={setInput} 
              isLoading={status === GenerationStatus.LOADING}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Right: Output */}
          <div className="h-full">
            <OutputSection 
              result={result} 
              language={selectedLanguage}
              isLoading={status === GenerationStatus.LOADING}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;