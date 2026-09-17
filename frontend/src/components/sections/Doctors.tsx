import { Calendar } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { useDoctors } from '../../services/api';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';
import type { Doctor } from '../../types';

export function Doctors() {
  const { language } = useLanguageContext();
  const { data: doctors } = useDoctors();

  const firstName = (full?: string) => {
    if (!full) return '';
    return full
      .replace(/^(Dr\.?\s+|డా\.?\s+|డాక్టర్\s+)/i, '')
      .trim()
      .split(' ')[0];
  };

  const go = (id?: string) => {
    if (id) {
      document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doctors" className="py-20 md:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="doctors" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(doctors ?? []).map((doc: Doctor) => (
            <Card key={doc.id} hover className="flex flex-col">
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-rose-50 p-8 text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-3xl font-bold text-white shadow-xl shadow-teal-800/25">
                  {doc.name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/).map((p) => p.charAt(0)).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {language === 'te' && doc.name_te ? doc.name_te : doc.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-teal-700">
                  {doc.qualifications}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {language === 'te' && doc.specializations_te ? doc.specializations_te : doc.specializations}
                </p>
                {doc.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {language === 'te' && doc.bio_te ? doc.bio_te : doc.bio}
                  </p>
                )}
              </div>
              <button
                onClick={() => go(doc.id)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-teal-200 px-5 py-3 text-sm font-semibold text-teal-800 transition-all hover:border-teal-400 hover:bg-teal-50"
              >
                <Calendar size={16} />
                {t('doctors.bookWith', language)}{' '}
                {language === 'te' && doc.name_te
                  ? `డా. ${firstName(doc.name_te)}`
                  : `Dr. ${firstName(doc.name)}`}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}