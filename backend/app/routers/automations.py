import uuid
import time
from datetime import datetime, timezone
from fastapi import APIRouter
from app.schemas.automation import N8nTriggerRequest, N8nExecutionResponse, WorkflowStepResult

router = APIRouter(prefix="/automations", tags=["n8n & AI Workflows"])

PRESET_WORKFLOWS = {
    "wf-lead-enrichment": {
        "name": "Pipeline: Ingestão de Lead -> Enriquecimento IA -> CRM Sync -> Alerta Slack/WhatsApp",
        "steps": [
            {"id": "node-1", "name": "Webhook Ingestion", "type": "n8n-nodes-base.webhook", "duration": 18, "desc": "Payload HTTP 200 recebido com dados brutos do cliente."},
            {"id": "node-2", "name": "Pydantic Schema Validation", "type": "n8n-nodes-base.code", "duration": 12, "desc": "Estrutura validada com tipagem estrita (Email, Telefone, Escopo)."},
            {"id": "node-3", "name": "OpenAI / Claude Enrichment", "type": "n8n-nodes-langchain.openAi", "duration": 142, "desc": "IA analisou o escopo, calculou complexidade e gerou resumo executivo."},
            {"id": "node-4", "name": "HubSpot / Pipedrive Deal Creation", "type": "n8n-nodes-base.hubspot", "duration": 65, "desc": "Oportunidade criada na coluna 'Qualificado' com tags técnicas."},
            {"id": "node-5", "name": "Slack & WhatsApp Bot Dispatch", "type": "n8n-nodes-base.slack", "duration": 44, "desc": "Notificação em tempo real enviada para o canal #eng-leads com botões de ação."}
        ]
    },
    "wf-ecommerce-sync": {
        "name": "Pipeline: Webhook de Pedido -> Validação Antifraude -> Emissão NF-e -> Notificação WhatsApp",
        "steps": [
            {"id": "node-1", "name": "Payment Gateway Webhook", "type": "n8n-nodes-base.webhook", "duration": 15, "desc": "Transação autorizada via Stripe/PIX."},
            {"id": "node-2", "name": "ERP Inventory Allocation", "type": "n8n-nodes-base.postgres", "duration": 28, "desc": "Reserva de estoque efetuada com lock otimista no banco de dados."},
            {"id": "node-3", "name": "SEFAZ Invoice Generation", "type": "n8n-nodes-base.httpRequest", "duration": 210, "desc": "Emissão de NF-e e validação de chave de acesso XML."},
            {"id": "node-4", "name": "WhatsApp Evolution API", "type": "n8n-nodes-base.httpRequest", "duration": 52, "desc": "Comprovante e código de rastreio enviados instantaneamente ao cliente."}
        ]
    },
    "wf-digital-card-scan": {
        "name": "Pipeline: Tap NFC do Cartão -> Registro de Geolocalização -> Follow-up Automatizado",
        "steps": [
            {"id": "node-1", "name": "NFC Tap Detection", "type": "n8n-nodes-base.webhook", "duration": 10, "desc": "Leitura de tag NFC (NDEF standard) identificada com token único."},
            {"id": "node-2", "name": "vCard Profile Dispatch", "type": "n8n-nodes-base.respondToWebhook", "duration": 14, "desc": "Entrega do micro-app PWA e disparador de download .vcf."},
            {"id": "node-3", "name": "Lead Engagement Logger", "type": "n8n-nodes-base.clickhouse", "duration": 22, "desc": "Métricas de engajamento salvas para dashboard analítico."},
            {"id": "node-4", "name": "AI Auto Follow-up Queue", "type": "n8n-nodes-base.schedule", "duration": 35, "desc": "Agendamento de e-mail de cortesia personalizado para D+1."}
        ]
    }
}

@router.post("/trigger", response_model=N8nExecutionResponse)
def trigger_n8n_simulation(req: N8nTriggerRequest):
    wf_data = PRESET_WORKFLOWS.get(req.workflow_id, PRESET_WORKFLOWS["wf-lead-enrichment"])
    
    execution_id = f"exec_{uuid.uuid4().hex[:12]}"
    started_at = datetime.now(timezone.utc)
    
    steps_result = []
    total_duration = 0
    
    for s in wf_data["steps"]:
        duration = s["duration"]
        total_duration += duration
        steps_result.append(
            WorkflowStepResult(
                step_id=s["id"],
                step_name=s["name"],
                node_type=s["type"],
                status="SUCCESS",
                duration_ms=duration,
                output_summary=s["desc"]
            )
        )
        
    finished_at = datetime.now(timezone.utc)
    
    return N8nExecutionResponse(
        execution_id=execution_id,
        workflow_id=req.workflow_id,
        workflow_name=wf_data["name"],
        status="COMPLETED",
        started_at=started_at,
        finished_at=finished_at,
        total_duration_ms=total_duration,
        steps=steps_result,
        final_output={
            "status": "PROCESSED_SUCCESSFULLY",
            "nodes_executed": len(steps_result),
            "total_latency_ms": total_duration,
            "received_payload": req.payload,
            "engine": "n8n Enterprise v1.75.2 + RL Tech AI Pipeline"
        }
    )
