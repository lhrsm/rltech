import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircleFill, 
  ExclamationCircleFill, 
  ShieldCheck,
  Paperclip,
  Trash
} from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import type { LeadSubmission, LeadResponse } from '../../types';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceType?: string;
  initialMessage?: string;
  initialFeatures?: string[];
  initialBudget?: string;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  initialServiceType = 'saas',
  initialMessage = '',
  initialFeatures = [],
  initialBudget = '5k_15k',
}) => {
  const { t, lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service_type: initialServiceType,
    budget_range: initialBudget,
    timeline: '1_month',
    message: initialMessage,
    selected_features: initialFeatures,
    attachment_name: '',
    attachment_type: '',
    attachment_base64: '',
  });

  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<LeadResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service_type: 'saas',
      budget_range: '5k_15k',
      timeline: '1_month',
      message: '',
      selected_features: [],
      attachment_name: '',
      attachment_type: '',
      attachment_base64: '',
    });
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCloseAndReset = () => {
    resetForm();
    setSubmissionResult(null);
    setErrorMessage(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (!submissionResult) {
        setFormData((prev) => ({
          ...prev,
          service_type: initialServiceType || prev.service_type,
          message: initialMessage || prev.message,
          selected_features: initialFeatures.length > 0 ? initialFeatures : prev.selected_features,
          budget_range: initialBudget || prev.budget_range,
        }));
      }
      setErrorMessage(null);
    }
  }, [isOpen, initialServiceType, initialMessage, initialFeatures, initialBudget, submissionResult]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseAndReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(lang === 'pt' ? 'O arquivo deve ter no máximo 10MB.' : 'File size must be under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        attachment_name: file.name,
        attachment_type: file.type || 'application/octet-stream',
        attachment_base64: base64String,
      }));
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
      });
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    setFormData((prev) => ({
      ...prev,
      attachment_name: '',
      attachment_type: '',
      attachment_base64: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(lang === 'pt' 
        ? 'Por favor, preencha os campos obrigatórios (Nome, E-mail e Detalhes do Projeto).'
        : 'Please fill in the required fields (Name, Email, and Project Description).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.submitLead(formData);
      setSubmissionResult(res);
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.6 }
      });
      // Reset form fields for any subsequent submission
      resetForm();
    } catch (err) {
      setErrorMessage(lang === 'pt' ? 'Erro ao enviar solicitação. Tente novamente.' : 'Error submitting request. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={handleCloseAndReset}
    >
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-2.5 py-0.5 rounded-full border border-[#0a6b3b]/20 mb-1 inline-block">
              {t.modal.badge}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t.modal.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submissionResult ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0a6b3b]/10 border border-[#0a6b3b]/30 flex items-center justify-center text-[#0a6b3b] mx-auto">
                <CheckCircleFill className="w-6 h-6" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {t.modal.successTitle}
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                {t.modal.successSub}
              </p>

              <div className="max-w-xs mx-auto p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Protocol:</span>
                  <span className="text-[#0a6b3b] font-bold">{submissionResult.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SLA:</span>
                  <span className="text-slate-800 font-medium">&lt; {submissionResult.estimated_sla_hours}h</span>
                </div>
              </div>

              <div className="pt-3">
                <Button variant="primary" size="md" onClick={handleCloseAndReset} className="px-8 bg-[#0a6b3b] hover:bg-[#085830]">
                  {t.modal.finish}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-xs">
                  <ExclamationCircleFill className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-medium mb-1 text-xs">
                    {t.modal.name}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'pt' ? 'Seu nome completo' : 'Your full name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#0a6b3b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1 text-xs">
                    {t.modal.email}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={lang === 'pt' ? 'nome@empresa.com' : 'name@company.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#0a6b3b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1 text-xs">
                    {t.modal.company}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'pt' ? 'Nome da sua empresa' : 'Company name'}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#0a6b3b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1 text-xs">
                    {t.modal.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder="+55 (11) 93941-8541"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#0a6b3b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1 text-xs">
                    {t.modal.solution}
                  </label>
                  <select
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                  >
                    <option value="web_apps">{lang === 'pt' ? 'Sites e Aplicações Web' : 'Websites & Web Apps'}</option>
                    <option value="saas">{lang === 'pt' ? 'Aplicações SaaS Personalizadas' : 'Custom SaaS Applications'}</option>
                    <option value="mobile">{lang === 'pt' ? 'Aplicativos Mobile (iOS & Android)' : 'Mobile Apps (iOS & Android)'}</option>
                    <option value="ecommerce">{lang === 'pt' ? 'E-Commerce Sob Medida' : 'Custom E-Commerce'}</option>
                    <option value="digital_card">{lang === 'pt' ? 'Cartão Digital Inteligente' : 'Smart Digital Card'}</option>
                    <option value="n8n_automation">{lang === 'pt' ? 'Automações n8n & IA' : 'n8n & AI Automations'}</option>
                    <option value="full_ecosystem">{lang === 'pt' ? 'Ecossistema Completo' : 'Full Ecosystem'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1 text-xs">
                    {t.modal.budget}
                  </label>
                  <select
                    value={formData.budget_range}
                    onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                  >
                    <option value="1k_5k">{lang === 'pt' ? 'R$ 1.000 a R$ 5.000' : 'R$ 1,000 - R$ 5,000'}</option>
                    <option value="5k_15k">{lang === 'pt' ? 'R$ 5.000 a R$ 15.000' : 'R$ 5,000 - R$ 15,000'}</option>
                    <option value="15k_30k">{lang === 'pt' ? 'R$ 15.000 a R$ 30.000' : 'R$ 15,000 - R$ 30,000'}</option>
                    <option value="30k_50k">{lang === 'pt' ? 'R$ 30.000 a R$ 50.000' : 'R$ 30,000 - R$ 50,000'}</option>
                    <option value="50k_100k">{lang === 'pt' ? 'R$ 50.000 a R$ 100.000' : 'R$ 50,000 - R$ 100,000'}</option>
                    <option value="100k_plus">{lang === 'pt' ? 'Acima de R$ 100.000' : 'Above R$ 100,000'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.modal.desc}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={lang === 'pt' ? 'Conte um pouco sobre sua ideia, funcionalidades esperadas e prazos...' : 'Tell us about your project goals, core features, and expected timeline...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#0a6b3b] focus:outline-none resize-none font-sans"
                />
              </div>

              {/* Anexo de Arquivo / Briefing */}
              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {lang === 'pt' ? 'Anexar Briefing / Arquivo do Pedido (Opcional)' : 'Attach Project Brief / File (Optional)'}
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.txt"
                  className="hidden"
                  id="project-attachment-file"
                />

                {attachedFile ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-900 truncate">
                      <Paperclip className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
                      <span className="font-semibold truncate">{attachedFile.name}</span>
                      <span className="text-emerald-600 text-[11px]">({attachedFile.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-rose-600 hover:text-rose-800 p-1 rounded transition-colors ml-2"
                      title={lang === 'pt' ? 'Remover anexo' : 'Remove attachment'}
                    >
                      <Trash className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="project-attachment-file"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-dashed border-slate-300 hover:border-[#0a6b3b] hover:bg-slate-50 cursor-pointer text-xs text-slate-600 transition-colors"
                  >
                    <Paperclip className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
                    <span>{lang === 'pt' ? 'Clique para anexar PDF, DOCX, Imagem ou ZIP (máx. 10MB)' : 'Click to attach PDF, DOCX, Image or ZIP (max 10MB)'}</span>
                  </label>
                )}
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
                  <span>{t.modal.nda}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="md" onClick={handleCloseAndReset}>
                    {t.modal.cancel}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    rightIcon={<FontAwesomeIcon icon={faPaperPlane} className="text-xs" aria-hidden="true" />}
                    className="bg-[#0a6b3b] hover:bg-[#085830]"
                  >
                    {t.modal.submit}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
