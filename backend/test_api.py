"""Integration test script for RL Tech FastAPI Backend"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_all_endpoints():
    print("[*] Testando Root...")
    r = client.get("/")
    assert r.status_code == 200, f"Root failed: {r.text}"
    print(" -> OK:", r.json()["organization"])

    print("[*] Testando Health...")
    r = client.get("/api/system/health")
    assert r.status_code == 200, f"Health failed: {r.text}"
    print(" -> OK:", r.json()["status"])

    print("[*] Testando Metrics...")
    r = client.get("/api/system/metrics")
    assert r.status_code == 200, f"Metrics failed: {r.text}"
    print(" -> OK: Uptime", r.json()["uptime_percent"], "Latency", r.json()["average_api_latency_ms"])

    print("[*] Testando Lead Creation...")
    lead_payload = {
        "name": "Carlos Eduardo",
        "email": "carlos@fintechcorp.com",
        "company": "Fintech Corp",
        "phone": "+55 11 91234-5678",
        "service_type": "saas",
        "budget_range": "50k_100k",
        "timeline": "1_month",
        "message": "Precisamos de uma plataforma SaaS multi-tenant com integração Stripe e PostgreSQL.",
        "selected_features": ["auth_rbac", "payment_billing", "n8n_workflows"]
    }
    r = client.post("/api/leads", json=lead_payload)
    assert r.status_code == 201, f"Lead creation failed: {r.text}"
    lead_res = r.json()
    assert lead_res["id"].startswith("LEAD-")
    print(" -> OK: Lead ID", lead_res["id"], "Priority", lead_res["priority"])

    print("[*] Testando Scope Calculator...")
    calc_payload = {
        "project_type": "saas",
        "complexity": "enterprise",
        "platforms": ["web"],
        "modules": ["auth_rbac", "payment_billing", "n8n_workflows", "ai_agent"],
        "sla_tier": "premium",
        "target_timeline_weeks": 10
    }
    r = client.post("/api/estimates/calculate", json=calc_payload)
    assert r.status_code == 200, f"Scope calc failed: {r.text}"
    est = r.json()
    assert est["breakdown"]["total_hours"] > 0
    print(" -> OK: Estimated Weeks", f"{est['estimated_weeks_min']}-{est['estimated_weeks_max']}", "Hours:", est["breakdown"]["total_hours"])

    print("[*] Testando n8n Workflow Trigger...")
    n8n_payload = {
        "workflow_id": "wf-lead-enrichment",
        "event_type": "client.simulation_trigger",
        "payload": {"test": True, "lead_name": "Carlos"}
    }
    r = client.post("/api/automations/trigger", json=n8n_payload)
    assert r.status_code == 200, f"n8n trigger failed: {r.text}"
    n8n_res = r.json()
    assert len(n8n_res["steps"]) == 5
    print(" -> OK: Executed Nodes", len(n8n_res["steps"]), "Duration:", f"{n8n_res['total_duration_ms']}ms")

    print("[*] Testando vCard Generator...")
    vcard_payload = {
        "name": "Alexandre Silva",
        "title": "Head of Engineering",
        "company": "RL Tech Solutions",
        "phone": "+55 11 98765-4321",
        "email": "alexandre@rltech.io",
        "website": "https://rltech.io",
        "bio": "Arquiteto de Soluções SaaS e Automações n8n."
    }
    r = client.post("/api/vcard/generate", json=vcard_payload)
    assert r.status_code == 200, f"vCard generation failed: {r.text}"
    assert "BEGIN:VCARD" in r.text
    print(" -> OK: vCard .vcf generated successfully with bytes length", len(r.content))

    print("[*] Testando QR Code Generator...")
    r = client.get("/api/vcard/qr?data=https://rltech.io")
    assert r.status_code == 200, f"QR generation failed: {r.text}"
    assert r.headers["content-type"] == "image/png"
    print(" -> OK: QR Code PNG image generated with bytes length", len(r.content))

    print("\n[SUCCESS] Todos os 7 testes de integração do Backend passaram com 100% de sucesso!")

if __name__ == "__main__":
    test_all_endpoints()
