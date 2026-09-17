from fastapi import APIRouter, HTTPException
import uuid

from app.schemas.models import ChatMessage, ChatResponse
from app.services.sarvam_ai import chat_with_sarvam
from app.services import supabase_service

router = APIRouter(prefix="/chat", tags=["chat"])

MEDICAL_DISCLAIMER_EN = "This AI provides general dermatological information only. It does not replace a professional consultation. Always consult a qualified dermatologist for diagnosis and treatment."
MEDICAL_DISCLAIMER_TE = "ఈ AI సాధారణ చర్మ వ్యాధి సమాచారం మాత్రమే అందిస్తుంది. ఇది వృత్తిపరమైన సంప్రదింపును భర్తీ చేయదు. నిర్ధారణ మరియు చికిత్స కోసం ఎల్లప్పుడూ అర్హత పొందిన చర్మ వ్యాధి నిపుణుడిని సంప్రదించండి."


@router.post("/", response_model=ChatResponse)
async def send_chat_message(chat: ChatMessage):
    session_id = chat.session_id or str(uuid.uuid4())

    try:
        reply = await chat_with_sarvam(
            message=chat.message,
            language=chat.language,
            session_id=session_id,
        )

        disclaimer = MEDICAL_DISCLAIMER_TE if chat.language == "te" else MEDICAL_DISCLAIMER_EN

        try:
            await supabase_service.log_chat_message({
                "session_id": session_id,
                "user_message": chat.message,
                "ai_reply": reply,
                "language": chat.language,
            })
        except Exception:
            pass

        return ChatResponse(
            reply=reply,
            language=chat.language,
            session_id=session_id,
            disclaimer=disclaimer,
        )
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Chat service unavailable. Please try again.")