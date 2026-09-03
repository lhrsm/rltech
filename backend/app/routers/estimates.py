from fastapi import APIRouter
from app.schemas.estimate import EstimateRequest, EstimateResponse, ScopeBreakdown

router = APIRouter(prefix="/estimates", tags=["Estimates & Scoping"])

PROJECT_PROFILES = {
    "saas": {
        "label": "SaaS & Enterprise Platform",
        "base_weeks": (8, 16),
        "base_cost": (28000.0, 75000.0),
        "base_hours": (40, 140, 160, 60),
        "architecture": ["FastAPI / Node.js Microservices", "React / Next.js SPA", "PostgreSQL Multi-tenant", "Redis Cache", "Docker / AWS ECS"]
    },
    "web_app": {
        "label": "Web Application de Alta Performance",
        "base_weeks": (4, 10),
        "base_cost": (15000.0, 38000.0),
        "base_hours": (24, 90, 80, 40),
        "architecture": ["React + TypeScript", "FastAPI / Supabase", "Edge CDN / Cloudflare", "Tailwind CSS Design System"]
    },
    "mobile_app": {
        "label": "Mobile App (iOS & Android)",
        "base_weeks": (8, 14),
        "base_cost": (25000.0, 60000.0),
        "base_hours": (32, 130, 100, 50),
        "architecture": ["React Native / Expo EAS", "TypeScript", "REST / GraphQL Gateway", "Push Notification Service", "Offline-first Sync"]
    },
    "ecommerce": {
        "label": "E-Commerce Headless / Custom",
        "base_weeks": (6, 12),
        "base_cost": (18000.0, 48000.0),
        "base_hours": (28, 100, 110, 50),
        "architecture": ["Headless Next.js Storefront", "Stripe / PIX / Asaas Gateway", "PostgreSQL & Inventory Engine", "Cloudflare Caching"]
    },
    "digital_card": {
        "label": "Cartão Digital Inteligente & Perfis NFC",
        "base_weeks": (2, 4),
        "base_cost": (4500.0, 12000.0),
        "base_hours": (10, 30, 20, 10),
        "architecture": ["PWA Micro-App", "Dynamic vCard 3.0 Engine", "NFC Payload Dispatcher", "Lead Capture Analytics"]
    },
    "n8n_automation": {
        "label": "Automações n8n & Pipelines de IA",
        "base_weeks": (2, 6),
        "base_cost": (7500.0, 22000.0),
        "base_hours": (16, 20, 70, 30),
        "architecture": ["Self-hosted n8n Cluster", "OpenAI / Claude API Tooling", "Postgres / Webhook Queues", "WhatsApp Business & Slack Bots"]
    },
    "full_ecosystem": {
        "label": "Ecossistema Completo (Web + Mobile + n8n)",
        "base_weeks": (12, 24),
        "base_cost": (55000.0, 140000.0),
        "base_hours": (60, 200, 220, 100),
        "architecture": ["Monorepo Turbo / Nx", "React Web + React Native Mobile", "FastAPI Enterprise Core", "n8n Workflow Hub", "Terraform & AWS"]
    }
}

COMPLEXITY_MULTIPLIERS = {
    "mvp": 0.85,
    "standard": 1.0,
    "enterprise": 1.45,
    "mission_critical": 1.95
}

MODULE_EXTRA_HOURS = {
    "auth_rbac": (8, 16),
    "payment_billing": (12, 24),
    "n8n_workflows": (16, 32),
    "ai_agent": (20, 40),
    "cms_headless": (10, 20),
    "bi_analytics": (14, 28)
}

@router.post("/calculate", response_model=EstimateResponse)
def calculate_estimate(request: EstimateRequest):
    profile = PROJECT_PROFILES.get(request.project_type, PROJECT_PROFILES["web_app"])
    multiplier = COMPLEXITY_MULTIPLIERS.get(request.complexity, 1.0)
    
    # Calculate modules addition
    extra_dev_hours = 0
    for mod in request.modules:
        if mod in MODULE_EXTRA_HOURS:
            extra_dev_hours += MODULE_EXTRA_HOURS[mod][1]
            
    base_arch, base_front, base_back, base_qa = profile["base_hours"]
    
    arch_hours = int(base_arch * multiplier)
    front_hours = int((base_front + extra_dev_hours * 0.4) * multiplier)
    back_hours = int((base_back + extra_dev_hours * 0.6) * multiplier)
    qa_hours = int(base_qa * multiplier)
    total_hours = arch_hours + front_hours + back_hours + qa_hours
    
    # Calculate costs
    min_cost = round(profile["base_cost"][0] * multiplier + (extra_dev_hours * 110.0), 2)
    max_cost = round(profile["base_cost"][1] * multiplier + (extra_dev_hours * 160.0), 2)
    
    min_weeks = max(2, int(profile["base_weeks"][0] * (0.9 if request.complexity == "mvp" else 1.0)))
    max_weeks = max(min_weeks + 2, int(profile["base_weeks"][1] * multiplier))
    
    # Team recommendations
    team = ["1x Tech Lead / Solutions Architect", "1x Senior Frontend Engineer", "1x Senior Backend Engineer"]
    if request.complexity in ["enterprise", "mission_critical"] or "mobile_app" in request.project_type:
        team.append("1x Mobile Specialist")
    if "n8n_workflows" in request.modules or request.project_type == "n8n_automation":
        team.append("1x Automation & AI Engineer")
    team.append("1x QA / Reliability Engineer")
    
    complexity_labels = {
        "mvp": "MVP Ágil",
        "standard": "Produção Padrão",
        "enterprise": "Enterprise Escalável",
        "mission_critical": "Missão Crítica / Alta Concorrência"
    }

    return EstimateResponse(
        project_type_label=profile["label"],
        complexity_label=complexity_labels.get(request.complexity, "Produção Padrão"),
        estimated_weeks_min=min_weeks,
        estimated_weeks_max=max_weeks,
        estimated_cost_brl_min=min_cost,
        estimated_cost_brl_max=max_cost,
        recommended_team=team,
        suggested_architecture=profile["architecture"],
        breakdown=ScopeBreakdown(
            architecture_and_design_hours=arch_hours,
            frontend_engineering_hours=front_hours,
            backend_and_api_hours=back_hours,
            automation_and_qa_hours=qa_hours,
            total_hours=total_hours
        )
    )
