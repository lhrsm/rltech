from fastapi import APIRouter, status
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.lead_service import process_new_lead, get_all_leads

router = APIRouter(prefix="/leads", tags=["Leads & RFP"])

@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead_in: LeadCreate):
    """
    Captura e qualifica requisições técnicas de projetos, orçamentos e RFPs.
    """
    return process_new_lead(lead_in)

@router.get("", status_code=status.HTTP_200_OK)
def list_leads():
    """
    Lista leads capturados (uso administrativo / telemetria).
    """
    return {"leads": get_all_leads()}
