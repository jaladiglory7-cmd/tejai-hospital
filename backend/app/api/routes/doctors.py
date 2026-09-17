from fastapi import APIRouter, HTTPException
from typing import List
import logging

from app.services import supabase_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/doctors", tags=["doctors"])

FALLBACK_DOCTORS = [
    {
        "id": "1",
        "name": "Dr. Anjali Reddy",
        "name_te": "డాక్టర్ అంజలి రెడ్డి",
        "qualifications": "MBBS, MD (Dermatology, Venereology & Leprosy)",
        "specializations": "Consultant Dermatologist",
        "specializations_te": "కన్సల్టెంట్ చర్మ వ్యాధి నిపుణురాలు",
        "experience_years": 8,
        "bio": "Consultant Dermatologist at TejAI Multi-Specialty Hospital, dedicated to honest, evidence-based skin and hair care.",
        "bio_te": "TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్‌లో కన్సల్టెంట్ చర్మ వ్యాధి నిపుణురాలు, నిజాయితీగల, ఆధార-ఆధారిత చర్మ మరియు జుట్టు సంరక్షణకు అంకితం.",
        "image_url": None,
    },
    {
        "id": "2",
        "name": "Dr. Karthik Varma",
        "name_te": "డాక్టర్ కార్తీక్ వర్మ",
        "qualifications": "MBBS, MD (Dermatology)",
        "specializations": "Consultant Dermatologist",
        "specializations_te": "కన్సల్టెంట్ చర్మ వ్యాధి నిపుణుడు",
        "experience_years": 8,
        "bio": "Consultant Dermatologist at TejAI Multi-Specialty Hospital, focused on personalized treatment plans for every skin type and tone.",
        "bio_te": "TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్‌లో కన్సల్టెంట్ చర్మ వ్యాధి నిపుణుడు, ప్రతి చర్మ రకం మరియు టోన్ కోసం వ్యక్తిగత చికిత్స ప్రణాళికలపై దృష్టి సారిస్తారు.",
        "image_url": None,
    },
]


@router.get("/")
async def list_doctors():
    try:
        return await supabase_service.get_doctors()
    except ValueError:
        return FALLBACK_DOCTORS
    except Exception as e:
        logger.error(f"Error fetching doctors: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch doctors.")