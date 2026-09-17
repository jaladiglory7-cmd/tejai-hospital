export interface Doctor {
  id: string;
  name: string;
  name_te?: string;
  qualifications: string;
  specializations: string;
  specializations_te?: string;
  experience_years: number;
  bio?: string;
  bio_te?: string;
  image_url?: string;
}

export interface Service {
  id: string;
  name: string;
  name_te?: string;
  description: string;
  description_te?: string;
  icon?: string;
  category?: string;
}

export interface FAQ {
  id: string;
  question: string;
  question_te?: string;
  answer: string;
  answer_te?: string;
  category?: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  name_te?: string;
  designation?: string;
  designation_te?: string;
  quote: string;
  quote_te?: string;
  is_verified?: boolean;
  is_sample?: boolean;
}

export interface AppointmentPayload {
  patient_name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  concern: string;
  message?: string;
}

export interface ChatRequest {
  message: string;
  language: 'en' | 'te';
  session_id?: string;
}

export interface ChatResult {
  reply: string;
  language: string;
  session_id?: string;
  disclaimer: string;
}

export interface ChatLocalMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  request_type?: string;
}

export type Language = 'en' | 'te';

export interface ClinicConfig {
  brandName: string;
  brandNameTe: string;
  brandTech: string;
  brandTechTe: string;
  clinicName: string;
  clinicNameTe: string;
  tagline: string;
  address: string;
  addressTe: string;
  phone: string;
  email: string;
  website: string;
  timingsMonSatEn: string;
  timingsMonSatTe: string;
  timingsSundayEn: string;
  timingsSundayTe: string;
  whatsappPhone: string;
  latitude: number;
  longitude: number;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}