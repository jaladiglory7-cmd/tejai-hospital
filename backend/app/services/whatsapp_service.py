from urllib.parse import quote

from app.core.config import settings


def get_whatsapp_link(phone_number: str = None, message: str = None) -> str:
    phone = phone_number or settings.WHATSAPP_PHONE_NUMBER
    clean_phone = phone.replace("+", "").replace("-", "").replace(" ", "")
    default_message = message or "Hello, I would like to book an appointment / inquire about dermatology services at TejAI Multi-Specialty Hospital."
    return f"https://wa.me/{clean_phone}?text={quote(default_message)}"


def get_whatsapp_number() -> str:
    return settings.WHATSAPP_PHONE_NUMBER