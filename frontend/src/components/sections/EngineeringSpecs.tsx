import React from 'react';
import { 
  CodeSlash, 
  ShieldCheck, 
  Cpu, 
  HddNetwork, 
  Check2, 
  Terminal 
} from 'react-bootstrap-icons';
import { Badge } from '../ui/Badge';

export const EngineeringSpecs: React.FC = () => {
  const pillars = [
    {
      title: 'Clean Architecture & Type Safety',
      badge: 'ROBUSTNESS',
      desc: 'Separação estrita entre Domínio, Casos de Uso e Adaptadores. Tipagem completa no frontend (TypeScript) e backend (Pydantic v2).',
      points: ['Validação estrita de I/O em runtime', 'Testes unitários e de integração automatizados'],
      icon: <CodeSlash className="w-4 h-4 text-emerald-400" aria-hidden="true" />
    },
    {
      title: 'Multi-Tenancy & Segurança',
      badge: 'SECURITY',
      desc: 'Isolamento de dados por cliente no PostgreSQL via Row-Level Security, criptografia AES-256 e autenticação OAuth2 / JWT.',
      points: ['Controle de acesso granular RBAC', 'Headers de segurança e compliance LGPD/SOC 2'],
      icon: <ShieldCheck className="w-4 h-4 text-sky-400" aria-hidden="true" />
    },
    {
      title: 'Automações n8n em Alta Disponibilidade',
      badge: 'ORCHESTRATION',
      desc: 'Clusters dedicados de execução n8n com filas assíncronas, Dead-Letter Queues (DLQ) e recuperação automática.',
      points: ['Webhooks protegidos com assinatura HMAC', 'Fallback inteligente entre provedores de IA'],
      icon: <Cpu className="w-4 h-4 text-amber-400" aria-hidden="true" />
    },
    {
      title: 'Deploy Contínuo & Edge Delivery',
      badge: 'INFRASTRUCTURE',
      desc: 'Conteinerização Docker, esteiras CI/CD automatizadas no GitHub Actions e distribuição global via Cloudflare Edge CDN.',
      points: ['Builds otimizados multi-estágio', 'Observabilidade com métricas em tempo real'],
      icon: <HddNetwork className="w-4 h-4 text-purple-400" aria-hidden="true" />
    }
  ];

  return (
    <section id="engenharia" className="py-20 border-t border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="emerald" size="sm">
              PADRÕES TÉCNICOS
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Diretrizes de Arquitetura & Código Limpo
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Padrões globais de desenvolvimento sem soluções improvisadas ou código frágil.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-zinc-800 bg-[#0e1015] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  {pillar.desc}
                </p>
              </div>

              <ul className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs text-zinc-300">
                {pillar.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <Check2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Minimal Terminal */}
        <div className="rounded-lg border border-zinc-800 bg-[#07080b] p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-zinc-400 text-[11px]">
            <span className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              <span>architecture_blueprint.py</span>
            </span>
            <span className="text-zinc-500">FastAPI · Pydantic v2 · Clean Arch</span>
          </div>

          <pre className="text-zinc-300 overflow-x-auto leading-relaxed text-[11px]">
            <code>
{`@router.post("/api/pipeline/execute", response_model=ServiceExecutionResponse)
async def execute_enterprise_workflow(
    payload: StrictValidatedPayload,
    auth: AuthenticatedUser = Depends(verify_bearer_jwt)
) -> ServiceExecutionResponse:
    async with TenantContextManager(auth.tenant_id):
        result = await AutomationEngine.dispatch_n8n_event(
            event_id=payload.id,
            schema=payload.model_dump(),
            priority=payload.calculated_priority
        )
        return result`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};
