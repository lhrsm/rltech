import React from 'react';
import { 
  Search, 
  Palette, 
  CodeSlash, 
  RocketTakeoff 
} from 'react-bootstrap-icons';
import { useLanguage } from '../../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Search className="w-5 h-5 text-[#0a6b3b]" aria-hidden="true" />,
    <Palette className="w-5 h-5 text-purple-600" aria-hidden="true" />,
    <CodeSlash className="w-5 h-5 text-emerald-600" aria-hidden="true" />,
    <RocketTakeoff className="w-5 h-5 text-amber-600" aria-hidden="true" />
  ];

  return (
    <section id="sobre" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without top badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.process.title}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.process.subhead}
          </p>
        </div>

        {/* Clean 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md hover:border-[#0a6b3b]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    {icons[idx]}
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300 font-mono">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
