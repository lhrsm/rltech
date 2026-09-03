from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import leads, estimates, vcard, automations, telemetry

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="API Enterprise para a consultoria e software house RL Tech",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(leads.router, prefix=settings.API_V1_STR)
app.include_router(estimates.router, prefix=settings.API_V1_STR)
app.include_router(vcard.router, prefix=settings.API_V1_STR)
app.include_router(automations.router, prefix=settings.API_V1_STR)
app.include_router(telemetry.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "organization": "RL Tech - Software Engineering & Automations",
        "system_status": "OPERATIONAL",
        "api_docs": "/docs",
        "version": settings.VERSION
    }
