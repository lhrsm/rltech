import React from 'react';
import { 
  GraphUpArrow, 
  CashCoin, 
  LightningChargeFill, 
  RocketTakeoff 
} from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

interface HeroProps {
  onOpenRfp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfp }) => {
  const { t, lang } = useLanguage();
  const whatsappMsg = lang === 'pt' 
    ? 'Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto.'
    : 'Hello%2C%20I%20would%20like%20to%20discuss%20a%20project.';
  const whatsappUrl = `https://wa.me/5511939418541?text=${whatsappMsg}`;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-white bg-grid-subtle-light bg-radial-glow-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto">
          {t.hero.titlePart1}
          <span className="text-[#0a6b3b]">{t.hero.titleHighlight}</span>
          {t.hero.titlePart2}
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subhead}
        </p>

        {/* Action CTAs with FontAwesome Icons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenRfp}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} className="text-sm" aria-hidden="true" />}
            className="w-full sm:w-auto px-7 shadow-md hover:shadow-lg transition-shadow text-base bg-[#0a6b3b] hover:bg-[#085830]"
          >
            {t.hero.startProject}
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 h-11 text-base font-medium rounded-md border border-slate-300 hover:border-[#0a6b3b] bg-white hover:bg-[#0a6b3b]/5 text-slate-800 hover:text-[#0a6b3b] shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a6b3b]"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-[#0a6b3b] text-lg" aria-hidden="true" />
            <span>{t.hero.letsTalk}</span>
          </a>
        </div>

        {/* Value Proposition Cards */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-[#0a6b3b]/40 hover:bg-white transition-all">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <GraphUpArrow className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
              <span>{t.hero.valueProp1Title}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.hero.valueProp1Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-[#0a6b3b]/40 hover:bg-white transition-all">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CashCoin className="w-4 h-4 text-[#0a6b3b]" aria-hidden="true" />
              <span>{t.hero.valueProp2Title}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.hero.valueProp2Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-[#0a6b3b]/40 hover:bg-white transition-all">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <LightningChargeFill className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>{t.hero.valueProp3Title}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.hero.valueProp3Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-[#0a6b3b]/40 hover:bg-white transition-all">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <RocketTakeoff className="w-4 h-4 text-purple-600" aria-hidden="true" />
              <span>{t.hero.valueProp4Title}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.hero.valueProp4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
