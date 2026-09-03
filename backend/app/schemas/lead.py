from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120, description="Nome completo do solicitante")
    email: EmailStr = Field(..., description="E-mail corporativo para contato")
    company: Optional[str] = Field(None, max_length=120, description="Nome da empresa ou organização")
    phone: Optional[str] = Field(None, max_length=30, description="Telefone / WhatsApp com DDD")
    service_type: str = Field(..., description="Tipo de serviço principal (ex: saas, web, mobile, ecommerce, digital_card, n8n_automation)")
    budget_range: Optional[str] = Field(None, description="Faixa orçamentária estimada")
    timeline: Optional[str] = Field(None, description="Prazo estimado de lançamento")
    message: str = Field(..., min_length=10, max_length=2500, description="Descrição do projeto ou escopo")
    selected_features: Optional[List[str]] = Field(default_factory=list, description="Lista de módulos e integrações solicitadas")

class LeadResponse(BaseModel):
    id: str
    status: str
    message: str
    priority: str
    created_at: datetime
    estimated_sla_hours: int
