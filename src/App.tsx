import React, { useState } from 'react';
import {
  Jurisdiction,
  SupportedLanguage
} from './types';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ChatAssistant } from './components/ChatAssistant';
import { ProductClassifier } from './components/ProductClassifier';
import { PatentGuide } from './components/PatentGuide';
import { TrademarkGuide } from './components/TrademarkGuide';
import { ABSComplianceHelper } from './components/ABSComplianceHelper';
import { TKDLPriorArt } from './components/TKDLPriorArt';
import { InternationalExport } from './components/InternationalExport';
import { KnowledgeGraphViewer } from './components/KnowledgeGraphViewer';
import { AdminDashboard } from './components/AdminDashboard';
import { ArchitectureModal } from './components/ArchitectureModal';
import { HumanEscalationModal } from './components/HumanEscalationModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('assistant');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('india');
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Modals state
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);
  const [escalationQuery, setEscalationQuery] = useState('');
  const [escalationContext, setEscalationContext] = useState('');

  const handleRequestEscalation = (query: string, context?: string) => {
    setEscalationQuery(query);
    setEscalationContext(context || '');
    setIsEscalationOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-white">
      
      {/* 1. Legal Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Top Header with Jurisdiction & Language Controls */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        jurisdiction={jurisdiction}
        onJurisdictionChange={setJurisdiction}
        language={language}
        onLanguageChange={setLanguage}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* 3. Main Content Views */}
      <main className="flex-1 pb-8">
        {currentTab === 'assistant' && (
          <ChatAssistant
            jurisdiction={jurisdiction}
            language={language}
            onRequestEscalation={handleRequestEscalation}
          />
        )}

        {currentTab === 'classifier' && (
          <ProductClassifier />
        )}

        {currentTab === 'patent' && (
          <PatentGuide />
        )}

        {currentTab === 'trademark' && (
          <TrademarkGuide />
        )}

        {currentTab === 'abs' && (
          <ABSComplianceHelper />
        )}

        {currentTab === 'prior-art' && (
          <TKDLPriorArt />
        )}

        {currentTab === 'export' && (
          <InternationalExport />
        )}

        {currentTab === 'graph' && (
          <KnowledgeGraphViewer />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* 4. Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 text-xs py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-200">IP-SAKTI Sahayak</span>
            <span>&bull;</span>
            <span>Smart India Hackathon 2026 (Problem Statement 26045)</span>
          </div>
          <div className="text-[11px] text-stone-500 text-center sm:text-right">
            Ground truth data: Patents Act 1970 &bull; Drugs & Cosmetics Act 1940 &bull; BD Act 2023 &bull; FSSAI 2022 &bull; TKDL
          </div>
        </div>
      </footer>

      {/* 5. Modals */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <HumanEscalationModal
        isOpen={isEscalationOpen}
        onClose={() => setIsEscalationOpen(false)}
        initialQuery={escalationQuery}
        initialContext={escalationContext}
        jurisdiction={jurisdiction}
      />

    </div>
  );
}
