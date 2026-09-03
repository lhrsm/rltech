import React, { useState } from 'react';
import { 
  Diagram3, 
  PlayFill, 
  CheckCircleFill, 
  Terminal, 
  LightningCharge, 
  Database, 
  Robot, 
  ChatDots, 
  Share 
} from 'react-bootstrap-icons';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import type { N8nExecutionResponse } from '../../types';

export const N8nPipelineVisualizer: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('wf-lead-enrichment');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [lastExecution, setLastExecution] = useState<N8nExecutionResponse | null>(null);

  const workflows = [
    {
      id: 'wf-lead-enrichment',
      label: lang === 'pt' ? 'Qualificação de Leads & IA' : 'Lead Enrichment & AI Triage',
      desc: lang === 'pt' ? 'Formulário -> Validação -> Análise IA -> CRM HubSpot -> WhatsApp' : 'Form Intake -> Validation -> LLM Triage -> CRM HubSpot -> WhatsApp Notification',
      latency: '285ms',
    },
    {
      id: 'wf-ecommerce-sync',
      label: lang === 'pt' ? 'Sincronização de Pedidos & NF-e' : 'E-Commerce Order & Invoicing Sync',
      desc: lang === 'pt' ? 'Pagamento -> Baixa no Estoque -> Emissão de NF-e -> Rastreio' : 'Stripe Payment -> Inventory Decrement -> Invoice Generation -> Tracking',
      latency: '310ms',
    },
    {
      id: 'wf-digital-card-scan',
      label: lang === 'pt' ? 'Leitura de Cartão & CRM' : 'Digital Card Tap & CRM Sync',
      desc: lang === 'pt' ? 'Aproximação -> Entrega vCard -> Registro Analytics -> Follow-up' : 'Contactless Tap -> vCard Delivery -> Realtime Analytics -> Email Follow-up',
      latency: '85ms',
    },
  ];

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setActiveStepIndex(0);
    setLastExecution(null);

    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => (prev < 4 ? prev + 1 : prev));
    }, 180);

    try {
      const samplePayload = {
        source: 'RL Tech Simulator Webhook',
        timestamp: new Date().toISOString(),
        client: 'Enterprise Client',
        budget: '$15,000.00',
        modules: ['FastAPI Backend', 'React UI', 'n8n Workflow Hub']
      };

      const result = await api.triggerN8nWorkflow(activeWorkflowId, samplePayload);
      clearInterval(stepInterval);
      setActiveStepIndex(result.steps.length);
      setLastExecution(result);
    } catch (err) {
      clearInterval(stepInterval);
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const icons = [
    <LightningCharge className="w-4 h-4 text-amber-500" aria-hidden="true" />,
    <Database className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />,
    <Robot className="w-4 h-4 text-purple-600" aria-hidden="true" />,
    <Share className="w-4 h-4 text-emerald-600" aria-hidden="true" />,
    <ChatDots className="w-4 h-4 text-sky-600" aria-hidden="true" />
  ];

  return (
    <section id="n8n-workflows" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-3 py-1 rounded-full border border-[#0a6b3b]/20 mb-2 inline-block">
              {t.n8n.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.n8n.title}
            </h2>
            <p className="mt-2 text-base text-slate-600">
              {t.n8n.subhead}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleRunSimulation}
            isLoading={isRunning}
            leftIcon={<PlayFill className="w-4 h-4" aria-hidden="true" />}
            className="shadow-sm bg-[#0a6b3b] hover:bg-[#085830]"
          >
            {isRunning ? t.n8n.running : t.n8n.testButton}
          </Button>
        </div>

        {/* Workflow Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {workflows.map((wf) => {
            const isSelected = wf.id === activeWorkflowId;
            return (
              <button
                key={wf.id}
                type="button"
                onClick={() => {
                  setActiveWorkflowId(wf.id);
                  setLastExecution(null);
                  setActiveStepIndex(-1);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white border-[#0a6b3b] shadow-sm ring-1 ring-[#0a6b3b]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-900">{wf.label}</span>
                  <span className="text-xs font-mono font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-2 py-0.5 rounded">
                    {wf.latency}
                  </span>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">{wf.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Visualizer Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-2">
              <Diagram3 className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
              <span className="text-slate-900 font-semibold">
                {workflows.find((w) => w.id === activeWorkflowId)?.label}
              </span>
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              {t.n8n.engineStatus}
            </span>
          </div>

          {/* Node Progression */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((stepIdx) => (
              <div
                key={stepIdx}
                className={`p-4 rounded-lg border transition-all ${
                  activeStepIndex >= stepIdx
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {icons[stepIdx]}
                  <span className="text-[11px] font-mono font-semibold text-slate-400">
                    {t.n8n.steps[stepIdx]}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">{t.n8n.stepNames[stepIdx]}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.n8n.stepSubs[stepIdx]}</div>
                <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <CheckCircleFill className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span>200 OK</span>
                </div>
              </div>
            ))}
          </div>

          {/* Console */}
          {lastExecution && (
            <div className="mt-4 p-3.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400 font-semibold">Execution completed successfully ({lastExecution.total_duration_ms}ms)</span>
              </div>
              <span className="text-slate-400 text-[11px]">Protocol: {lastExecution.execution_id}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
