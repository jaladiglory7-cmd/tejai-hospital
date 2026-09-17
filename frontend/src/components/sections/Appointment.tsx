import { useState } from 'react';
import { CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t, tList } from '../../i18n';
import { submitAppointment } from '../../services/client';
import { SectionTitle } from '../ui/SectionTitle';
import type { AppointmentPayload } from '../../types';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Appointment() {
  const { language } = useLanguageContext();

  const [form, setForm] = useState<AppointmentPayload>({
    patient_name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '',
    concern: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [validationError, setValidationError] = useState(false);

  const concernOptions = tList('appointment.concernOptions', language);

  const setField = (field: keyof AppointmentPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status !== 'idle') setStatus('idle');
    setValidationError(false);
  };

  const today = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    if (!form.patient_name.trim() || form.phone.trim().length < 10 || !form.preferred_date || !form.preferred_time || !form.concern.trim()) {
      setValidationError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      await submitAppointment(form);
      setStatus('success');
      setForm({ patient_name: '', phone: '', email: '', preferred_date: '', preferred_time: '', concern: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100';

  return (
    <section id="appointment" className="relative py-20 md:py-28 overflow-hidden bg-slate-50">
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-teal-200/30 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="appointment" />

        <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
          {status === 'success' ? (
            <div className="py-12 text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 size={40} className="text-green-600" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">{t('appointment.successTitle', language)}</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                {t('appointment.successDesc', language)}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-semibold text-teal-700 hover:text-teal-900"
              >
                {language === 'te' ? 'మరో అపాయింట్‌మెంట్ బుక్ చేయండి' : 'Book another appointment'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="patient_name" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.name', language)}
                </label>
                <input
                  id="patient_name"
                  type="text"
                  required
                  value={form.patient_name}
                  onChange={(e) => setField('patient_name', e.target.value)}
                  placeholder={t('appointment.namePlaceholder', language)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.phone', language)}
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  pattern="[0-9+\- ]{10,15}"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder={t('appointment.phonePlaceholder', language)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.email', language)}
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="concern" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.concern', language)}
                </label>
                <select
                  id="concern"
                  required
                  value={form.concern}
                  onChange={(e) => setField('concern', e.target.value)}
                  className={inputClass}
                >
                  <option value="">{language === 'te' ? 'ఎంచుకోండి...' : 'Select...'}</option>
                  {concernOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="preferred_date" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.date', language)}
                </label>
                <input
                  id="preferred_date"
                  type="date"
                  required
                  min={today}
                  value={form.preferred_date}
                  onChange={(e) => setField('preferred_date', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="preferred_time" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.time', language)}
                </label>
                <select
                  id="preferred_time"
                  required
                  value={form.preferred_time}
                  onChange={(e) => setField('preferred_time', e.target.value)}
                  className={inputClass}
                >
                  <option value="">{language === 'te' ? 'సమయం ఎంచుకోండి...' : 'Select time...'}</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">
                  {t('appointment.message', language)}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setField('message', e.target.value)}
                  className={inputClass}
                />
              </div>

              {validationError && (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 sm:col-span-2">
                  {t('appointment.validationError', language)}
                </p>
              )}

              {status === 'error' && (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 sm:col-span-2">
                  {t('appointment.error', language)}
                </p>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-700/25 transition-all hover:-translate-y-0.5 hover:shadow-teal-700/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t('appointment.submitting', language)}
                    </>
                  ) : (
                    <>
                      <CalendarCheck size={20} />
                      {t('appointment.submit', language)}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}