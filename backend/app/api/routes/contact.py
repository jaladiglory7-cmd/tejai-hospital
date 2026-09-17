from fastapi import APIRouter, HTTPException
import logging

from app.schemas.models import ContactRequest, ContactRequestResponse
from app.services import supabase_service
from app.services.whatsapp_service import get_whatsapp_link, get_whatsapp_number

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("/", response_model=ContactRequestResponse)
async def submit_contact_request(contact: ContactRequest):
    try:
        data = contact.model_dump()
        result = await supabase_service.create_contact_request(data)
        return ContactRequestResponse(**result)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=f"Database not configured: {str(e)}")
    except Exception as e:
        logger.error(f"Error creating contact request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact request.")


@router.get("/whatsapp-link")
async def get_whatsapp_consultation_link(phone: str = None, message: str = None):
    link = get_whatsapp_link(phone_number=phone, message=message)
    number = get_whatsapp_number()
    return {"link": link, "phone": number}