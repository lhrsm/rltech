export type ServiceCategory = 
  | 'saas'
  | 'web_apps'
  | 'mobile'
  | 'ecommerce'
  | 'digital_card'
  | 'n8n_automation';

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  badge: string;
  headline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export interface LeadSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service_type: string;
  budget_range?: string;
  timeline?: string;
  message: string;
  selected_features?: string[];
  attachment_name?: string;
  attachment_type?: string;
  attachment_base64?: string;
}

export interface LeadResponse {
  id: string;
  status: string;
  message: string;
  priority: string;
  created_at: string;
  estimated_sla_hours: number;
}

export interface ScopeBreakdown {
  architecture_and_design_hours: number;
  frontend_engineering_hours: number;
  backend_and_api_hours: number;
  automation_and_qa_hours: number;
  total_hours: number;
}

export interface EstimateRequest {
  project_type: string;
  complexity: string;
  platforms: string[];
  modules: string[];
  sla_tier: string;
  target_timeline_weeks?: number;
}

export interface EstimateResponse {
  project_type_label: string;
  complexity_label: string;
  estimated_weeks_min: number;
  estimated_weeks_max: number;
  estimated_cost_brl_min: number;
  estimated_cost_brl_max: number;
  breakdown: ScopeBreakdown;
  recommended_team: string[];
}

export interface N8nStepStatus {
  step_index: number;
  node_name: string;
  action: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'ERROR';
  duration_ms: number;
  payload_summary: string;
}

export interface N8nExecutionResponse {
  execution_id: string;
  workflow_id: string;
  status: string;
  started_at: string;
  completed_at: string;
  total_duration_ms: number;
  steps: N8nStepStatus[];
}

export interface SystemTelemetry {
  uptime_percent: number;
  average_api_latency_ms: number;
  active_n8n_nodes: number;
  ssl_grade: string;
  api_version?: string;
  environment?: string;
  active_modules?: string[];
  system_load?: {
    cpu_usage_pct: number;
    memory_usage_pct: number;
    uptime_hours: number;
  };
  connected_integrations?: {
    n8n_webhook_status: string;
    vcard_engine_status: string;
    database_status: string;
  };
}

export interface VCardProfile {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  bio?: string;
  theme?: string;
}
