from fastapi import APIRouter, HTTPException
from typing import List
import logging

from app.schemas.models import AppointmentCreate, AppointmentResponse
from app.services import supabase_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("/", response_model=AppointmentResponse)
async def create_appointment(appointment: AppointmentCreate):
    try:
        data = appointment.model_dump()
        result = await supabase_service.create_appointment(data)
        return AppointmentResponse(**result)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=f"Database not configured: {str(e)}")
    except Exception as e:
        logger.error(f"Error creating appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to create appointment. Please try again.")


@router.get("/", response_model=List[AppointmentResponse])
async def list_appointments(limit: int = 50):
    try:
        result = await supabase_service.get_appointments(limit=limit)
        return [AppointmentResponse(**appt) for appt in result]
    except ValueError as e:
        raise HTTPException(status_code=503, detail=f"Database not configured: {str(e)}")
    except Exception as e:
        logger.error(f"Error fetching appointments: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch appointments.")


@router.patch("/{appointment_id}/status")
async def update_appointment_status(appointment_id: str, status: str):
    valid_statuses = ["pending", "confirmed", "cancelled", "completed"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of: {valid_statuses}")
    try:
        result = await supabase_service.update_appointment_status(appointment_id, status)
        return {"message": "Status updated", "appointment": result}
    except Exception as e:
        logger.error(f"Error updating appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to update appointment status.")