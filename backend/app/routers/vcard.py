from fastapi import APIRouter, Query, Response
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel, Field
from typing import Optional
from app.services.vcard_service import generate_vcard_content, generate_qr_code_image

router = APIRouter(prefix="/vcard", tags=["Digital Card & NFC"])

class VCardRequest(BaseModel):
    name: str = Field(default="Alexandre Silva")
    title: str = Field(default="Head of Engineering & AI Solutions")
    company: str = Field(default="RL Tech Solutions")
    phone: str = Field(default="+55 11 98765-4321")
    email: str = Field(default="alexandre@rltech.io")
    website: str = Field(default="https://rltech.io")
    bio: Optional[str] = Field(default="Especialista em Arquitetura SaaS, Microsserviços e Automação de Processos com n8n.")

@router.post("/generate")
def create_vcard_download(req: VCardRequest):
    content = generate_vcard_content(
        name=req.name,
        title=req.title,
        company=req.company,
        phone=req.phone,
        email=req.email,
        website=req.website,
        bio=req.bio
    )
    safe_name = req.name.replace(" ", "_").lower()
    return Response(
        content=content,
        media_type="text/vcard",
        headers={
            "Content-Disposition": f'attachment; filename="contact_{safe_name}.vcf"'
        }
    )

@router.get("/qr")
def get_contact_qr(
    data: str = Query("https://rltech.io/profile/alexandre", description="URL ou payload para embutir no QR code")
):
    image_bytes = generate_qr_code_image(data)
    return Response(content=image_bytes, media_type="image/png")
