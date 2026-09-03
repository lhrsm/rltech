import uuid
import urllib.request
import urllib.parse
import json
import threading
from datetime import datetime, timezone
from app.schemas.lead import LeadCreate, LeadResponse

GOOGLE_SCRIPT_WEBHOOK = "https://script.google.com/macros/s/AKfycbwHsplwwmDtnhFJba7zz28yvbpjkYgpahOWZpFjFBYFOPQ9gP8IoVetowTnTaDRxVHu/exec"
RECIPIENT_EMAIL = "Ricardoliveira2974@gmail.com"

# In-memory storage for leads during demo/runtime
_LEADS_DB: list[dict] = []

def _forward_to_google_script(payload: dict):
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            GOOGLE_SCRIPT_WEBHOOK,
            data=data,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            _ = response.read()
    except Exception as e:
        print(f"[GOOGLE_SCRIPT_INTEGRATION] Notification warning: {e}")

def process_new_lead(lead_in: LeadCreate) -> LeadResponse:
    lead_id = f"LEAD-{uuid.uuid4().hex[:8].upper()}"
    
    # Priority calculation heuristic
    priority = "NORMAL"
    sla_hours = 24
    
    if lead_in.budget_range in ["50k_100k", "100k_plus"] or "n8n_workflows" in (lead_in.selected_features or []):
        priority = "HIGH"
        sla_hours = 4
    elif lead_in.service_type in ["saas", "full_ecosystem"]:
        priority = "PRIORITY"
        sla_hours = 12
    
    now_utc = datetime.now(timezone.utc)
    
    lead_record = {
        "id": lead_id,
        "recipient_email": RECIPIENT_EMAIL,
        "name": lead_in.name,
        "email": lead_in.email,
        "company": lead_in.company or "Não informado",
        "phone": lead_in.phone or "Não informado",
        "service_type": lead_in.service_type,
        "budget_range": lead_in.budget_range or "A combinar",
        "timeline": lead_in.timeline or "1 mês",
        "message": lead_in.message,
        "selected_features": lead_in.selected_features or [],
        "priority": priority,
        "status": "QUALIFIED_AND_QUEUED",
        "created_at": now_utc,
        "estimated_sla_hours": sla_hours,
        "webhook_id": "AKfycbwHsplwwmDtnhFJba7zz28yvbpjkYgpahOWZpFjFBYFOPQ9gP8IoVetowTnTaDRxVHu"
    }
    
    _LEADS_DB.append(lead_record)
    
    # Forward asynchronously to Google Apps Script
    payload = {
        "id": lead_id,
        "recipient_email": RECIPIENT_EMAIL,
        "target_email": RECIPIENT_EMAIL,
        "name": lead_in.name,
        "email": lead_in.email,
        "company": lead_in.company or "Não informado",
        "phone": lead_in.phone or "Não informado",
        "service_type": lead_in.service_type,
        "budget_range": lead_in.budget_range or "A combinar",
        "timeline": lead_in.timeline or "1 mês",
        "message": lead_in.message,
        "selected_features": ", ".join(lead_in.selected_features or []),
        "created_at": now_utc.isoformat(),
        "source": "RL Tech Backend Dispatcher",
        "webhook_id": "AKfycbwHsplwwmDtnhFJba7zz28yvbpjkYgpahOWZpFjFBYFOPQ9gP8IoVetowTnTaDRxVHu"
    }
    
    thread = threading.Thread(target=_forward_to_google_script, args=(payload,), daemon=True)
    thread.start()
    
    return LeadResponse(
        id=lead_id,
        status="QUALIFIED_AND_QUEUED",
        message="Sua solicitação técnica foi recebida e encaminhada para a equipe de Engenharia de Soluções.",
        priority=priority,
        created_at=lead_record["created_at"],
        estimated_sla_hours=sla_hours
    )

def get_all_leads() -> list[dict]:
    return _LEADS_DB
