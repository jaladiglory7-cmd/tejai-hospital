from supabase import create_client, Client
from typing import Optional, Dict, Any, List
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

_client: Optional[Client] = None

_PLACEHOLDER_MARKERS = ("your_", "xxx", "replace")

def _is_placeholder_url(value: str) -> bool:
    lowered = value.lower()
    return (
        not value
        or not lowered.startswith("http")
        or lowered.endswith("_here")
        or any(marker in lowered for marker in _PLACEHOLDER_MARKERS)
    )

def _is_placeholder_key(value: str) -> bool:
    lowered = value.lower()
    return (
        not value
        or lowered.endswith("_here")
        or any(marker in lowered for marker in _PLACEHOLDER_MARKERS)
    )


def get_supabase() -> Client:
    global _client
    if _client is None:
        if _is_placeholder_url(settings.SUPABASE_URL) or _is_placeholder_key(settings.SUPABASE_KEY):
            raise ValueError("SUPABASE_URL and SUPABASE_KEY must be configured")
        _client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _client


async def create_appointment(data: Dict[str, Any]) -> Dict[str, Any]:
    client = get_supabase()
    result = client.table("appointments").insert(data).execute()
    return result.data[0] if result.data else {}


async def get_appointments(limit: int = 50) -> List[Dict[str, Any]]:
    client = get_supabase()
    result = client.table("appointments").select("*").order("created_at", desc=True).limit(limit).execute()
    return result.data or []


async def update_appointment_status(appointment_id: str, status: str) -> Dict[str, Any]:
    client = get_supabase()
    result = client.table("appointments").update({"status": status}).eq("id", appointment_id).execute()
    return result.data[0] if result.data else {}


async def get_doctors() -> List[Dict[str, Any]]:
    client = get_supabase()
    result = client.table("doctors").select("*").order("sort_order").execute()
    return result.data or []


async def get_services() -> List[Dict[str, Any]]:
    client = get_supabase()
    result = client.table("services").select("*").order("sort_order").execute()
    return result.data or []


async def get_faqs() -> List[Dict[str, Any]]:
    client = get_supabase()
    result = client.table("faqs").select("*").order("sort_order").execute()
    return result.data or []


async def create_contact_request(data: Dict[str, Any]) -> Dict[str, Any]:
    client = get_supabase()
    result = client.table("contact_requests").insert(data).execute()
    return result.data[0] if result.data else {}


async def log_chat_message(data: Dict[str, Any]) -> None:
    try:
        client = get_supabase()
        client.table("chat_logs").insert(data).execute()
    except Exception as e:
        logger.warning(f"Failed to log chat message: {e}")