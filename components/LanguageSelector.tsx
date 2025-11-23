import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { Language } from '../types';
import { ChevronDown, Code2 } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelect }) => {
  return (
    <div className="relative group w-full sm:w-64">
      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
        Target Language
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-400">
          <Code2 size={18} />
        </div>
        <select
          value={selectedLanguage.id}
          onChange={(e) => {
            const lang = SUPPORTED_LANGUAGES.find(l => l.id === e.target.value);
            if (lang) onSelect(lang);
          }}
          className="appearance-none w-full bg-slate-800 border border-slate-700 text-slate-100 py-3 pl-10 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer font-medium hover:bg-slate-750"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;