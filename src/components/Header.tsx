import React from 'react';
import {
  Jurisdiction,
  SupportedLanguage,
  SUPPORTED_LANGUAGES
} from '../types';
import {
  Globe,
  Sparkles,
  BookOpen,
  FileText,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  jurisdiction: Jurisdiction;
  onJurisdictionChange: (jurisdiction: Jurisdiction) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  jurisdiction,
  onJurisdictionChange,
  language,
  onLanguageChange,
  onOpenArchitecture,
}) => {
  const navItems = [
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'classifier', label: 'Product Classifier', icon: SlidersHorizontal },
    { id: 'patent', label: 'Patent Guidance', icon: FileText },
    { id: 'trademark', label: 'Trademark Guidance', icon: Compass },
    { id: 'abs', label: 'ABS Compliance', icon: Globe },
    { id: 'prior-art', label: 'TKDL & Prior Art', icon: BookOpen },
    { id: 'export', label: 'International Export', icon: Globe },
    { id: 'graph', label: 'Knowledge Graph', icon: Sparkles },
    { id: 'admin', label: 'Admin & KB', icon: FileText }
  ];

  return (
    <header className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner with Tricolor & Ayush Motif */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-stone-200 to-emerald-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-emerald-700 flex items-center justify-center text-white font-serif font-bold text-xl shadow-inner border border-amber-400/30">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl tracking-tight font-bold text-stone-50">
                  IP-SAKTI Sahayak
                </h1>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  SIH 2026 PS 26045
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Multilingual, RAG-based AI assistant for Intellectual Property & regulatory guidance in Ayurveda
              </p>
            </div>
          </div>

          {/* Controls: Jurisdiction Switch, Language, Architecture Blueprint */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Jurisdiction Toggle */}
            <div className="flex items-center bg-stone-800 p-0.5 rounded-lg border border-stone-700 text-xs shadow-inner">
              <button
                id="jurisdiction-india-btn"
                type="button"
                onClick={() => onJurisdictionChange('india')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  jurisdiction === 'india'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-stone-750'
                }`}
              >
                <span>🇮🇳</span>
                <span>India</span>
              </button>
              <button
                id="jurisdiction-intl-btn"
                type="button"
                onClick={() => onJurisdictionChange('international')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  jurisdiction === 'international'
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-stone-750'
                }`}
              >
                <span>🌎</span>
                <span>International</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                id="language-select-dropdown"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
                title="Select language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Architecture Dossier Button */}
            <button
              id="architecture-modal-trigger-btn"
              type="button"
              onClick={onOpenArchitecture}
              className="text-xs bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SIH Architecture</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
