from fastapi import APIRouter
from typing import List, Optional

from app.schemas.models import Testimonial
from app.services import supabase_service

router = APIRouter(prefix="/testimonials", tags=["testimonials"])

supabase = supabase_service


@router.get("/", response_model=List[Testimonial])
async def get_testimonials():
    """Get verified testimonials for public display."""
    try:
        response = supabase.table("testimonials").select("*").eq("is_verified", True).order("sort_order").execute()
        return response.data or []
    except Exception:
        return []