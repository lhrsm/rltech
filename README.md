# RL Tech | Enterprise Software Engineering & Automation Studio

Plataforma corporativa de alto padrão da **RL Tech**, consultoria e software house especializada em desenvolvimento de Web Apps, plataformas SaaS escaláveis, Aplicativos Mobile (iOS/Android), E-Commerce Headless, Cartões Digitais Inteligentes (NFC/vCard) e Automações com n8n & IA.

Desenvolvido rigorosamente sob as diretrizes visuais e arquiteturais do Vale do Silício (**Linear, Stripe, Vercel e Raycast**):
- **Zero emojis** em toda a interface;
- Tipografia densa e de alta legibilidade (`Inter` e `JetBrains Mono` com `tracking-tight`);
- Bordas sutis de 1px (`border-zinc-800`), raio de curvatura preciso (`rounded-md` / `rounded-lg`, 6–8px);
- Ícones vetoriais SVG com espessura uniforme (`lucide-react`);
- Microinterações rápidas e mecânicas (100–150ms);
- Acessibilidade e semântica estrita (WCAG AA, anéis de foco acessíveis via teclado, ARIA).

---

## Arquitetura do Sistema

```
RL Tech/
├── backend/
│   ├── app/
│   │   ├── main.py                  # API FastAPI com CORS e roteamento
│   │   ├── config.py                # Configurações de ambiente
│   │   ├── schemas/                 # Schemas Pydantic v2 (Validação estrita)
│   │   │   ├── lead.py              # Validação de RFPs e contatos técnicos
│   │   │   ├── estimate.py          # Cálculo de escopo e horas de engenharia
│   │   │   └── automation.py        # Schemas para simulação de workflows n8n
│   │   ├── routers/                 # Endpoints RESTful
│   │   │   ├── leads.py             # POST /api/leads
│   │   │   ├── estimates.py         # POST /api/estimates/calculate
│   │   │   ├── vcard.py             # POST /api/vcard/generate & GET /api/vcard/qr
│   │   │   ├── automations.py       # POST /api/automations/trigger
│   │   │   └── telemetry.py         # GET /api/system/health & /api/system/metrics
│   │   └── services/
│   │       ├── lead_service.py      # Qualificação e regras de SLA
│   │       └── vcard_service.py     # Gerador de vCard 3.0 (RFC 2426) & QR Code
│   ├── test_api.py                  # Suíte de testes de integração automatizados
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── index.css                # Paleta Linear/Stripe, grid sutil e reset
│   │   ├── App.tsx                  # Componente raiz montando as seções
│   │   ├── types/index.ts           # Definições de tipos TypeScript
│   │   ├── services/api.ts          # Cliente HTTP tipado com fallback offline
│   │   ├── components/
│   │   │   ├── ui/                  # Design System (Badge, Button, Card, Skeleton, Tabs, Toast)
│   │   │   ├── layout/              # Navbar com status ao vivo, Footer e CommandMenu (⌘K)
│   │   │   ├── sections/            # Hero, Matriz de Serviços, Simulador n8n, Cartão NFC, Calculadora, Specs, Case Studies, RFP Modal
│   │   │   └── modules/             # TelemetryBar em tempo real
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

---

## Funcionalidades & Módulos

1. **Matriz de Especializações (6 Áreas Chave)**:
   - **SaaS & Enterprise Core**: Multi-tenant, RBAC, Stripe billing, microsserviços.
   - **Web Applications & High-Performance Sites**: SSR, SEO técnico, sub-40ms TTFB.
   - **Mobile Engineering (iOS & Android)**: React Native, offline-first sync, biometria.
   - **Headless E-Commerce**: Checkout em sub-segundo, antifraude, integrações ERP/NF-e.
   - **Cartão Digital Inteligente & Perfis NFC**: Transmissão Contactless com vCard 3.0 dinâmico.
   - **Automações n8n & Inteligência Artificial**: Pipelines com LLMs, WhatsApp Business e CRMs.

2. **Simulador Interativo de Workflows n8n & IA**:
   - Visualização em grafo de nós executando em tempo real.
   - Disparo de eventos reais conectados ao backend Python FastAPI com telemetria de latência.

3. **Simulador de Cartão Digital NFC & vCard**:
   - Configuração de perfil em tempo real com visualização física do cartão e tela PWA móvel.
   - Download imediato de arquivo `.vcf` padronizado compatível com Apple Contacts e Google Contacts.

4. **Calculadora de Escopo e Investimento em Tempo Real**:
   - Projeção paramétrica de semanas de desenvolvimento, horas de engenharia por disciplina e squad recomendado.
   - 1-clique para converter simulação diretamente em proposta técnica (RFP).

5. **Menu de Comandos Rápidos (⌘K / Raycast Style)**:
   - Navegação instantânea por atalhos de teclado para todas as seções e ações da plataforma.

---

## Como Executar

### 1. Iniciar o Backend Python (FastAPI)
```bash
# Na pasta raiz ou backend/
cd backend
pip install -r requirements.txt
python run.py
```
A API estará disponível em: `http://localhost:8000` (Documentação Swagger em `http://localhost:8000/docs`).

Para rodar os testes automatizados do backend:
```bash
python test_api.py
```

### 2. Iniciar o Frontend React (Vite + TypeScript)
```bash
# Na pasta frontend/
cd frontend
npm install
npm run dev
```
O frontend estará acessível em: `http://localhost:5173`.
