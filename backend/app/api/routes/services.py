from fastapi import APIRouter, HTTPException
from typing import List
import logging

from app.services import supabase_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/services", tags=["services"])

FALLBACK_SERVICES = [
    {"id": "1", "name": "Acne & Acne Scars", "name_te": "మొటిమలు & మొటిమల గుర్తులు", "description": "Cleaner skin for a more confident you", "description_te": "మరింత ఆత్మవిశ్వాసం కోసం శుభ్రమైన చర్మం", "icon": "Sparkles", "category": "dermatology"},
    {"id": "2", "name": "Hair Fall", "name_te": "జుట్టు రాలడం", "description": "Stronger, healthier hair with the right care", "description_te": "సరైన సంరక్షణతో బలమైన, ఆరోగ్యకరమైన జుట్టు", "icon": "Heart", "category": "trichology"},
    {"id": "3", "name": "Pigmentation & Melasma", "name_te": "వర్ణద్రవ్యం & మెలాస్మా", "description": "Even-toned skin, restored confidence", "description_te": "ఏకరీతి చర్మం, పునరుద్ధరించబడిన ఆత్మవిశ్వాసం", "icon": "Sun", "category": "dermatology"},
    {"id": "4", "name": "Skin Allergies", "name_te": "చర్మ అలర్జీలు", "description": "Relief from itching, rashes and irritation", "description_te": "దురద, దద్దుర్లు మరియు చికాకు నుండి ఉపశమనం", "icon": "Shield", "category": "dermatology"},
    {"id": "5", "name": "Psoriasis", "name_te": "సోరియాసిస్", "description": "Better control. A more comfortable tomorrow.", "description_te": "మెరుగైన నియంత్రణ. మరింత సౌకర్యవంతమైన రేపు.", "icon": "Zap", "category": "dermatology"},
    {"id": "6", "name": "Mole / Skin Lesion Screening", "name_te": "మోల్ / చర్మ గాయాల స్క్రీనింగ్", "description": "Early detection for peace of mind", "description_te": "మనశ్శాంతి కోసం ముందస్తు గుర్తింపు", "icon": "Eye", "category": "screening"},
    {"id": "7", "name": "Pre-Bridal Skin Prep", "name_te": "ప్రీ-బ్రైడల్ చర్మ సిద్ధం", "description": "Put your best skin for life's special days", "description_te": "జీవితంలోని ప్రత్యేక రోజుల కోసం మీ ఉత్తమ చర్మం", "icon": "Crown", "category": "cosmetology"},
    {"id": "8", "name": "Anti-Aging", "name_te": "యాంటీ-ఏజింగ్", "description": "Healthy, youthful skin at every age", "description_te": "ప్రతి వయస్సులో ఆరోగ్యకరమైన, యవ్వన చర్మం", "icon": "Clock", "category": "cosmetology"},
]


@router.get("/")
async def list_services():
    try:
        return await supabase_service.get_services()
    except ValueError:
        return FALLBACK_SERVICES
    except Exception as e:
        logger.error(f"Error fetching services: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch services.")