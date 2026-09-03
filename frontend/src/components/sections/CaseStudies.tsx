import React from 'react';
import { 
  Building, 
  Diagram3, 
  CreditCard,
  Cart
} from 'react-bootstrap-icons';
import { Badge } from '../ui/Badge';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      client: 'Fintech & Pagamentos',
      segment: 'SaaS B2B Enterprise',
      title: 'Plataforma Multi-tenant de Liquidação com FastAPI e React',
      summary: 'Processamento de transações bancárias e conciliação em lote com latência média inferior a 25ms.',
      metrics: [
        { label: 'Volume', value: '+R$ 140M/mês' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Latência', value: '22ms' }
      ],
      techStack: ['FastAPI', 'React', 'PostgreSQL'],
      icon: <Building className="w-4 h-4 text-emerald-600" aria-hidden="true" />
    },
    {
      client: 'Logística Global',
      segment: 'Automação n8n & IA',
      title: 'Pipeline com n8n e LLMs para Triagem de Cargas e Faturamento',
      summary: 'Eliminação de 35h semanais de digitação manual de notas fiscais com OCR e IA generativa.',
      metrics: [
        { label: 'Tempo Manual', value: '-82%' },
        { label: 'Runs Diários', value: '+18k' },
        { label: 'Precisão', value: '99.9%' }
      ],
      techStack: ['n8n Enterprise', 'OpenAI', 'Slack'],
      icon: <Diagram3 className="w-4 h-4 text-amber-600" aria-hidden="true" />
    },
    {
      client: 'Grupo Corporativo',
      segment: 'Cartão Digital NFC',
      title: 'Cartões NFC Inteligentes para 3.500 Colaboradores',
      summary: 'Ecossistema com micro-app PWA, gerador dinâmico de vCard 3.0 e painel de analytics.',
      metrics: [
        { label: 'Taps NFC', value: '+85.000' },
        { label: 'Papel', value: '100% Zero' },
        { label: 'Conversão', value: '+48%' }
      ],
      techStack: ['PWA', 'FastAPI vCard', 'NTAG216'],
      icon: <CreditCard className="w-4 h-4 text-purple-600" aria-hidden="true" />
    },
    {
      client: 'Varejo & D2C',
      segment: 'E-Commerce Headless',
      title: 'Storefront Headless em Next.js com Checkout em Sub-segundo',
      summary: 'Modernização de arquitetura legada com checkout integrado e antifraude em tempo real.',
      metrics: [
        { label: 'Conversão', value: '+4.2 p.p.' },
        { label: 'PageSpeed', value: '99/100' },
        { label: 'Checkout', value: '6.4s' }
      ],
      techStack: ['Next.js', 'Stripe', 'Redis'],
      icon: <Cart className="w-4 h-4 text-sky-600" aria-hidden="true" />
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="slate" size="sm" className="mb-3">
            IMPACTO
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Resultados Comprovados em Produção
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Métricas reais de soluções entregues para empresas em crescimento e corporações.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((cs, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      {cs.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{cs.client}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                    {cs.segment}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {cs.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {cs.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 my-5 pt-4 border-t border-slate-200">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{m.label}</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                {cs.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-600">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
