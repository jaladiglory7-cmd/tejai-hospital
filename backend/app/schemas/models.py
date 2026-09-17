from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class AppointmentCreate(BaseModel):
    patient_name: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None
    preferred_date: str = Field(..., description="Date in YYYY-MM-DD format")
    preferred_time: str = Field(..., description="Time in HH:MM format")
    concern: str = Field(..., min_length=1, max_length=500)
    message: Optional[str] = None


class AppointmentResponse(BaseModel):
    id: Optional[str] = None
    patient_name: str
    phone: str
    email: Optional[str] = None
    preferred_date: str
    preferred_time: str
    concern: str
    message: Optional[str] = None
    status: str = "pending"
    created_at: Optional[str] = None


class ChatMessage(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    language: str = Field(default="en", pattern="^(en|te)$")
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    language: str
    session_id: Optional[str] = None
    disclaimer: str = "This AI provides general information only and does not replace a professional dermatologist consultation."


class Doctor(BaseModel):
    id: Optional[str] = None
    name: str
    name_te: Optional[str] = None
    qualifications: str
    specializations: str
    specializations_te: Optional[str] = None
    experience_years: int
    bio: Optional[str] = None
    bio_te: Optional[str] = None
    image_url: Optional[str] = None


class Service(BaseModel):
    id: Optional[str] = None
    name: str
    name_te: Optional[str] = None
    description: str
    description_te: Optional[str] = None
    icon: Optional[str] = None
    category: Optional[str] = None


class FAQ(BaseModel):
    id: Optional[str] = None
    question: str
    question_te: Optional[str] = None
    answer: str
    answer_te: Optional[str] = None
    category: Optional[str] = None
    sort_order: int = 0


class Testimonial(BaseModel):
    id: Optional[str] = None
    name: str
    name_te: Optional[str] = None
    designation: Optional[str] = None
    designation_te: Optional[str] = None
    quote: str
    quote_te: Optional[str] = None
    is_verified: bool = False
    sort_order: int = 0


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None
    message: str = Field(..., min_length=1, max_length=2000)
    request_type: str = Field(default="general")


class ContactRequestResponse(BaseModel):
    id: Optional[str] = None
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    request_type: str
    status: str = "new"
    created_at: Optional[str] = None