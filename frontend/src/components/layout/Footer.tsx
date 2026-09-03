import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Git 
} from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  const whatsappMsg = lang === 'pt' 
    ? 'Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto.'
    : 'Hello%2C%20I%20would%20like%20to%20discuss%20a%20project.';
  const whatsappUrl = `https://wa.me/5511939418541?text=${whatsappMsg}`;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="RL Tech" 
                className="h-8 w-auto object-contain brightness-110"
              />
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                RL Tech
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
                {t.footer.security}
              </span>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-400" aria-hidden="true" />
                99.98% SLA
              </span>
            </div>
          </div>

          {/* Solutions Col */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.solutionsTitle}
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-400">
              <li><a href="#servicos" className="hover:text-white transition-colors">{t.services.items.webApps.title}</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">{t.services.items.saas.title}</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">{t.services.items.mobile.title}</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">{t.services.items.digitalCard.title}</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">{t.services.items.n8n.title}</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.contactTitle}
            </h4>
            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <a href="mailto:Ricardoliveira2974@gmail.com" className="font-medium text-slate-200 hover:text-white transition-colors">
                Ricardoliveira2974@gmail.com
              </a>
              <span>São Paulo, SP · Brasil</span>
              <span className="text-slate-400">+55 (11) 93941-8541</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 mt-1 font-medium"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-sm" aria-hidden="true" />
                <span>{t.footer.letsTalk}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} RL Tech Solutions. {t.footer.rights}
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Git className="w-3.5 h-3.5 text-[#0a6b3b]" aria-hidden="true" />
            <span>v2.0 · i18n Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
