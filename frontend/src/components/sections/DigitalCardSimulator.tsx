import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Share, 
  Check2, 
  Telephone, 
  Envelope, 
  Globe, 
  Wifi
} from 'react-bootstrap-icons';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import type { VCardProfile } from '../../types';

export const DigitalCardSimulator: React.FC = () => {
  const { t, lang } = useLanguage();
  const [profile, setProfile] = useState<VCardProfile>({
    name: 'Alexandre Silva',
    title: lang === 'pt' ? 'Head of Solutions & Technology' : 'Head of Engineering & Solutions',
    company: 'RL Tech Solutions',
    phone: '+351 926 527 934',
    email: 'alexandre@rltech.io',
    website: 'https://rltech.io',
    bio: 'Custom Software, SaaS Architectures and Intelligent AI Automations.',
    theme: 'minimal-dark',
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await api.downloadVCard(profile);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.website);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cartao-digital" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-3 py-1 rounded-full border border-[#0a6b3b]/20 mb-3 inline-block">
            {t.digitalCard.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.digitalCard.title}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.digitalCard.subhead}
          </p>
        </div>

        {/* Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7">
            <div className="text-sm font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200 flex items-center justify-between">
              <span>{t.digitalCard.cardTitle}</span>
              <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-2 py-0.5 rounded">
                vCard 3.0 Standard
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.digitalCard.fields.name}
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.digitalCard.fields.title}
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.digitalCard.fields.company}
                </label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.digitalCard.fields.phone}
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.digitalCard.fields.email}
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-xs">
                  {t.digitalCard.fields.website}
                </label>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#0a6b3b] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Wifi className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
                {t.digitalCard.compat}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownload}
                isLoading={isDownloading}
                leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}
                className="bg-[#0a6b3b] hover:bg-[#085830]"
              >
                {t.digitalCard.downloadBtn}
              </Button>
            </div>
          </div>

          {/* Right: Live Card & Mobile Box */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* Physical Card Mockup */}
            <div className="w-full max-w-sm rounded-xl p-6 bg-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0a6b3b] flex items-center justify-center text-white">
                    <CreditCard className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                    RL SMART CARD
                  </span>
                </div>
                <Wifi className="w-4 h-4 rotate-90 text-[#0a6b3b]" aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold text-white tracking-tight">{profile.name}</div>
                <div className="text-xs text-[#0a6b3b] font-medium">{profile.title}</div>
                <div className="text-xs text-slate-400">{profile.company}</div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>DIGITAL CHIP</span>
                <span className="text-emerald-400 font-semibold">CONTACTLESS</span>
              </div>
            </div>

            {/* Mobile PWA Box */}
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-md">
              <div className="text-center pb-3 border-b border-slate-100">
                <div className="font-bold text-slate-900">{profile.name}</div>
                <div className="text-xs text-slate-500">{profile.company}</div>
              </div>

              <div className="space-y-2 my-4 text-xs text-slate-700">
                <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <Telephone className="w-3.5 h-3.5 text-[#0a6b3b]" aria-hidden="true" />
                  <span className="font-medium">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <Envelope className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                  <span className="font-medium">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <Globe className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
                  <span className="font-medium">{profile.website}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDownload}
                  isLoading={isDownloading}
                  leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}
                  className="flex-1 text-xs py-2 bg-[#0a6b3b] hover:bg-[#085830]"
                >
                  {t.digitalCard.saveBtn}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyLink}
                  leftIcon={copied ? <Check2 className="w-3.5 h-3.5 text-[#0a6b3b]" aria-hidden="true" /> : <Share className="w-3.5 h-3.5" aria-hidden="true" />}
                  className="text-xs py-2"
                >
                  {copied ? t.digitalCard.copied : t.digitalCard.shareBtn}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
