from fastapi import APIRouter, HTTPException
import logging

from app.services import supabase_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/faqs", tags=["faqs"])

FALLBACK_FAQS = [
    {"id": "1", "question": "How much does a consultation cost?", "question_te": "సంప్రదింపు ఖర్చు ఎంత?", "answer": "Consultation pricing is confirmed when you book. Please contact us or reach us on WhatsApp for current fees. Any treatment cost is always explained clearly before you begin.", "answer_te": "మీరు బుక్ చేసినప్పుడు సంప్రదింపు ధర నిర్ధారించబడుతుంది. ప్రస్తుత ఫీజుల కోసం దయచేసి మమ్మల్ని సంప్రదించండి లేదా WhatsApp ద్వారా చేరుకోండి. ఏ చికిత్స ఖర్చు అయినా ప్రారంభించే ముందు స్పష్టంగా వివరించబడుతుంది.", "category": "pricing", "sort_order": 1},
    {"id": "2", "question": "Is the treatment painful?", "question_te": "చికిత్స బాధాకరమా?", "answer": "Experience varies by procedure. Your doctor explains what to expect, including any discomfort, and tailors the plan to keep you as comfortable as possible.", "answer_te": "అనుభవం ప్రక్రియను బట్టి మారుతుంది. మీ డాక్టర్ అసౌకర్యంతో సహా ఏమి ఆశించాలో వివరిస్తారు మరియు మిమ్మల్ని సాధ్యమైనంత సౌకర్యవంతంగా ఉంచడానికి ప్రణాళికను సర్దుబాటు చేస్తారు.", "category": "treatment", "sort_order": 2},
    {"id": "3", "question": "How many sessions will I need?", "question_te": "నాకు ఎన్ని సెషన్లు అవసరం?", "answer": "The number of sessions depends on your condition and how your skin responds to treatment. Your doctor outlines a clear plan with expected milestones after your consultation.", "answer_te": "సెషన్ల సంఖ్య మీ పరిస్థితి మరియు చికిత్సకు మీ చర్మం ఎలా స్పందిస్తుందనే దానిపై ఆధారపడి ఉంటుంది. మీ సంప్రదింపు తర్వాత మీ డాక్టర్ ఆశించిన మైలురాళ్లతో స్పష్టమైన ప్రణాళికను వివరిస్తారు.", "category": "treatment", "sort_order": 3},
    {"id": "4", "question": "Does insurance or government health scheme apply?", "question_te": "బీమా లేదా ప్రభుత్వ ఆరోగ్య పథకం వర్తిస్తుందా?", "answer": "Coverage depends on your plan and the specific service. Our team can guide you on the documentation you may need. Please check with your provider for eligibility details.", "answer_te": "కవరేజ్ మీ ప్లాన్ మరియు నిర్దిష్ట సేవపై ఆధారపడి ఉంటుంది. మీకు అవసరమైన డాక్యుమెంటేషన్‌పై మా బృందం మీకు మార్గనిర్దేశం చేయగలదు. అర్హత వివరాల కోసం దయచేసి మీ ప్రొవైడర్‌ను తనిఖీ చేయండి.", "category": "billing", "sort_order": 4},
    {"id": "5", "question": "What should I expect in my first visit?", "question_te": "నా మొదటి సందర్శనలో నేను ఏమి ఆశించాలి?", "answer": "Your doctor listens to your concern, reviews your history, examines the affected area and explains your options clearly. You can ask questions at any time.", "answer_te": "మీ డాక్టర్ మీ సమస్యను వింటారు, మీ చరిత్రను సమీక్షిస్తారు, ప్రభావిత ప్రాంతాన్ని పరిశీలిస్తారు మరియు మీ ఎంపికలను స్పష్టంగా వివరిస్తారు. మీరు ఎప్పుడైనా ప్రశ్నలు అడగవచ్చు.", "category": "consultation", "sort_order": 5},
]


@router.get("/")
async def list_faqs():
    try:
        return await supabase_service.get_faqs()
    except ValueError:
        return FALLBACK_FAQS
    except Exception as e:
        logger.error(f"Error fetching FAQs: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch FAQs.")