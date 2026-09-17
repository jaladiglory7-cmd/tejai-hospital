from fastapi.testclient import TestClient
import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "TejAI Multi-Specialty Hospital API"


def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_list_doctors():
    response = client.get("/api/doctors/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_list_services():
    response = client.get("/api/services/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_list_faqs():
    response = client.get("/api/faqs/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_whatsapp_link():
    response = client.get("/api/contact/whatsapp-link")
    assert response.status_code == 200
    data = response.json()
    assert "link" in data
    assert "phone" in data


def test_create_appointment_validation():
    response = client.post("/api/appointments/", json={
        "patient_name": "",
        "phone": "123",
        "preferred_date": "2025-01-01",
        "preferred_time": "10:00",
        "concern": "Acne",
    })
    assert response.status_code == 422


def test_create_appointment():
    response = client.post("/api/appointments/", json={
        "patient_name": "Test Patient",
        "phone": "9876543210",
        "preferred_date": "2025-01-15",
        "preferred_time": "10:00",
        "concern": "Acne treatment",
        "message": "Test appointment",
    })
    if response.status_code == 503:
        assert "Database not configured" in response.json()["detail"]
    else:
        assert response.status_code == 200


def test_contact_request_validation():
    response = client.post("/api/contact/", json={
        "name": "",
        "phone": "123",
        "message": "",
    })
    assert response.status_code == 422


def test_chat_works_with_configured_key():
    response = client.post("/api/chat/", json={
        "message": "Hello",
        "language": "en",
    })
    # With SARVAM_API_KEY configured, the service should work.
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert "disclaimer" in data
    assert data["language"] == "en"


def test_chat_payload_validation():
    response = client.post("/api/chat/", json={
        "message": "",
        "language": "en",
    })
    assert response.status_code == 422