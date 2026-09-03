import React from 'react';
import { 
  Layers, 
  Globe2, 
  Phone, 
  Cart3, 
  CreditCard, 
  Diagram3, 
  Check2
} from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext';
import type { ServiceCategory } from '../../types';

interface ServicesGridProps {
  onSelectServiceForRfp: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForRfp }) => {
  const { t } = useLanguage();

  const services: {
    id: ServiceCategory;
    title: string;
    badge: string;
    description: string;
    highlights: string[];
    icon: React.ReactNode;
  }[] = [
    {
      id: 'web_apps',
      title: t.services.items.webApps.title,
      badge: t.services.items.webApps.badge,
      description: t.services.items.webApps.desc,
      highlights: t.services.items.webApps.points,
      icon: <Globe2 className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />
    },
    {
      id: 'saas',
      title: t.services.items.saas.title,
      badge: t.services.items.saas.badge,
      description: t.services.items.saas.desc,
      highlights: t.services.items.saas.points,
      icon: <Layers className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />
    },
    {
      id: 'mobile',
      title: t.services.items.mobile.title,
      badge: t.services.items.mobile.badge,
      description: t.services.items.mobile.desc,
      highlights: t.services.items.mobile.points,
      icon: <Phone className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />
    },
    {
      id: 'ecommerce',
      title: t.services.items.ecommerce.title,
      badge: t.services.items.ecommerce.badge,
      description: t.services.items.ecommerce.desc,
      highlights: t.services.items.ecommerce.points,
      icon: <Cart3 className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />
    },
    {
      id: 'digital_card',
      title: t.services.items.digitalCard.title,
      badge: t.services.items.digitalCard.badge,
      description: t.services.items.digitalCard.desc,
      highlights: t.services.items.digitalCard.points,
      icon: <CreditCard className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />
    },
    {
      id: 'n8n_automation',
      title: t.services.items.n8n.title,
      badge: t.services.items.n8n.badge,
      description: t.services.items.n8n.desc,
      highlights: t.services.items.n8n.points,
      icon: <Diagram3 className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without top badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.services.subhead}
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-7 rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md hover:border-[#0a6b3b]/40 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#0a6b3b]/10 border border-[#0a6b3b]/20">
                    {svc.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#0a6b3b] bg-[#0a6b3b]/10 px-2.5 py-1 rounded-full border border-[#0a6b3b]/20">
                    {svc.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {svc.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-700">
                  {svc.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check2 className="w-4 h-4 text-[#0a6b3b] shrink-0" aria-hidden="true" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectServiceForRfp(svc.id)}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-[#0a6b3b] hover:text-white bg-[#0a6b3b]/10 hover:bg-[#0a6b3b] py-2.5 px-4 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#0a6b3b]"
                >
                  <span>{t.services.startProject}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs ml-1" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
