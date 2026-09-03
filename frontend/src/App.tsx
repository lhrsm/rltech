import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { ProcessSection } from './components/sections/ProcessSection';
import { Footer } from './components/layout/Footer';
import { CommandMenu } from './components/layout/CommandMenu';
import { LeadFormModal } from './components/sections/LeadFormModal';
import { LanguageProvider } from './context/LanguageContext';

const MainContent: React.FC = () => {
  const [rfpModalOpen, setRfpModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // RFP Prefilled State
  const [rfpServiceType, setRfpServiceType] = useState('saas');
  const [rfpInitialMessage, setRfpInitialMessage] = useState('');
  const [rfpSelectedFeatures, setRfpSelectedFeatures] = useState<string[]>([]);
  const [rfpInitialBudget] = useState('50k_100k');

  const handleOpenRfpDefault = () => {
    setRfpServiceType('saas');
    setRfpInitialMessage('');
    setRfpSelectedFeatures([]);
    setRfpModalOpen(true);
  };

  const handleSelectServiceForRfp = (serviceId: string) => {
    setRfpServiceType(serviceId);
    setRfpInitialMessage(`Gostaria de solicitar um orçamento e proposta para ${serviceId.toUpperCase()}.`);
    setRfpModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0a6b3b]/20 selection:text-[#0a6b3b]">
      {/* Navbar */}
      <Navbar
        onOpenRfp={handleOpenRfpDefault}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero
          onOpenRfp={handleOpenRfpDefault}
        />

        {/* 2. Services Grid */}
        <ServicesGrid onSelectServiceForRfp={handleSelectServiceForRfp} />

        {/* 3. Agile Methodology & Process */}
        <ProcessSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Action Command Menu (⌘K) */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenRfp={handleOpenRfpDefault}
      />

      {/* RFP Proposal Modal */}
      <LeadFormModal
        isOpen={rfpModalOpen}
        onClose={() => setRfpModalOpen(false)}
        initialServiceType={rfpServiceType}
        initialMessage={rfpInitialMessage}
        initialFeatures={rfpSelectedFeatures}
        initialBudget={rfpInitialBudget}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;
