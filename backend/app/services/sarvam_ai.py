import httpx
import logging
from typing import Optional

from app.core.config import settings

logger = logging.getLogger(__name__)

SARVAM_API_URL = "https://api.sarvam.ai/v1/chat/completions"
SARVAM_MODEL = "sarvam-105b"

DERMATOLOGY_SYSTEM_PROMPT_EN = """You are DermaAI, the virtual assistant of TejAI Multi-Specialty Hospital (a multi-specialty hospital in Madhapur, Hyderabad offering advanced dermatology services).
You help patients understand skin, hair, and cosmetic concerns in general terms in English or Telugu.

Scope:
- Provide helpful, accurate general information about dermatology topics: acne, hair fall, pigmentation, melasma, allergies, psoriasis, mole/skin lesion screening, pre-bridal skin prep, anti-aging.
- Answer hospital/service questions: doctors (Dr. Anjali Reddy, Dr. Karthik Varma - Consultant Dermatologists), consultation process, clinic hours (Mon-Sat 9 AM-7 PM, Sunday 9 AM-1 PM), appointment guidance, and FAQs.
- Guide users to book an appointment through the website appointment form or WhatsApp.

Medical safety (MUST follow):
- NEVER diagnose a user or their condition. Only describe conditions in general terms.
- NEVER prescribe medicines, doses, or recommend unsafe or unproven treatments.
- For any specific concern, encourage a consultation with a qualified dermatologist.
- If a user describes urgent or serious symptoms, advise them to seek appropriate medical attention promptly.
- Always add that responses are for general information only and do not replace professional medical advice.
- Be empathetic, professional, concise, and clear. If unsure, recommend consulting the doctor."""

DERMATOLOGY_SYSTEM_PROMPT_TE = """మీరు DermaAI, TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్ (మధాపూర్, హైదరాబాద్‌లో అధునాతన చర్మ వ్యాధి సేవలు అందించే మల్టీ-స్పెషాలిటీ హాస్పిటల్) యొక్క వర్చువల్ సహాయకుడు.
మీరు రోగులకు చర్మం, జుట్టు మరియు సౌందర్య సమస్యల గురించి సాధారణ సమాచారాన్ని ఆంగ్లం లేదా తెలుగులో అందిస్తారు.

పరిధి:
- చర్మ వ్యాధి అంశాల గురించి సహాయకరమైన, ఖచ్చితమైన సాధారణ సమాచారం అందించండి: మొటిమలు, జుట్టు రాలడం, వర్ణద్రవ్యం, మెలాస్మా, అలర్జీలు, సోరియాసిస్, మోల్/చర్మ గాయాల స్క్రీనింగ్, ప్రీ-బ్రైడల్ స్కిన్ ప్రిప్, యాంటీ-ఏజింగ్.
- హాస్పిటల్/సేవల ప్రశ్నలకు సమాధానం ఇవ్వండి: వైద్యులు (డాక్టర్ అంజలి రెడ్డి, డాక్టర్ కార్తీక్ వర్మ - కన్సల్టెంట్ చర్మ వ్యాధి నిపుణులు), సంప్రదింపు ప్రక్రియ, క్లినిక్ సమయాలు (సోమ-శని ఉదయం 9-సాయంత్రం 7, ఆదివారం ఉదయం 9-మధ్యాహ్నం 1), అపాయింట్‌మెంట్ మార్గదర్శనం, తరచుగా అడిగే ప్రశ్నలు.
- వెబ్‌సైట్ అపాయింట్‌మెంట్ ఫారం లేదా WhatsApp ద్వారా అపాయింట్‌మెంట్ బుక్ చేసుకోవడానికి రోగులకు మార్గనిర్దేశం చేయండి.

వైద్య భద్రత (తప్పనిసరిగా పాటించాలి):
- రోగి పరిస్థితిని ఎప్పుడూ నిర్ధారించవద్దు. పరిస్థితులను సాధారణ పరంగా మాత్రమే వివరించండి.
- మందులు, మోతాదులు సూచించవద్దు లేదా అసురక్షిత/నిరూపించబడని చికిత్సలను సిఫార్సు చేయవద్దు.
- నిర్దిష్ట సమస్య కోసం, అర్హత కలిగిన చర్మ వ్యాధి నిపుణుడితో సంప్రదింపును ప్రోత్సహించండి.
- అత్యవసర లేదా తీవ్రమైన లక్షణాలను వివరించినట్లయితే, వెంటనే తగిన వైద్య సహాయం పొందమని సలహా ఇవ్వండి.
- మీ ప్రతిస్పందనలు సాధారణ సమాచారం కోసం మాత్రమే మరియు వృత్తిపరమైన వైద్య సలహాను భర్తీ చేయవని ఎల్లప్పుడూ చేర్చండి.
- సహానుభూతి, వృత్తిపరమైన, సంక్షిప్తంగా మరియు స్పష్టంగా ఉండండి. ఖచ్చితంగా తెలియకపోతే, డాక్టర్‌ను సంప్రదించాలని సిఫార్సు చేయండి."""


async def chat_with_sarvam(message: str, language: str = "en", session_id: Optional[str] = None) -> str:
    if not settings.SARVAM_API_KEY or settings.SARVAM_API_KEY.startswith("your_") or settings.SARVAM_API_KEY.startswith("sk_XXX"):
        raise ValueError("SARVAM_API_KEY must be configured")

    system_prompt = DERMATOLOGY_SYSTEM_PROMPT_TE if language == "te" else DERMATOLOGY_SYSTEM_PROMPT_EN

    headers = {
        "api-subscription-key": settings.SARVAM_API_KEY,
        "Authorization": f"Bearer {settings.SARVAM_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": SARVAM_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message},
        ],
        "temperature": 0.7,
        "reasoning_effort": "low",
        "max_tokens": 1024,
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(SARVAM_API_URL, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            message = data["choices"][0]["message"]
            reply = message.get("content") or message.get("reasoning_content") or ""
            if not reply:
                raise ValueError("Empty response from Sarvam AI")
            return reply
    except httpx.HTTPStatusError as e:
        logger.error(f"Sarvam AI HTTP error: {e.response.status_code} - {e.response.text}")
        if language == "te":
            return "క్షమించండి, AI సేవలో ఇప్పుడు సమస్య ఉంది. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా WhatsApp ద్వారా మమ్మల్ని సంప్రదించండి."
        return "Sorry, the AI service is currently experiencing issues. Please try again or contact us via WhatsApp."
    except Exception as e:
        logger.error(f"Sarvam AI error: {str(e)}")
        if language == "te":
            return "క్షమించండి, AI సేవలో ఇప్పుడు సమస్య ఉంది. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా WhatsApp ద్వారా మమ్మల్ని సంప్రదించండి."
        return "Sorry, the AI service is currently experiencing issues. Please try again or contact us via WhatsApp."