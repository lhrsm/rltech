import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Clock, 
  People, 
  Cpu, 
  Check2 
} from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import type { EstimateRequest, EstimateResponse } from '../../types';

interface ScopeCalculatorProps {
  onTransferToRfp: (estimate: EstimateResponse, config: EstimateRequest) => void;
}

export const ScopeCalculator: React.FC<ScopeCalculatorProps> = ({ onTransferToRfp }) => {
  const { t, lang } = useLanguage();
  const [request, setRequest] = useState<EstimateRequest>({
    project_type: 'saas',
    complexity: 'standard',
    platforms: ['web'],
    modules: ['auth_rbac', 'payment_billing', 'n8n_workflows'],
    sla_tier: 'standard',
    target_timeline_weeks: 8,
  });

  const [estimate, setEstimate] = useState<EstimateResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCalc = async () => {
      try {
        const res = await api.calculateEstimate(request);
        if (isMounted) setEstimate(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCalc();
    return () => {
      isMounted = false;
    };
  }, [request]);

  const projectTypes = [
    { id: 'web_app', label: lang === 'pt' ? 'Sites e Aplicações Web' : 'Websites & Web Apps' },
    { id: 'saas', label: lang === 'pt' ? 'Plataforma SaaS & Web' : 'SaaS & Cloud Platforms' },
    { id: 'mobile_app', label: lang === 'pt' ? 'Aplicativo Mobile (iOS & Android)' : 'Mobile Apps (iOS & Android)' },
    { id: 'ecommerce', label: lang === 'pt' ? 'E-Commerce Sob Medida' : 'Custom E-Commerce' },
    { id: 'digital_card', label: lang === 'pt' ? 'Cartão Digital Inteligente' : 'Smart Digital Cards' },
    { id: 'n8n_automation', label: lang === 'pt' ? 'Automações n8n & IA' : 'n8n & AI Automations' },
    { id: 'full_ecosystem', label: lang === 'pt' ? 'Ecossistema Completo (Web + App)' : 'Full Ecosystem (Web + App)' },
  ];

  const complexities = [
    { id: 'mvp', label: lang === 'pt' ? 'MVP Ágil' : 'Agile MVP', desc: lang === 'pt' ? 'Validação rápida de hipóteses' : 'Fast hypothesis validation' },
    { id: 'standard', label: lang === 'pt' ? 'Padrão Comercial' : 'Commercial Standard', desc: lang === 'pt' ? 'Estrutura completa para vendas' : 'Complete sales setup' },
    { id: 'enterprise', label: lang === 'pt' ? 'Enterprise / Escala' : 'Enterprise Scale', desc: lang === 'pt' ? 'Alta concorrência e integrações' : 'High volume & integrations' },
  ];

  const availableModules = [
    { id: 'auth_rbac', label: lang === 'pt' ? 'Autenticação & Controle de Acessos' : 'Authentication & RBAC' },
    { id: 'payment_billing', label: lang === 'pt' ? 'Faturamento & Pagamentos (Stripe/PIX)' : 'Billing & Payments (Stripe)' },
    { id: 'n8n_workflows', label: lang === 'pt' ? 'Automações & Webhooks n8n' : 'n8n Automations & Webhooks' },
    { id: 'ai_agent', label: lang === 'pt' ? 'Agente de IA Integrado (OpenAI)' : 'Integrated AI Agent (OpenAI)' },
    { id: 'cms_headless', label: lang === 'pt' ? 'Painel de Gestão de Conteúdo' : 'Custom Content CMS' },
    { id: 'bi_analytics', label: lang === 'pt' ? 'Relatórios & Telemetria' : 'Analytics & Telemetry' },
  ];

  const toggleModule = (modId: string) => {
    setRequest((prev) => {
      const exists = prev.modules.includes(modId);
      return {
        ...prev,
        modules: exists ? prev.modules.filter((m) => m !== modId) : [...prev.modules, modId],
      };
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { 
      style: 'currency', 
      currency: lang === 'pt' ? 'BRL' : 'USD', 
      maximumFractionDigits: 0 
    }).format(lang === 'pt' ? val : val / 5.2);
  };

  return (
    <section id="calculadora" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-3 py-1 rounded-full border border-[#0a6b3b]/20 mb-3 inline-block">
            {t.calculator.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.calculator.subhead}
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Selectors */}
          <div className="lg:col-span-7 flex flex-col gap-6 rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7">
            {/* 1. Solution Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {t.calculator.sec1Title}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((pt) => {
                  const isSelected = request.project_type === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setRequest({ ...request, project_type: pt.id })}
                      className={`p-3 rounded-lg border text-left text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-[#0a6b3b]/10 border-[#0a6b3b] text-[#0a6b3b] font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {pt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Complexity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {t.calculator.sec2Title}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {complexities.map((comp) => {
                  const isSelected = request.complexity === comp.id;
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setRequest({ ...request, complexity: comp.id })}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#0a6b3b]/10 border-[#0a6b3b] text-[#0a6b3b] shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-sm font-semibold">{comp.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{comp.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Modules */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {t.calculator.sec3Title}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableModules.map((mod) => {
                  const isChecked = request.modules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs sm:text-sm transition-all ${
                        isChecked
                          ? 'bg-[#0a6b3b]/10 border-[#0a6b3b] text-[#0a6b3b] font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#0a6b3b] border-[#0a6b3b] text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check2 className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />}
                      </div>
                      <span>{mod.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Output */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg shadow-slate-200/50 flex flex-col justify-between sticky top-24">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Calculator className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
                  <span>{t.calculator.projectionTitle}</span>
                </div>
                <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-2.5 py-0.5 rounded-full border border-[#0a6b3b]/20">
                  {t.calculator.liveBadge}
                </span>
              </div>

              {estimate ? (
                <div className="space-y-5">
                  {/* Price */}
                  <div className="p-4 rounded-xl bg-[#0a6b3b]/10 border border-[#0a6b3b]/20">
                    <div className="text-xs font-semibold text-[#0a6b3b] uppercase tracking-wide">
                      {t.calculator.investTitle}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0a6b3b] mt-1">
                      {formatCurrency(estimate.estimated_cost_brl_min)} - {formatCurrency(estimate.estimated_cost_brl_max)}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {t.calculator.investSub}
                    </p>
                  </div>

                  {/* Weeks & Hours */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#0a6b3b]" aria-hidden="true" />
                        <span>{t.calculator.timeline}</span>
                      </div>
                      <div className="text-base font-bold text-slate-900 mt-1">
                        {estimate.estimated_weeks_min} - {estimate.estimated_weeks_max} {t.calculator.weeks}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Cpu className="w-3.5 h-3.5 text-[#0a6b3b]" aria-hidden="true" />
                        <span>{t.calculator.hours}</span>
                      </div>
                      <div className="text-base font-bold text-slate-900 mt-1">
                        {estimate.breakdown.total_hours}h
                      </div>
                    </div>
                  </div>

                  {/* Squad */}
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                      <People className="w-3.5 h-3.5 text-[#0a6b3b]" aria-hidden="true" />
                      <span>{t.calculator.squad}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {estimate.recommended_team.map((member, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Action Button with FontAwesome Icon */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                onClick={() => estimate && onTransferToRfp(estimate, request)}
                rightIcon={<FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />}
                className="w-full py-3 shadow-md text-base bg-[#0a6b3b] hover:bg-[#085830]"
              >
                {t.calculator.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
