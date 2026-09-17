from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.core.config import settings
from app.api.routes import appointments, chat, doctors, services, faqs, contact, testimonials

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="TejAI Multi-Specialty Hospital - Dermatology API",
    description="Backend API for TejAI Multi-Specialty Hospital dermatology website",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(appointments.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(doctors.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(faqs.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(testimonials.router, prefix="/api")


@app.get("/")
async def root():
    return {
        "message": "TejAI Multi-Specialty Hospital API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "supabase_configured": bool(settings.SUPABASE_URL)}