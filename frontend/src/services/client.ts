import type { AppointmentPayload, ChatRequest, ChatResult, ContactPayload, Language } from '../types';
import { clinicConfig } from '../data/config';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const parsed = (await response.json()) as { detail?: string };
      if (parsed.detail) detail = parsed.detail;
    } catch {
      detail = `HTTP ${response.status}`;
    }
    throw new ApiError(detail, response.status);
  }

  return (await response.json()) as T;
}

export async function submitAppointment(data: AppointmentPayload): Promise<unknown> {
  return request('/api/appointments/', data);
}

export async function sendChatMessage(data: ChatRequest): Promise<ChatResult> {
  return request<ChatResult>('/api/chat/', data);
}

export async function submitContactRequest(data: ContactPayload): Promise<unknown> {
  return request('/api/contact/', data);
}

export async function checkHealth(): Promise<{ status: string; supabase_configured: boolean }> {
  return request('/api/health', {});
}

export function getWhatsAppLink(message?: string, language: Language = 'en'): string {
  const phone = import.meta.env.VITE_WHATSAPP_PHONE || clinicConfig.whatsappPhone;
  const text =
    message ??
    (language === 'te' ? 'నమస్కారం, నేను చర్మ వ్యాధి సేవల గురించి తెలుసుకోవాలనుకుంటున్నాను.' : 'Hello, I would like to inquire about dermatology services.');
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
}