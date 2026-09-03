from pydantic import BaseModel, Field
from typing import List, Optional

class EstimateRequest(BaseModel):
    project_type: str = Field(..., description="Tipo do projeto: saas, web_app, mobile_app, ecommerce, digital_card, n8n_automation, full_ecosystem")
    complexity: str = Field(..., description="Nível de complexidade: mvp, standard, enterprise, mission_critical")
    platforms: List[str] = Field(default_factory=list, description="Plataformas alvo: web, ios, android, desktop, backend_only")
    modules: List[str] = Field(default_factory=list, description="Módulos adicionais: auth_rbac, payment_billing, n8n_workflows, ai_agent, cms_headless, bi_analytics")
    sla_tier: str = Field(default="standard", description="Nível de SLA de suporte: standard, premium, 24x7_mission_critical")
    target_timeline_weeks: Optional[int] = Field(default=8, description="Prazo desejado em semanas")

class ScopeBreakdown(BaseModel):
    architecture_and_design_hours: int
    frontend_engineering_hours: int
    backend_and_api_hours: int
    automation_and_qa_hours: int
    total_hours: int

class EstimateResponse(BaseModel):
    project_type_label: str
    complexity_label: str
    estimated_weeks_min: int
    estimated_weeks_max: int
    estimated_cost_brl_min: float
    estimated_cost_brl_max: float
    recommended_team: List[str]
    suggested_architecture: List[str]
    breakdown: ScopeBreakdown
