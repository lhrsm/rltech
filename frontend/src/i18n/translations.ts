export type Language = 'pt' | 'en';

export const translations = {
  pt: {
    navbar: {
      about: 'Sobre',
      services: 'Serviços',
      startProject: 'Iniciar seu projeto',
    },
    hero: {
      titlePart1: 'Desenvolvimento de Software Sob Medida e ',
      titleHighlight: 'Aplicações SaaS',
      titlePart2: ' que Geram Resultados',
      subhead: 'Criamos sites e aplicações web, plataformas SaaS escaláveis, aplicativos móveis intuitivos, cartões digitais inteligentes e automações com n8n & IA.',
      startProject: 'Iniciar seu projeto',
      letsTalk: 'Vamos conversar',
      valueProp1Title: 'Escale seu Negócio',
      valueProp1Desc: 'Infraestrutura moderna e arquitetura pronta para suportar alto volume de clientes.',
      valueProp2Title: 'Aumente o Faturamento',
      valueProp2Desc: 'Produtos digitais projetados para gerar novas receitas e alta conversão de vendas.',
      valueProp3Title: 'Reduza Custos',
      valueProp3Desc: 'Automações inteligentes com n8n e IA que eliminam tarefas manuais repetitivas.',
      valueProp4Title: 'Venda Mais Rápido',
      valueProp4Desc: 'Entregas ágeis (Time-to-Market acelerado) para colocar sua solução logo no mercado.',
    },
    services: {
      badge: 'O QUE DESENVOLVEMOS',
      title: 'Soluções de Engenharia para Impulsionar sua Empresa',
      subhead: 'Criamos sites e aplicações web, plataformas SaaS, aplicativos e automações inteligentes com tecnologia moderna e suporte dedicado.',
      startProject: 'Iniciar seu projeto',
      items: {
        webApps: {
          badge: 'Websites & Portais',
          title: 'Sites e Aplicações Web',
          desc: 'Criamos sites e aplicações web de altíssimo desempenho, com design responsivo sob medida, SEO avançado para ranquear no Google e carregamento instantâneo.',
          points: [
            'Design moderno exclusivo (sem templates genéricos)',
            'Carregamento ultra-rápido otimizado para conversão',
            'Painel intuitivo para gestão de conteúdos'
          ]
        },
        saas: {
          badge: 'SaaS & Web Platforms',
          title: 'Aplicações SaaS Personalizadas',
          desc: 'Desenvolvimento completo de plataformas multi-tenant para empresas com planos de assinatura, controle de acessos (RBAC), faturamento Stripe/PIX e painéis analíticos.',
          points: [
            'Arquitetura segura e escalável na nuvem',
            'Faturamento recorrente e integrações bancárias',
            'Painéis de gestão com dados em tempo real'
          ]
        },
        mobile: {
          badge: 'iOS & Android',
          title: 'Aplicativos Mobile (iOS e Android)',
          desc: 'Apps móveis nativos e fluidos com navegação rápida, notificações push inteligentes, funcionamento offline e integração completa com a câmera, GPS e biometria do smartphone.',
          points: [
            'Publicação completa na App Store e Google Play',
            'Sincronização offline-first de dados',
            'Autenticação biométrica e segurança'
          ]
        },
        ecommerce: {
          badge: 'Lojas Virtuais',
          title: 'E-Commerce Sob Medida',
          desc: 'Lojas virtuais personalizadas sem as limitações de plataformas prontas. Checkout transparente, cálculo dinâmico de frete, antifraude e conciliação automática com ERPs.',
          points: [
            'Checkout transparente com PIX e Cartão',
            'Integração direta de estoque com Bling/Tiny/SAP',
            'Emissão automática de notas fiscais (NF-e)'
          ]
        },
        digitalCard: {
          badge: 'Identidade Digital',
          title: 'Cartões Digitais Inteligentes',
          desc: 'Substitua cartões de visita de papel por tecnologia digital inteligente. Transmita instantaneamente seus contatos executivos para qualquer smartphone com 1 toque.',
          points: [
            'Sem necessidade de aplicativo instalado',
            'Salvamento automático na agenda do celular (vCard)',
            'Painel corporativo para equipes e colaboradores'
          ]
        },
        n8n: {
          badge: 'Workflows & IA',
          title: 'Automações n8n & Inteligência Artificial',
          desc: 'Integração e automação de processos repetitivos conectando seu CRM (HubSpot/Pipedrive), WhatsApp Business, planilhas e modelos de IA para atendimento e triagem 24/7.',
          points: [
            'Eliminação de tarefas manuais e erros humanos',
            'Atendimento e triagem inteligente com IA',
            'Notificações em tempo real no Slack e WhatsApp'
          ]
        }
      }
    },
    calculator: {
      badge: 'CALCULADORA DE ESCOPO',
      title: 'Simulador de Prazo, Equipe e Investimento',
      subhead: 'Configure os requisitos da sua demanda e obtenha uma estimativa transparente de investimento e cronograma em semanas.',
      sec1Title: '1. Tipo de Solução Principal',
      sec2Title: '2. Nível de Complexidade & Escala',
      sec3Title: '3. Módulos e Recursos Especiais',
      projectionTitle: 'Resultado da Simulação',
      liveBadge: 'EM TEMPO REAL',
      investTitle: 'Investimento Estimado (BRL)',
      investSub: 'Valor de referência para entrega completa com garantia.',
      timeline: 'Prazo Estimado',
      hours: 'Horas Dedicadas',
      weeks: 'semanas',
      squad: 'Squad Recomendado',
      cta: 'Iniciar seu projeto',
    },
    n8n: {
      badge: 'AUTOMAÇÃO INTELIGENTE',
      title: 'Workflows n8n & Inteligência Artificial',
      subhead: 'Conecte seus sistemas empresariais, automatize tarefas manuais e atenda seus clientes com IA 24 horas por dia.',
      testButton: 'Testar Execução ao Vivo',
      running: 'Executando...',
      engineStatus: 'Engine Conectada',
      steps: ['PASSO 1', 'PASSO 2', 'PASSO 3', 'PASSO 4', 'PASSO 5'],
      stepNames: ['Webhook Trigger', 'Validação', 'Análise de IA', 'Sincronização CRM', 'Notificação'],
      stepSubs: ['Entrada de dados', 'Tratamento de dados', 'Classificação com LLM', 'Atualização do Lead', 'WhatsApp / Slack'],
    },
    digitalCard: {
      badge: 'IDENTIDADE DIGITAL',
      title: 'Cartões Digitais Inteligentes',
      subhead: 'Apresentação executiva sem papel. Transmita seus dados de contato instantaneamente por aproximação sem contato.',
      cardTitle: 'Personalizar Dados do Cartão',
      downloadBtn: 'Testar Download .vcf',
      saveBtn: 'Salvar Contato',
      shareBtn: 'Compartilhar',
      copied: 'Copiado',
      compat: 'Compatível com iPhone e Android sem aplicativo',
      fields: {
        name: 'Nome Completo',
        title: 'Cargo / Especialidade',
        company: 'Empresa / Organização',
        phone: 'Telefone / WhatsApp',
        email: 'E-mail Corporativo',
        website: 'Website / Link',
      }
    },
    process: {
      badge: 'COMO TRABALHAMOS',
      title: 'Metodologia Ágil com Foco em Resultados',
      subhead: 'Processo transparente e previsível para transformar ideias em software em produção sem atrasos ou surpresas.',
      steps: [
        {
          num: '01',
          title: 'Diagnóstico & Arquitetura',
          desc: 'Mapeamos suas regras de negócio, definimos a stack ideal e estruturamos o cronograma e orçamento transparente.'
        },
        {
          num: '02',
          title: 'Design & Experiência (UI/UX)',
          desc: 'Criamos interfaces modernas, fluidas e focadas na conversão e retenção dos seus usuários finais.'
        },
        {
          num: '03',
          title: 'Desenvolvimento Ágil',
          desc: 'Engenharia com código limpo, testes automatizados e entregas semanais com acompanhamento direto.'
        },
        {
          num: '04',
          title: 'Lançamento & Evolução',
          desc: 'Deploy em produção na nuvem com alta disponibilidade, monitoramento e suporte contínuo.'
        }
      ]
    },
    modal: {
      badge: 'ATENDIMENTO TÉCNICO',
      title: 'Iniciar seu projeto',
      name: 'Nome Completo *',
      email: 'E-mail Corporativo *',
      company: 'Empresa',
      phone: 'Telefone / WhatsApp',
      solution: 'Tipo de Solução',
      budget: 'Faixa de Investimento Estimada',
      desc: 'Descrição do Projeto / Requisitos *',
      cancel: 'Cancelar',
      submit: 'Iniciar seu projeto',
      nda: 'Sigilo & NDA Garantidos',
      successTitle: 'Solicitação Recebida com Sucesso!',
      successSub: 'Nossa equipe de engenharia analisará os requisitos do seu projeto e entrará em contato em até 4 horas úteis.',
      finish: 'Concluir',
    },
    footer: {
      desc: 'Criamos sites e aplicações web, plataformas SaaS personalizadas, aplicativos móveis, cartões digitais inteligentes e automações n8n para empresas em crescimento e grandes marcas.',
      security: 'Segurança & LGPD',
      solutionsTitle: 'Soluções',
      contactTitle: 'Contato',
      letsTalk: 'Vamos conversar',
      rights: 'Todos os direitos reservados.',
    }
  },
  en: {
    navbar: {
      about: 'About',
      services: 'Services',
      startProject: 'Start your project',
    },
    hero: {
      titlePart1: 'Custom Software Development & ',
      titleHighlight: 'SaaS Platforms',
      titlePart2: ' Built for Real Impact',
      subhead: 'We build high-performance websites, scalable SaaS platforms, intuitive mobile apps, smart digital cards, and enterprise n8n & AI automations.',
      startProject: 'Start your project',
      letsTalk: "Let's talk",
      valueProp1Title: 'Scale your Business',
      valueProp1Desc: 'Modern cloud infrastructure and architecture ready for massive customer growth.',
      valueProp2Title: 'Grow your Revenue',
      valueProp2Desc: 'Digital products designed for maximum sales conversion and new revenue streams.',
      valueProp3Title: 'Cut Operational Costs',
      valueProp3Desc: 'Intelligent AI and n8n automations that eliminate repetitive manual labor.',
      valueProp4Title: 'Faster Time-to-Market',
      valueProp4Desc: 'Agile sprints and rapid delivery to launch and validate your product faster.',
    },
    services: {
      badge: 'WHAT WE BUILD',
      title: 'Engineering Solutions to Accelerate your Business',
      subhead: 'From websites and web apps to full SaaS platforms, mobile apps and intelligent automations with cutting-edge tech and dedicated support.',
      startProject: 'Start your project',
      items: {
        webApps: {
          badge: 'Websites & Portals',
          title: 'Websites & Web Apps',
          desc: 'High-performance bespoke websites and web applications with responsive UI, advanced SEO to rank on Google, and instant loading speeds.',
          points: [
            'Bespoke modern UI (no generic cookie-cutter templates)',
            'Ultra-fast load times optimized for conversions',
            'Intuitive custom dashboard for easy content management'
          ]
        },
        saas: {
          badge: 'SaaS & Web Platforms',
          title: 'Custom SaaS Applications',
          desc: 'End-to-end multi-tenant cloud platforms with subscription billing, granular RBAC access controls, Stripe integrations, and real-time analytics.',
          points: [
            'Secure, fault-tolerant cloud architecture',
            'Automated recurring billing and payment integrations',
            'Real-time data visualization and operational dashboards'
          ]
        },
        mobile: {
          badge: 'iOS & Android',
          title: 'Mobile Apps (iOS & Android)',
          desc: 'Fluid native apps with rapid navigation, intelligent push notifications, offline capability, and deep camera/GPS/biometric integration.',
          points: [
            'Complete App Store and Google Play deployment',
            'Offline-first seamless data synchronization',
            'Enterprise biometric security and encryption'
          ]
        },
        ecommerce: {
          badge: 'E-Commerce Stores',
          title: 'Custom E-Commerce',
          desc: 'Headless high-conversion online storefronts without platform constraints. Frictionless checkout, dynamic freight calculation, and ERP sync.',
          points: [
            'High-converting 1-click checkout with Stripe & digital wallets',
            'Real-time automated inventory and ERP integration',
            'Automated invoicing and financial reconciliation'
          ]
        },
        digitalCard: {
          badge: 'Digital Identity',
          title: 'Smart Digital Cards',
          desc: 'Replace outdated paper business cards with smart contactless technology. Instantly transfer your executive credentials to any phone with 1 tap.',
          points: [
            'Zero app download required for the receiver',
            'Direct saving into mobile contacts (vCard 3.0)',
            'Centralized team directory and enterprise analytics'
          ]
        },
        n8n: {
          badge: 'Workflows & AI',
          title: 'n8n Automations & AI Agents',
          desc: 'Integrate tools and automate complex business operations connecting your CRM (HubSpot/Pipedrive), messaging, and LLM AI agents 24/7.',
          points: [
            'Elimination of manual errors and bottlenecks',
            '24/7 intelligent triage and customer support agents',
            'Instant real-time Slack and WhatsApp notifications'
          ]
        }
      }
    },
    calculator: {
      badge: 'SCOPE CALCULATOR',
      title: 'Timeline, Team & Investment Estimator',
      subhead: 'Configure your project requirements and receive a transparent upfront estimate of delivery timeline and engineering budget.',
      sec1Title: '1. Primary Solution Type',
      sec2Title: '2. Complexity & Scale',
      sec3Title: '3. Modules & Advanced Features',
      projectionTitle: 'Project Projection',
      liveBadge: 'REAL-TIME',
      investTitle: 'Estimated Investment (BRL)',
      investSub: 'Benchmark reference value for turnkey delivery with full guarantee.',
      timeline: 'Estimated Timeline',
      hours: 'Dedicated Hours',
      weeks: 'weeks',
      squad: 'Recommended Squad',
      cta: 'Start your project',
    },
    n8n: {
      badge: 'INTELLIGENT AUTOMATION',
      title: 'n8n Workflows & Artificial Intelligence',
      subhead: 'Connect enterprise tools, automate repetitive tasks, and assist your customers with AI around the clock.',
      testButton: 'Test Live Execution',
      running: 'Executing...',
      engineStatus: 'Engine Connected',
      steps: ['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4', 'STEP 5'],
      stepNames: ['Webhook Trigger', 'Validation', 'AI Analysis', 'CRM Sync', 'Notification'],
      stepSubs: ['Incoming payload', 'Schema sanitation', 'LLM classification', 'Lead profile update', 'Slack / WhatsApp'],
    },
    digitalCard: {
      badge: 'DIGITAL IDENTITY',
      title: 'Smart Digital Cards',
      subhead: 'Paperless executive presentation. Share your digital credentials instantly via contactless tapping or QR code.',
      cardTitle: 'Customize Card Credentials',
      downloadBtn: 'Download .vcf File',
      saveBtn: 'Save Contact',
      shareBtn: 'Share Link',
      copied: 'Copied',
      compat: 'Compatible with iPhone and Android without installing apps',
      fields: {
        name: 'Full Name',
        title: 'Title / Specialization',
        company: 'Company / Organization',
        phone: 'Phone / WhatsApp',
        email: 'Corporate Email',
        website: 'Website / Profile URL',
      }
    },
    process: {
      badge: 'HOW WE WORK',
      title: 'Agile Methodology Focused on Results',
      subhead: 'Predictable and transparent software engineering pipeline to turn concepts into reliable production systems without delays.',
      steps: [
        {
          num: '01',
          title: 'Discovery & Architecture',
          desc: 'We map business domain logic, select the optimal stack, and establish transparent timelines and budgets.'
        },
        {
          num: '02',
          title: 'UI/UX & Prototyping',
          desc: 'We craft modern, responsive, high-converting interfaces focused on user retention and seamless flows.'
        },
        {
          num: '03',
          title: 'Agile Engineering',
          desc: 'Clean code architecture, automated testing pipelines, and weekly sprint demos with direct feedback.'
        },
        {
          num: '04',
          title: 'Launch & Evolution',
          desc: 'Cloud deployment with high availability, real-time observability, and ongoing technical support.'
        }
      ]
    },
    modal: {
      badge: 'TECHNICAL INTAKE',
      title: 'Start your project',
      name: 'Full Name *',
      email: 'Corporate Email *',
      company: 'Company Name',
      phone: 'Phone / WhatsApp',
      solution: 'Solution Type',
      budget: 'Estimated Budget Range',
      desc: 'Project Scope / Requirements *',
      cancel: 'Cancel',
      submit: 'Start your project',
      nda: 'Confidentiality & NDA Guaranteed',
      successTitle: 'Project Request Received!',
      successSub: 'Our engineering team will review your specifications and reach out within 4 business hours.',
      finish: 'Done',
    },
    footer: {
      desc: 'We develop bespoke websites, SaaS platforms, mobile applications, smart digital cards, and n8n automations for growing companies and global brands.',
      security: 'Security & Compliance',
      solutionsTitle: 'Solutions',
      contactTitle: 'Contact',
      letsTalk: "Let's talk",
      rights: 'All rights reserved.',
    }
  }
};
