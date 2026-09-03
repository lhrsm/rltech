import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Send, 
  Calculator, 
  Diagram3, 
  CreditCard, 
  Layers, 
  X,
  Terminal
} from 'react-bootstrap-icons';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRfp: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onOpenRfp,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const btn = document.querySelector('[aria-label="Abrir menu de comandos"]') as HTMLButtonElement;
          btn?.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'rfp',
      title: 'Iniciar seu projeto',
      subtitle: 'Envie os requisitos do seu projeto para nossa equipe',
      icon: <Send className="w-4 h-4 text-blue-600" aria-hidden="true" />,
      action: () => {
        onClose();
        onOpenRfp();
      },
    },
    {
      id: 'calc',
      title: 'Calculadora de Escopo & Orçamento',
      subtitle: 'Simule prazo, equipe e investimento estimado',
      icon: <Calculator className="w-4 h-4 text-emerald-600" aria-hidden="true" />,
      action: () => {
        onClose();
        window.location.hash = 'calculadora';
      },
    },
    {
      id: 'n8n',
      title: 'Workflows n8n & Automações com IA',
      subtitle: 'Teste execução de nós de automação em tempo real',
      icon: <Diagram3 className="w-4 h-4 text-amber-600" aria-hidden="true" />,
      action: () => {
        onClose();
        window.location.hash = 'n8n-workflows';
      },
    },
    {
      id: 'card',
      title: 'Cartão Digital Inteligente (vCard / NFC)',
      subtitle: 'Gere arquivo .vcf e visualize perfis dinâmicos',
      icon: <CreditCard className="w-4 h-4 text-purple-600" aria-hidden="true" />,
      action: () => {
        onClose();
        window.location.hash = 'cartao-digital';
      },
    },
    {
      id: 'services',
      title: 'Serviços & Soluções',
      subtitle: 'SaaS, Web Apps, Mobile, E-commerce e Automações',
      icon: <Layers className="w-4 h-4 text-slate-600" aria-hidden="true" />,
      action: () => {
        onClose();
        window.location.hash = 'servicos';
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite para buscar serviços ou ações..."
            className="w-full py-3.5 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Action list */}
        <div className="p-2 max-h-80 overflow-y-auto flex flex-col gap-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Nenhuma ação correspondente para "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 text-left transition-colors group"
              >
                <div className="p-2 rounded-md bg-slate-100 border border-slate-200 group-hover:border-slate-300">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.subtitle}
                  </div>
                </div>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 border border-slate-200 rounded text-slate-500">
                  ↵
                </kbd>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span><kbd className="bg-slate-200 px-1 py-0.5 rounded text-slate-600">ESC</kbd> Fechar</span>
          <span className="text-blue-600 flex items-center gap-1">
            <Terminal className="w-3 h-3" aria-hidden="true" />
            RL Tech Command
          </span>
        </div>
      </div>
    </div>
  );
};
