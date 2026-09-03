from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class N8nTriggerRequest(BaseModel):
    workflow_id: str = Field(..., description="ID do fluxo de automação (ex: 'wf-lead-enrichment', 'wf-ecommerce-sync', 'wf-crm-dispatch')")
    event_type: str = Field(..., description="Tipo de evento acionador (ex: 'lead.created', 'order.paid', 'card.scanned')")
    payload: Dict[str, Any] = Field(default_factory=dict, description="Dados do evento")

class WorkflowStepResult(BaseModel):
    step_id: str
    step_name: str
    node_type: str
    status: str
    duration_ms: int
    output_summary: str

class N8nExecutionResponse(BaseModel):
    execution_id: str
    workflow_id: str
    workflow_name: str
    status: str
    started_at: datetime
    finished_at: datetime
    total_duration_ms: int
    steps: List[WorkflowStepResult]
    final_output: Dict[str, Any]
